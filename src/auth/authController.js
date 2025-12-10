import asyncHandler from 'express-async-handler';
import User from '../database/models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../utils/tokenUtils.js';
import { generateResetToken, sendPasswordResetEmail } from '../utils/passwordUtils.js';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// @desc    Register a new user
// @route   POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists by email
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // If user exists with Google auth
      if (existingUser.isGoogleUser) {
        return res.status(400).json({
          message: 'This email is already registered with Google. Please sign in with Google.'
        });
      }
      // If user exists with traditional auth
      return res.status(400).json({
        message: 'An account with this email already exists. Please sign in.'
      });
    }

    // Create new traditional user if no existing user found
    const user = await User.create({
      username,
      email,
      password,
      authType: 'local',
      isGoogleUser: false
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message || 'Error creating user');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/signin
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Handle Google-only users
    if (user.isGoogleUser && !user.password) {
      res.status(400);
      throw new Error('This account uses Google Sign-In. Please sign in with Google.');
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Password matches, send response
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      isGoogleUser: user.isGoogleUser,
      authType: user.authType,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(error.status || 500);
    throw new Error(error.message || 'Error during signin');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Generate default avatar URL if no profile picture exists and Ensure high quality picture URL for Google users
    let profilePicture = user.profilePicture;
    if (user.isGoogleUser && profilePicture) {
      profilePicture = profilePicture.replace('=s96-c', '=s400-c');
    } else if (!profilePicture) {
      profilePicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random&size=400`;
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      phone: user.phone || null,
      gender: user.gender || 'prefer-not-to-say',
      dateOfBirth: user.dateOfBirth || null,
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || '',
      country: user.country || '',
      profilePicture: profilePicture,
      walletBalance: user.walletBalance || "0.00",
      isGoogleUser: user.isGoogleUser || false,
      verificationStatus: user.verificationStatus,
      verificationDocuments: user.verificationDocuments,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching user profile');
  }
});

// @desc    Update user profile picture
// @route   PUT /api/auth/profile/picture
const updateProfilePicture = asyncHandler(async (req, res) => {
  
  try {
    const { profilePicture } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.profilePicture = profilePicture;
    await user.save();

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error updating profile picture');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(200).json({ 
        message: 'If an account exists with this email, you will receive password reset instructions.' 
      });
    }

    if (user.isGoogleUser && !user.password) {
      return res.status(400).json({ 
        message: 'This account uses Google authentication. Please sign in with Google.' 
      });
    }

    const resetToken = generateResetToken();
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    await sendPasswordResetEmail(email, resetUrl);

    res.status(200).json({ 
      message: 'If an account exists with this email, you will receive password reset instructions.' 
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'An error occurred while processing your request.' 
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const allowedGenders = ['male', 'female', 'non-binary', 'prefer-not-to-say'];
  if (req.body.gender && !allowedGenders.includes(req.body.gender)) {
    return res.status(400).json({ message: 'Invalid gender value' });
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username !== undefined ? req.body.username : user.username;
    user.email = req.body.email !== undefined ? req.body.email : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
    user.dateOfBirth = req.body.dateOfBirth !== undefined ? req.body.dateOfBirth : user.dateOfBirth;
    user.address = req.body.address !== undefined ? req.body.address : user.address;
    user.city = req.body.city !== undefined ? req.body.city : user.city;
    user.state = req.body.state !== undefined ? req.body.state : user.state;
    user.zipCode = req.body.zipCode !== undefined ? req.body.zipCode : user.zipCode;
    user.country = req.body.country !== undefined ? req.body.country : user.country;

    const updatedUser = await user.save();

    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      gender: updatedUser.gender,
      dateOfBirth: updatedUser.dateOfBirth,
      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      zipCode: updatedUser.zipCode,
      country: updatedUser.country,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/// @desc    Delete user account
// @route   DELETE /api/auth/delete-account
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+password'); // Ensure password is included

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if the user has a password
    if (!user.password) {
      res.status(400);
      throw new Error('This account does not have a password. Please use Google Sign-In to manage your account.');
    }

    // Check if password is provided in the request
    if (!req.body.password) {
      res.status(400);
      throw new Error('Password is required to delete your account.');
    }

    // Verify the password
    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Incorrect password');
    }

    // Delete the user account - Replace deprecated remove() method with deleteOne()
    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(error.status || 500);
    throw new Error(error.message || 'Error deleting account');
  }
});

// @desc    Upload or update a verification document
// @route   PUT /api/auth/verification-document
const uploadVerificationDocument = asyncHandler(async (req, res) => {
  const { docType } = req.body;
  if (!['governmentId', 'proofOfAddress', 'proofOfInsurance', 'vehicleRegistrationCertificate'].includes(docType)) {
    return res.status(400).json({ message: 'Invalid document type' });
  }

  // The file is uploaded to Cloudinary by the middleware and details are in req.file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or file type is invalid.' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // IMPORTANT: If replacing a document, delete the old one from Cloudinary
    const prevDoc = user.verificationDocuments?.[docType];
    if (prevDoc && prevDoc.publicId) {
      await cloudinary.uploader.destroy(prevDoc.publicId);
    }

    // Save the new file's URL and public_id to the user document
    user.verificationDocuments[docType] = {
      path: req.file.path, // This is the secure URL from Cloudinary
      publicId: req.file.filename, // This is the public_id from Cloudinary
      uploadedAt: new Date(),
      status: 'Approved', // Or 'Pending' if you want a manual review step
    };

    // Update the user's overall verification status
    await user.checkVerificationStatus();
    await user.save();

    res.json({
      message: 'Document uploaded successfully',
      verificationDocuments: user.verificationDocuments,
      verificationStatus: user.verificationStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// @desc    Delete a verification document
// @route   DELETE /api/auth/verification-document/:docType
const deleteVerificationDocument = asyncHandler(async (req, res) => {
  const { docType } = req.params;
  
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const docToDelete = user.verificationDocuments?.[docType];
    if (!docToDelete || !docToDelete.publicId) {
      return res.status(404).json({ message: 'Document not found or already deleted.' });
    }

    // 1. Delete the file from Cloudinary
    await cloudinary.uploader.destroy(docToDelete.publicId);

    // 2. Clear the fields in the user document
    user.verificationDocuments[docType] = {
      path: null,
      publicId: null,
      uploadedAt: null,
      status: 'Not Submitted',
    };
    
    // 3. Update overall status and save
    await user.checkVerificationStatus();
    await user.save();
    res.json({ 
      message: 'Document deleted successfully',
      verificationStatus: user.verificationStatus,
      verificationDocuments: user.verificationDocuments
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
export { signup, signin, getUserProfile, updateUserProfile,uploadVerificationDocument,deleteVerificationDocument, updateProfilePicture, forgotPassword, deleteAccount };

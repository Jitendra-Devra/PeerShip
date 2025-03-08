import asyncHandler from 'express-async-handler';
import User from '../database/models/User.js';
import { generateToken } from '../utils/tokenUtils.js';
import { generateResetToken, sendPasswordResetEmail } from '../utils/passwordUtils.js';

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
    console.error('Signup error:', error);
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
    console.error('Signin error:', error);
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
      isVerified: user.isEmailVerified || false,
      profilePicture: profilePicture,
      walletBalance: user.walletBalance || "0.00",
      isGoogleUser: user.isGoogleUser || false
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
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
    console.error('Error updating profile picture:', error);
    res.status(500);
    throw new Error('Error updating profile picture');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Processing forgot password for email:', email); // Debug log
    
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
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'An error occurred while processing your request.' 
    });
  }
});

export { signup, signin, getUserProfile, updateProfilePicture, forgotPassword };

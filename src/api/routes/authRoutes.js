import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../../database/models/User.js';
import { signup, signin, getUserProfile, updateProfilePicture, forgotPassword } from '../../auth/authController.js';
import { protect } from '../../middleware/authMiddleware.js';
import { generateResetToken, sendPasswordResetEmail } from '../../utils/passwordUtils.js';

const router = express.Router();
const googleOAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getHighQualityGooglePicture = (url) => {
  return url.replace('=s96-c', '=s400-c');
};

// Google OAuth Routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/signin', 
    session: false 
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { 
          id: req.user.id, 
          email: req.user.email 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' }
      );
      
      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(`${process.env.CLIENT_URL}/signin?error=auth_failed`);
    }
  }
);

// Login with Google on the client side (receives token from client)
router.post('/google-login', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Verify the Google token
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { email, name, sub: googleId, picture } = ticket.getPayload();
    
  // Modify the picture URL to get higher quality
  const highQualityPicture = getHighQualityGooglePicture(picture);

    // First try to find user by googleId
    let user = await User.findOne({ googleId });
    
    // If not found by googleId, try email
    if (!user) {
      user = await User.findOne({ email });
      
      if (!user) {
        // Create new user if doesn't exist
        user = new User({
          username: name,
          email,
          googleId,
          profilePicture: highQualityPicture,
          isEmailVerified: true,
          isGoogleUser: true,
          authType: 'google'
        });
      } else {
        // Update existing user with Google info
        user.googleId = googleId;
        user.profilePicture = highQualityPicture;
        user.isGoogleUser = true;
        user.authType = user.password ? 'both' : 'google';
      }
      
      await user.save();
    }else {
      // Update existing user's profile picture if needed
      if (user.profilePicture !== highQualityPicture) {
        user.profilePicture = highQualityPicture;
        await user.save();
      }
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: highQualityPicture,
        isGoogleUser: true
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      message: 'Server error during authentication',
      error: error.message 
    });
  }
});

router.post('/forgot-password', forgotPassword);

// Add reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        message: 'Password reset token is invalid or has expired.' 
      });
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ 
      message: 'Password has been reset successfully.' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'An error occurred while resetting your password.' 
    });
  }
});

// Auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', protect, getUserProfile);
router.put('/profile/picture', protect, updateProfilePicture);

export default router;
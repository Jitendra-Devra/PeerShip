import crypto from 'crypto';
import { createTransporter } from './gmailConfig.js';

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset Your Peership Password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a365d; text-align: center;">Reset Your Password</h2>
          <p>You requested a password reset for your Peership account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error; // Changed to throw the actual error for better debugging
  }
};
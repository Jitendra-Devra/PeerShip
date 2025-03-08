import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../database/models/User.js'; // Add .js extension for ES modules

export default function configurePassport(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          const existingUser = await User.findOne({ googleId: profile.id });
          
          if (existingUser) {
            return done(null, existingUser);
          }
          
          // Check if user exists with the same email
          const userWithEmail = await User.findOne({ email: profile.emails[0].value });
          
          if (userWithEmail) {
            // Link Google account to existing account
            userWithEmail.googleId = profile.id;
            await userWithEmail.save();
            return done(null, userWithEmail);
          }
          
          // Create new user
          const newUser = await new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            isEmailVerified: true
          }).save();
          
          done(null, newUser);
        } catch (error) {
          console.error('Error in Google OAuth strategy:', error);
          done(error, null);
        }
      }
    )
  );
}
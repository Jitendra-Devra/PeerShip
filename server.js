import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { protect } from './src/middleware/authMiddleware.js';
import connectDB from './src/database/dbConnect.js';
import authRoutes from './src/api/routes/authRoutes.js';
import vehicleRoutes from './src/api/routes/vehicleRoutes.js';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import configurePassport from './src/auth/passport.js';
import User from './src/database/models/User.js'; 
import mongoose from 'mongoose';
import cron from 'node-cron';

// Load environment variables
dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // ✅ Define `app` before using it

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition']
}));

// Cookie parser
app.use(cookieParser());

// Session configuration for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  store: new session.MemoryStore() // ✅ Use connect-mongo in production
}));

// Initialize Passport and configure it
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Cross-Origin security headers (optional but useful)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve profile pictures (with fallback to avatar)
app.get('/api/profile-picture/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.profilePicture) {
      return res.redirect(`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}`);
    }
    res.redirect(user.profilePicture);
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.redirect('https://ui-avatars.com/api/?background=random');
  }
});



mongoose.connection.once('open', () => {
  console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
});


// Approve users after 2 minutes if status is Pending
cron.schedule('*/1 * * * *', async () => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const users = await User.find({
    verificationStatus: 'Pending',
    verificationRequestedAt: { $lte: twoMinutesAgo }
  });

  for (const user of users) {
    user.verificationStatus = 'Approved';
    user.partnerDetails.approved = true;
    await user.save();
    // Optionally: send notification/email here
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // ✅ Ensures DB is ready before server starts

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌱 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
      process.exit(1);
    }
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './src/database/dbConnect.js';
import authRoutes from './src/api/routes/authRoutes.js';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import configurePassport from './src/auth/passport.js';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express(); // ✅ Define `app` before using it

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
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
  store: new session.MemoryStore() // Use a proper store like MongoDB/Redis in production
}));

// Initialize Passport and configure it
app.use(passport.initialize());
app.use(passport.session());

// Configure passport strategies
configurePassport(passport);

// Mount routes
app.use('/api/auth', authRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Adding a route to handle profile picture requests
app.get('/api/profile-picture/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.profilePicture) {
      // Redirect to default avatar service
      return res.redirect(`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}`);
    }
    res.redirect(user.profilePicture);
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.redirect('https://ui-avatars.com/api/?background=random');
  }
});

//  `startServer()` after initializing `app`
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try another port or kill the process using this port.`);
      process.exit(1);
    }
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

//  call `startServer()`
startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

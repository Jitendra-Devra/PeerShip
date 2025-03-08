import express from 'express';
import { signup, signin, getUserProfile } from '../../auth/authController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', protect, getUserProfile);

export default router;
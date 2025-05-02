import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import {
  getUserVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../../auth/vehicleController.js';

const router = express.Router();

router.get('/', protect, getUserVehicles);
router.post('/', protect, addVehicle);
router.put('/:vehicleId', protect, updateVehicle);
router.delete('/:vehicleId', protect, deleteVehicle);

export default router;
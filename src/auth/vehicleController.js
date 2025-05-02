import asyncHandler from 'express-async-handler';
import Vehicle from '../database/models/Vehicle.js';
import User from '../database/models/User.js';

// GET /api/vehicles - Get all vehicles for the logged-in user
export const getUserVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ userId: req.user._id });
  res.json(vehicles);
});

// POST /api/vehicles - Add a new vehicle
export const addVehicle = asyncHandler(async (req, res) => {
  const { type, make, model, year, licensePlate } = req.body;
  const vehicle = await Vehicle.create({
    userId: req.user._id,
    type,
    make,
    model,
    year,
    licensePlate,
  });
  // Add vehicle to user's vehicles array
  await User.findByIdAndUpdate(req.user._id, { $push: { vehicles: vehicle._id } });
  res.status(201).json(vehicle);
});

// PUT /api/vehicles/:vehicleId - Update a vehicle
export const updateVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const vehicle = await Vehicle.findOne({ _id: vehicleId, userId: req.user._id });
  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }
  const { type, make, model, year, licensePlate } = req.body;
  vehicle.type = type ?? vehicle.type;
  vehicle.make = make ?? vehicle.make;
  vehicle.model = model ?? vehicle.model;
  vehicle.year = year ?? vehicle.year;
  vehicle.licensePlate = licensePlate ?? vehicle.licensePlate;
  await vehicle.save();
  res.json(vehicle);
});

// DELETE /api/vehicles/:vehicleId - Delete a vehicle
export const deleteVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId, userId: req.user._id });
  if (!vehicle) {
    res.status(404);
    throw new Error('Vehicle not found');
  }
  // Remove vehicle from user's vehicles array
  await User.findByIdAndUpdate(req.user._id, { $pull: { vehicles: vehicleId } });
  res.json({ message: 'Vehicle deleted' });
});
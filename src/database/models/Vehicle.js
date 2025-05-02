import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Bike', 'Car', 'Truck/Large Vehicles'],
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String, 
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{timestamps: true});

// Update User's partnerDetails on save
vehicleSchema.post('save', async function() {
  const User = mongoose.model('User');
  try {
    // Find the user and update their partner details
    await User.findByIdAndUpdate(this.userId, { 
      isDeliveryPartner: true,
      'partnerDetails.vehicleType': this.type
    });
  } catch (error) {
    console.error('Error updating user partner details:', error);
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
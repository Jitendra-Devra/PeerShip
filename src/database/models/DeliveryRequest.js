import mongoose from 'mongoose';

const DeliveryRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    title: {
      type: String, 
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pickupLocation: {
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
    },
    dropoffLocation: {
      address: {
        type: String,
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere',
      },
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    estimatedDeliveryTime: {
      type: Number, // in minutes
      default: null,
    },
    actualDeliveryTime: {
      type: Number, // in minutes
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    packageDetails: {
      size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
      },
      weight: Number,
      description: String
    },
    scheduledTime: {
      pickupTime: Date,
      deliveryTime: Date
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending'
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
DeliveryRequestSchema.index({ user: 1, status: 1 });
DeliveryRequestSchema.index({ partner: 1, status: 1 });
DeliveryRequestSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
DeliveryRequestSchema.index({ 'dropoffLocation.coordinates': '2dsphere' });

// Update user and partner stats when delivery is completed
DeliveryRequestSchema.post('save', async function() {
  // Only update stats when delivery is completed
  if (this.status === 'completed' && this.isModified('status')) {
    const User = mongoose.model('User');
    
    // Update partner's stats
    if (this.partner) {
      try {
        const partner = await User.findById(this.partner);
        if (partner) {
          partner.partnerDetails.totalDeliveries += 1;
          partner.partnerDetails.totalEarnings += this.price * 0.8; // Assuming 80% of the price goes to the partner
          await partner.save();
        }
      } catch (error) {
        console.error('Error updating partner stats:', error);
      }
    }
  }
});

const DeliveryRequest = mongoose.model('DeliveryRequest', DeliveryRequestSchema);

export default DeliveryRequest;
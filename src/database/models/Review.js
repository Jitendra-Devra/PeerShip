import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryRequest',
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
ReviewSchema.index({ reviewer: 1 });
ReviewSchema.index({ receiver: 1 });
ReviewSchema.index({ delivery: 1 });

// When a new review is created, update the user's average rating
ReviewSchema.post('save', async function() {
  const User = mongoose.model('User');
  try {
    // Calculate new average rating for the receiver
    const Review = this.constructor;
    const reviews = await Review.find({ receiver: this.receiver });
    
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      
      // Update user's average rating
      await User.findByIdAndUpdate(this.receiver, {
        'partnerDetails.averageRating': parseFloat(averageRating.toFixed(1))
      });
    }
  } catch (error) {
    console.error('Error updating user average rating:', error);
  }
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
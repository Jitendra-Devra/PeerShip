import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
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
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryRequest',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    platformFee: {
      type: Number,
      required: true,
      default: function() {
        return this.amount * 0.2; // 20% platform fee
      }
    },
    partnerEarnings: {
      type: Number,
      required: true,
      default: function() {
        return this.amount * 0.8; // 80% to partner
      }
    },
    type: {
      type: String,
      enum: ['payment', 'earning', 'refund'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
TransactionSchema.index({ user: 1, type: 1 });
TransactionSchema.index({ partner: 1, type: 1 });
TransactionSchema.index({ delivery: 1 });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import User from '../models/User.js';
import DeliveryRequest from '../models/DeliveryRequest.js';
import Transaction from '../models/Transaction.js';
import Review from '../models/Review.js';
import PartnerStats from '../models/PartnerStats.js';

const router = express.Router();

// Get user dashboard data
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify user is requesting their own data
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Get all user deliveries
    const allDeliveries = await DeliveryRequest.find({ userId });
    const completedDeliveries = allDeliveries.filter(d => d.status === 'completed').length;
    const pendingDeliveries = allDeliveries.filter(d => d.status === 'pending').length;
    
    // Get total spent
    const transactions = await Transaction.find({ 
      userId,
      type: 'payment',
      status: 'completed'
    });
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Get average rating given by user
    const reviewsGiven = await Review.find({ reviewerId: userId });
    const averageRating = reviewsGiven.length > 0 
      ? reviewsGiven.reduce((sum, r) => sum + r.rating, 0) / reviewsGiven.length 
      : 0;
    
    // Get recent deliveries (last 5)
    const recentDeliveries = await DeliveryRequest.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalDeliveries: allDeliveries.length,
      completedDeliveries,
      pendingDeliveries,
      totalSpent,
      averageRating,
      recentDeliveries
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get partner dashboard data
router.get('/partner/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify user is requesting their own data
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Get partner stats (pre-aggregated data)
    let partnerStats = await PartnerStats.findOne({ partnerId: userId });
    
    if (!partnerStats) {
      // If no pre-aggregated stats exist, calculate them now
      const completedDeliveries = await DeliveryRequest.find({ 
        partnerId: userId,
        status: 'completed'
      });
      
      const transactions = await Transaction.find({
        partnerId: userId,
        type: 'earning',
        status: 'completed'
      });
      
      const reviews = await Review.find({
        receiverId: userId,
        reviewerId: { $ne: userId } // Exclude self-reviews
      });
      
      const totalEarnings = transactions.reduce((sum, t) => sum + t.amount, 0);
      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0;
      
      // Calculate average delivery time
      let totalTime = 0;
      completedDeliveries.forEach(delivery => {
        if (delivery.actualDeliveryTime) {
          totalTime += delivery.actualDeliveryTime;
        }
      });
      
      const averageDeliveryTime = completedDeliveries.length > 0 
        ? Math.round(totalTime / completedDeliveries.length) 
        : 0;
      
      // Get recent deliveries with user info
      const recentDeliveries = await DeliveryRequest.aggregate([
        { 
          $match: { 
            partnerId: req.user._id,
            status: 'completed'
          } 
        },
        { $sort: { completedAt: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo'
          }
        },
        { $unwind: '$userInfo' },
        {
          $lookup: {
            from: 'transactions',
            localField: '_id',
            foreignField: 'deliveryId',
            as: 'transactionInfo'
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            status: 1,
            createdAt: 1,
            completedAt: 1,
            actualDeliveryTime: 1,
            userName: '$userInfo.name',
            earnings: { 
              $arrayElemAt: [
                '$transactionInfo.amount', 
                { $indexOfArray: ['$transactionInfo.type', 'earning'] }
              ]
            }
          }
        }
      ]);
      
      res.json({
        totalDeliveries: completedDeliveries.length,
        totalEarnings,
        averageRating,
        averageDeliveryTime,
        recentDeliveries
      });
    } else {
      // Get recent deliveries with user info
      const recentDeliveries = await DeliveryRequest.aggregate([
        { 
          $match: { 
            partnerId: req.user._id,
            status: 'completed'
          } 
        },
        { $sort: { completedAt: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo'
          }
        },
        { $unwind: '$userInfo' },
        {
          $lookup: {
            from: 'transactions',
            localField: '_id',
            foreignField: 'deliveryId',
            as: 'transactionInfo'
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            status: 1,
            createdAt: 1,
            completedAt: 1,
            actualDeliveryTime: 1,
            userName: '$userInfo.name',
            earnings: { 
              $arrayElemAt: [
                '$transactionInfo.amount', 
                { $indexOfArray: ['$transactionInfo.type', 'earning'] }
              ]
            }
          }
        }
      ]);
      
      res.json({
        ...partnerStats.toObject(),
        recentDeliveries
      });
    }
  } catch (error) {
    console.error('Error fetching partner dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate embedded Looker Studio URL
router.get('/embed-url', authenticate, async (req, res) => {
    try {
      const { reportId, userId } = req.query;
      
      // Verify user is requesting their own data
      if (req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // In a real implementation, you would:
      // 1. Generate SSO tokens or authentication headers for Looker Studio
      // 2. Add user-specific parameters to filter data for this specific user
      // 3. Sign the URL if needed for security
      
      // For MongoDB Atlas Charts integration with Looker Studio:
      const user = await User.findById(userId);
      
      // Create a signed URL with authentication tokens
      // This is a simplified example - actual implementation will depend on your Looker Studio setup
      const embedUrl = `https://lookerstudio.google.com/embed/reporting/${reportId}/page/1?params={"userId":"${userId}"}`;
      
      res.json({ embedUrl });
    } catch (error) {
      console.error('Error generating embed URL:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get data for Looker Studio connector (optional - for custom connector setup)
  router.get('/data/user/:userId', authenticate, async (req, res) => {
    try {
      const { userId } = req.params;
      const { timeRange } = req.query; // e.g., "30days", "90days", "all"
      
      // Verify user is requesting their own data or is an admin
      if (req.user._id.toString() !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // Calculate date range
      let dateFilter = {};
      const now = new Date();
      
      if (timeRange === '30days') {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        dateFilter = { createdAt: { $gte: thirtyDaysAgo } };
      } else if (timeRange === '90days') {
        const ninetyDaysAgo = new Date(now);
        ninetyDaysAgo.setDate(now.getDate() - 90);
        dateFilter = { createdAt: { $gte: ninetyDaysAgo } };
      }
      
      // Get all user deliveries within date range
      const deliveries = await DeliveryRequest.find({ 
        userId,
        ...dateFilter
      }).sort({ createdAt: 1 });
      
      // Get all transactions within date range
      const transactions = await Transaction.find({ 
        userId,
        ...dateFilter
      }).sort({ createdAt: 1 });
      
      // Format data for Looker Studio
      const formattedData = {
        // Delivery metrics over time
        deliveriesOverTime: deliveries.map(delivery => ({
          date: delivery.createdAt,
          status: delivery.status,
          price: delivery.price
        })),
        
        // Transaction history
        transactionsOverTime: transactions.map(transaction => ({
          date: transaction.createdAt,
          amount: transaction.amount,
          type: transaction.type
        })),
        
        // Status breakdown
        statusBreakdown: [
          {
            status: 'completed',
            count: deliveries.filter(d => d.status === 'completed').length
          },
          {
            status: 'pending',
            count: deliveries.filter(d => d.status === 'pending').length
          },
          {
            status: 'in-progress',
            count: deliveries.filter(d => d.status === 'in-progress').length
          },
          {
            status: 'cancelled',
            count: deliveries.filter(d => d.status === 'cancelled').length
          }
        ]
      };
      
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching user dashboard data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get data for partner dashboards in Looker Studio
  router.get('/data/partner/:userId', authenticate, async (req, res) => {
    try {
      const { userId } = req.params;
      const { timeRange } = req.query; // e.g., "30days", "90days", "all"
      
      // Verify user is requesting their own data or is an admin
      if (req.user._id.toString() !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // Calculate date range
      let dateFilter = {};
      const now = new Date();
      
      if (timeRange === '30days') {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        dateFilter = { completedAt: { $gte: thirtyDaysAgo } };
      } else if (timeRange === '90days') {
        const ninetyDaysAgo = new Date(now);
        ninetyDaysAgo.setDate(now.getDate() - 90);
        dateFilter = { completedAt: { $gte: ninetyDaysAgo } };
      }
      
      // Get all completed deliveries by this partner
      const deliveries = await DeliveryRequest.find({ 
        partnerId: userId,
        status: 'completed',
        ...dateFilter
      }).sort({ completedAt: 1 });
      
      // Get all earnings transactions
      const transactions = await Transaction.find({ 
        partnerId: userId,
        type: 'earning',
        ...dateFilter
      }).sort({ createdAt: 1 });
      
      // Get reviews received
      const reviews = await Review.find({
        receiverId: userId,
        ...dateFilter
      }).sort({ createdAt: 1 });
      
      // Format data for Looker Studio
      const formattedData = {
        // Earnings over time
        earningsOverTime: transactions.map(transaction => ({
          date: transaction.createdAt,
          amount: transaction.amount
        })),
        
        // Deliveries over time
        deliveriesOverTime: deliveries.map(delivery => ({
          date: delivery.completedAt,
          deliveryTime: delivery.actualDeliveryTime || 0
        })),
        
        // Ratings over time
        ratingsOverTime: reviews.map(review => ({
          date: review.createdAt,
          rating: review.rating
        })),
        
        // Monthly performance
        monthlyPerformance: getMonthlyPerformanceData(deliveries, transactions)
      };
      
      res.json(formattedData);
    } catch (error) {
      console.error('Error fetching partner dashboard data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Helper function to calculate monthly performance
  function getMonthlyPerformanceData(deliveries, transactions) {
    const monthlyData = {};
    
    // Process deliveries
    deliveries.forEach(delivery => {
      const month = new Date(delivery.completedAt).toISOString().substring(0, 7); // YYYY-MM format
      
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          deliveryCount: 0,
          totalEarnings: 0,
          averageDeliveryTime: 0,
          totalDeliveryTime: 0
        };
      }
      
      monthlyData[month].deliveryCount += 1;
      
      if (delivery.actualDeliveryTime) {
        monthlyData[month].totalDeliveryTime += delivery.actualDeliveryTime;
      }
    });
    
    // Process transactions
    transactions.forEach(transaction => {
      const month = new Date(transaction.createdAt).toISOString().substring(0, 7);
      
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          deliveryCount: 0,
          totalEarnings: 0,
          averageDeliveryTime: 0,
          totalDeliveryTime: 0
        };
      }
      
      monthlyData[month].totalEarnings += transaction.amount;
    });
    
    // Calculate averages
    Object.values(monthlyData).forEach(data => {
      if (data.deliveryCount > 0) {
        data.averageDeliveryTime = Math.round(data.totalDeliveryTime / data.deliveryCount);
      }
      delete data.totalDeliveryTime; // Remove temp calculation field
    });
    
    // Convert to array and sort by month
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }
  
  export default router;
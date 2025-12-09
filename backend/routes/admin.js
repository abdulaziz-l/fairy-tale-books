const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Admin login validation
const validateLogin = [
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Admin login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // In production, use proper password hashing
    // For demo purposes, we're using plain text comparison
    if (password !== adminPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        role: 'admin',
        timestamp: Date.now()
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        role: 'admin',
        loggedInAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Admin logout (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Get admin dashboard stats
router.get('/stats', (req, res) => {
  // This would typically be protected by admin middleware
  // For now, returning mock stats
  res.json({
    success: true,
    stats: {
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      newOrdersToday: 0
    }
  });
});

module.exports = router;
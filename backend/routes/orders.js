const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const TelegramBot = require('../services/telegram');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'photos');
    try {
      await fs.access(uploadPath);
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Story templates mapping
const storyTemplates = {
  'enchanted-forest': 'The Enchanted Forest Adventure',
  'princess-dragon': 'The Princess and the Dragon',
  'magic-garden': 'The Magic Garden'
};

// Validation middleware
const validateOrder = [
  body('childName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Child name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('storyTemplate')
    .isIn(Object.keys(storyTemplates))
    .withMessage('Please select a valid story template'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Create new order
router.post('/', upload.single('photo'), validateOrder, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a photo' });
    }

    const { childName, email, storyTemplate } = req.body;
    const storyTitle = storyTemplates[storyTemplate];

    // Create order
    const order = new Order({
      childName,
      email,
      storyTemplate,
      storyTitle,
      photoUrl: `/uploads/photos/${req.file.filename}`,
      photoPath: req.file.path
    });

    await order.save();

    // Send Telegram notification
    try {
      await TelegramBot.sendNewOrderNotification(order, req.file);
      order.telegramNotificationSent = true;
      await order.save();
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError);
      // Don't fail the order if Telegram fails
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order.orderId,
      order: order.summary
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    // Clean up uploaded file if order failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }

    res.status(500).json({ 
      message: 'Failed to create order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      order: order.summary
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve order',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get all orders (admin only)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      orders: orders.map(order => order.summary),
      total: orders.length
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve orders',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Upload PDF for order (admin only)
router.post('/:orderId/upload-pdf', async (req, res) => {
  try {
    // This would typically be protected by admin middleware
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'ready') {
      return res.status(400).json({ message: 'Order already has a PDF uploaded' });
    }

    // In a real implementation, you'd handle PDF upload here
    // For now, we'll simulate the PDF upload
    const pdfUrl = `/uploads/pdfs/${order.orderId}.pdf`;
    const pdfPath = path.join(__dirname, '..', 'uploads', 'pdfs', `${order.orderId}.pdf`);

    // Ensure directory exists
    await fs.mkdir(path.dirname(pdfPath), { recursive: true });

    // Create a placeholder PDF file (in production, this would be the actual uploaded PDF)
    await fs.writeFile(pdfPath, 'PDF content placeholder');

    // Update order
    order.pdfUrl = pdfUrl;
    order.pdfPath = pdfPath;
    order.status = 'ready';
    await order.save();

    res.json({
      success: true,
      message: 'PDF uploaded successfully',
      order: order.summary
    });

  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload PDF',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;
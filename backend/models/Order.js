const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  childName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+$/i, 'Please enter a valid email address']
  },
  storyTemplate: {
    type: String,
    required: true,
    enum: ['enchanted-forest', 'princess-dragon', 'magic-garden']
  },
  storyTitle: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  photoPath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'ready'],
    default: 'pending',
    index: true
  },
  pdfUrl: {
    type: String,
    default: null
  },
  pdfPath: {
    type: String,
    default: null
  },
  telegramNotificationSent: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: '',
    maxlength: 500
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.photoPath;
      delete ret.pdfPath;
      delete ret.__v;
      return ret;
    }
  }
});

// Virtual for order summary
orderSchema.virtual('summary').get(function() {
  return {
    orderId: this.orderId,
    childName: this.childName,
    email: this.email,
    storyTitle: this.storyTitle,
    status: this.status,
    createdAt: this.createdAt,
    photoUrl: this.photoUrl,
    pdfUrl: this.pdfUrl
  };
});

// Static method to generate order ID
orderSchema.statics.generateOrderId = function() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `FT${timestamp.slice(-6)}${random}`;
};

// Pre-save middleware
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = this.constructor.generateOrderId();
  }
  next();
});

// Index for better query performance
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ email: 1 });
orderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', orderSchema);
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs').promises;
const path = require('path');

class TelegramNotificationService {
  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
    this.bot = null;
    this.initialized = false;

    if (this.botToken && this.chatId) {
      this.initializeBot();
    } else {
      console.log('⚠️  Telegram bot not configured. Notifications will be logged to console.');
    }
  }

  initializeBot() {
    try {
      this.bot = new TelegramBot(this.botToken, { polling: false });
      this.initialized = true;
      console.log('✅ Telegram bot initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Telegram bot:', error.message);
      this.initialized = false;
    }
  }

  async sendNewOrderNotification(order, file) {
    if (!this.initialized) {
      // Log to console if Telegram is not configured
      console.log('📧 NEW ORDER NOTIFICATION');
      console.log('Order ID:', order.orderId);
      console.log('Child Name:', order.childName);
      console.log('Email:', order.email);
      console.log('Story:', order.storyTitle);
      console.log('Photo:', file.originalname);
      console.log('─'.repeat(50));
      return;
    }

    try {
      const message = this.formatOrderMessage(order);
      
      // Send text message
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });

      // Send photo if file exists
      if (file && file.path) {
        try {
          const photoBuffer = await fs.readFile(file.path);
          await this.bot.sendPhoto(this.chatId, photoBuffer, {
            caption: `📸 Photo for Order #${order.orderId}`
          });
        } catch (photoError) {
          console.error('Failed to send photo:', photoError.message);
          // Send notification about photo failure
          await this.bot.sendMessage(this.chatId, 
            `⚠️ Could not send photo for Order #${order.orderId}. Please check the file manually.`,
            { parse_mode: 'HTML' }
          );
        }
      }

      console.log(`✅ Telegram notification sent for Order #${order.orderId}`);

    } catch (error) {
      console.error('Failed to send Telegram notification:', error.message);
      throw error;
    }
  }

  async sendOrderCompletedNotification(order) {
    if (!this.initialized) {
      console.log(`✅ Order #${order.orderId} completed for ${order.childName}`);
      return;
    }

    try {
      const message = this.formatCompletionMessage(order);
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'HTML'
      });
      console.log(`✅ Completion notification sent for Order #${order.orderId}`);
    } catch (error) {
      console.error('Failed to send completion notification:', error.message);
    }
  }

  formatOrderMessage(order) {
    return `
🎉 <b>NEW FAIRY-TALE ORDER!</b>

📋 <b>Order Details:</b>
• Order ID: <code>#${order.orderId}</code>
• Child Name: ${order.childName}
• Email: ${order.email}
• Story Template: ${order.storyTitle}

⏰ <b>Timeline:</b>
• Order Date: ${new Date(order.createdAt).toLocaleDateString()}
• Expected Delivery: 3-5 business days

📸 <b>Next Steps:</b>
1. Download the child's photo from the admin panel
2. Create the personalized fairy-tale book
3. Upload the completed PDF
4. The customer will receive an email notification

💫 <i>Let's create some magic!</i>
    `.trim();
  }

  formatCompletionMessage(order) {
    return `
✅ <b>ORDER COMPLETED!</b>

📋 <b>Order Details:</b>
• Order ID: <code>#${order.orderId}</code>
• Child Name: ${order.childName}
• Email: ${order.email}
• Story Template: ${order.storyTitle}

📧 <b>Customer Notification:</b>
The customer has been notified via email and can now download their magical fairy-tale book!

🎊 <i>Another happy little dreamer!</i>
    `.trim();
  }

  async testConnection() {
    if (!this.initialized) {
      console.log('⚠️  Telegram bot not configured');
      return false;
    }

    try {
      const botInfo = await this.bot.getMe();
      console.log('✅ Telegram bot connected:', botInfo.username);
      return true;
    } catch (error) {
      console.error('❌ Telegram bot connection failed:', error.message);
      return false;
    }
  }
}

// Create singleton instance
const telegramService = new TelegramNotificationService();

module.exports = telegramService;
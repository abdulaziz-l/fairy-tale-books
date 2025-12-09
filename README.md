# 🧚‍♀️ Fairy Tale Portrait Books - Complete Web Application

A magical web application that creates personalized fairy-tale books for children by transforming their photos into storybook characters.

## ✨ Features

- **🎨 Beautiful, Magical UI** - Warm, fairy-tale themed design with animations
- **📸 Photo Upload** - Easy drag-and-drop photo upload with validation
- **📚 Story Templates** - Multiple fairy-tale adventures to choose from
- **🔔 Telegram Notifications** - Instant notifications when orders are placed
- **👨‍💼 Admin Panel** - Complete order management system
- **📱 Fully Responsive** - Works perfectly on all devices
- **⚡ Fast & Modern** - Built with React, Node.js, and MongoDB

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and handling
- **React Dropzone** - File upload with drag-and-drop
- **Axios** - HTTP client for API calls

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB** - NoSQL database for order storage
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **JWT** - Admin authentication
- **Telegram Bot API** - Order notifications
- **Helmet & CORS** - Security middleware

### Deployment
- **Frontend**: Netlify (static hosting)
- **Backend**: Render (Node.js hosting)
- **Database**: MongoDB Atlas (cloud database)

## 📁 Project Structure

```
fairy-tale-books/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── backend/                 # Node.js backend API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── uploads/            # File storage
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── netlify.toml            # Netlify deployment config
├── render.yaml             # Render deployment config
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)
- Telegram Bot Token (optional)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd fairy-tale-books
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your configuration
# Start MongoDB (if using local)
mongod --dbpath /path/to/data

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Copy environment variables
cp .env.example .env

# Start the development server
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fairy-tale-books
JWT_SECRET=your-secret-key
ADMIN_PASSWORD=admin123
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Telegram Bot Setup

1. **Create a Telegram Bot**:
   - Message @BotFather on Telegram
   - Use `/newbot` command
   - Save the bot token

2. **Get Your Chat ID**:
   - Message your new bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response

3. **Add Configuration**:
   - Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to your `.env`

## 🎯 Usage

### Creating a Book

1. **Visit the Homepage** - See the magical landing page
2. **Click "Create Book"** - Navigate to the upload form
3. **Fill the Form**:
   - Enter child's name
   - Provide email address
   - Select a story template
   - Upload a photo
4. **Submit Order** - Receive confirmation and order ID

### Admin Panel

1. **Login as Admin**:
   - Navigate to `/admin/login`
   - Use password from `ADMIN_PASSWORD`
   - Default: `admin123`

2. **Manage Orders**:
   - View all orders in a table
   - See order details
   - Upload completed PDFs
   - Track order status

### Order Workflow

1. **Customer Places Order** → Photo uploaded, order saved
2. **Telegram Notification** → You receive notification with details
3. **Manual Processing** → Create the fairy-tale book (offline)
4. **Upload PDF** → Use admin panel to upload completed book
5. **Customer Receives Email** → Automatic notification with download link

## 🚀 Deployment

### Frontend (Netlify)

1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

2. **Environment Variables**:
   - Add `REACT_APP_API_URL` to Netlify environment variables
   - Set to your backend URL (e.g., `https://your-backend.onrender.com/api`)

3. **Deploy** - Netlify will automatically deploy on push

### Backend (Render)

1. **Create Web Service**:
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your repository
   - Use `render.yaml` for configuration

2. **Environment Variables**:
   - Add all required environment variables in Render dashboard
   - Use MongoDB Atlas for production database

3. **Deploy** - Render will deploy automatically

### Database (MongoDB Atlas)

1. **Create Cluster**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Add your IP to whitelist
   - Create database user

2. **Get Connection String**:
   - Copy the connection string
   - Add to your `.env` file
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database`

## 📱 Story Templates

The app comes with 3 magical story templates:

1. **The Enchanted Forest Adventure** - A magical journey through talking animals
2. **The Princess and the Dragon** - A tale of misunderstood dragons
3. **The Magic Garden** - Where flowers bloom with kind deeds

### Adding New Templates

1. **Update the mapping** in `backend/routes/orders.js`:
```javascript
const storyTemplates = {
  'enchanted-forest': 'The Enchanted Forest Adventure',
  'princess-dragon': 'The Princess and the Dragon',
  'magic-garden': 'The Magic Garden',
  'your-new-template': 'Your New Story Title'
};
```

2. **Update the frontend** in `frontend/src/pages/UploadPage.js`:
```javascript
const storyTemplates = [
  { id: 'your-new-template', title: 'Your New Story Title', theme: 'Theme' }
];
```

## 🔒 Security Features

- **File Upload Validation** - Only images, size limits
- **CORS Protection** - Configured for specific origins
- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Server-side validation
- **JWT Authentication** - Secure admin access
- **Helmet.js** - Security headers

## 📊 Monitoring

### Health Checks
- **Backend**: `/health` - Returns server status
- **Database**: Connection status logged on startup

### Logging
- **Request Logging**: Morgan for HTTP logs
- **Error Logging**: Console.error for debugging
- **Telegram Logs**: Success/failure notifications

## 🎨 Customization

### Colors & Styling

Edit `frontend/tailwind.config.js` to customize the magical theme:

```javascript
colors: {
  'cream': '#fdf3e7',
  'peach': '#ffd8b8',
  'lavender': '#c4b5fd',
  'mint': '#86efac',
  // Add your custom colors
}
```

### Animations

Modify animations in the same file:

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
  // Add your custom animations
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Check MongoDB is running
   - Verify connection string
   - Check firewall settings

2. **File Upload Not Working**:
   - Check `uploads` directory permissions
   - Verify file size limits
   - Check file type validation

3. **Telegram Notifications Not Sending**:
   - Verify bot token and chat ID
   - Check bot has permission to send messages
   - Test connection using `testConnection()`

4. **CORS Issues**:
   - Verify `FRONTEND_URL` in backend `.env`
   - Check frontend `REACT_APP_API_URL`
   - Ensure URLs match exactly

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages in API responses.

## 📄 License

This project is created for Fairy Tale Portrait Books. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

Need help? Contact us at:
- Email: hello@fairytalebooks.com
- Telegram: @FairyTaleBooksSupport

---

✨ **Made with magic for little dreamers** ✨
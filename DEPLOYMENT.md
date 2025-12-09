# 🚀 Deployment Guide - Fairy Tale Books

This guide will walk you through deploying your fairy-tale book application to production using Netlify (frontend) and Render (backend).

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ Git repository with your code
- ✅ MongoDB Atlas account (free tier works)
- ✅ Telegram Bot (optional but recommended)
- ✅ Accounts on Netlify and Render

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new project called "fairy-tale-books"

2. **Create Cluster**:
   - Click "Build a Cluster"
   - Choose "Shared" (free tier)
   - Select your preferred cloud provider and region
   - Click "Create Cluster" (takes a few minutes)

3. **Configure Database Access**:
   - Go to "Database Access" in left sidebar
n   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows Render to connect

5. **Get Connection String**:
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Save this string for later

## 🤖 Step 2: Telegram Bot Setup (Optional)

1. **Create Bot**:
   - Open Telegram and search for @BotFather
   - Send `/newbot` command
   - Follow prompts to create bot
   - Save the bot token

2. **Get Chat ID**:
   - Message your new bot directly
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response (usually a negative number for groups)

## 🎨 Step 3: Frontend Deployment (Netlify)

### Method 1: Git Integration (Recommended)

1. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your Git provider
   - Select your fairy-tale-books repository

2. **Configure Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

3. **Set Environment Variables**:
   - `REACT_APP_API_URL`: Your future backend URL (e.g., `https://your-backend.onrender.com/api`)
   - You can update this after deploying backend

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Your site will be available at `https://[your-site-name].netlify.app`

### Method 2: Manual Deploy

1. **Build Locally**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `frontend/build` folder to Netlify dashboard
   - Set environment variables as above

## ⚙️ Step 4: Backend Deployment (Render)

### Method 1: Using Render Blueprint (Recommended)

1. **Create Render Account**:
   - Go to [Render](https://render.com)
   - Sign up for free account

2. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect your Git repository
   - Render should detect the `render.yaml` file

3. **Configure Service**:
   - Name: `fairy-tale-books-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free (or paid for production)

4. **Set Environment Variables**:
   Add these in the Render dashboard:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secure string (generate with `openssl rand -base64 32`)
   - `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
   - `TELEGRAM_CHAT_ID`: Your Telegram chat ID
   - `ADMIN_PASSWORD`: Your admin password
   - `FRONTEND_URL`: Your Netlify frontend URL

5. **Add Disk for File Storage**:
   - In Render dashboard, go to your service
   - Click "Disks" → "Create Disk"
   - Name: `uploads`
   - Mount Path: `/opt/render/project/src/uploads`
   - Size: 5GB (free tier)

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your API will be available at `https://[your-service].onrender.com`

### Method 2: Manual Configuration

1. **Prepare Code**:
   - Ensure all environment variables are configured
   - Test locally with `NODE_ENV=production`

2. **Create Web Service**:
   - Follow steps above but configure manually
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`

## 🔗 Step 5: Connect Frontend and Backend

1. **Update Frontend Environment Variable**:
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Update `REACT_APP_API_URL` to your Render backend URL
   - Trigger a rebuild (deploy again)

2. **Test the Connection**:
   - Visit your Netlify frontend
   - Try creating a test order
   - Check if Telegram notifications work
   - Log in to admin panel

## ✅ Step 6: Testing & Verification

### Test the Complete Flow:

1. **Customer Journey**:
   - Visit your frontend URL
   - Create a test order with a sample photo
   - Verify order confirmation page

2. **Admin Journey**:
   - Go to `/admin/login` on your frontend
   - Login with your admin password
   - View the order in the dashboard
   - Upload a test PDF file

3. **Notifications**:
   - Check Telegram for order notifications
   - Verify admin panel shows order status

4. **File Uploads**:
   - Test photo upload (max 5MB)
   - Test PDF upload in admin panel
   - Verify files are stored properly

## 🛠️ Production Configuration

### Security Checklist:

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS (automatic on Netlify/Render)
- [ ] Set up custom domain (optional)
- [ ] Configure proper CORS origins
- [ ] Add rate limiting
- [ ] Set up monitoring/logging

### Performance Optimization:

- [ ] Enable compression on backend
- [ ] Optimize images on frontend
- [ ] Set up CDN for static assets
- [ ] Configure caching headers
- [ ] Monitor bundle size

## 📊 Monitoring & Maintenance

### Logs:
- **Netlify**: Build logs in dashboard
- **Render**: Runtime logs in dashboard
- **MongoDB Atlas**: Database performance metrics

### Updates:
- Regular dependency updates
- Monitor for security vulnerabilities
- Backup database regularly
- Keep environment variables secure

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check `FRONTEND_URL` in backend matches your Netlify URL
   - Ensure no trailing slashes in URLs

2. **Database Connection Failed**:
   - Verify MongoDB Atlas whitelist includes 0.0.0.0/0
   - Check connection string format
   - Ensure database user has correct permissions

3. **File Upload Not Working**:
   - Check disk is mounted on Render
   - Verify file size limits
   - Check file permissions

4. **Telegram Notifications Not Working**:
   - Verify bot token and chat ID
   - Check bot has permission to send messages
   - Test with simple message first

5. **Admin Login Not Working**:
   - Check JWT secret is set correctly
   - Verify admin password
   - Check browser console for errors

### Debug Mode:

Set `NODE_ENV=development` to see detailed error messages:
- In Render: Environment variables
- Locally: `export NODE_ENV=development`

## 🎉 Success!

Once everything is working:
1. ✅ Frontend deployed and accessible
2. ✅ Backend API responding
3. ✅ Database connected
4. ✅ Telegram notifications working
5. ✅ Admin panel accessible
6. ✅ File uploads working
7. ✅ Complete order flow tested

Your fairy-tale book application is now live and ready to create magic! ✨

## 📞 Support

If you encounter issues:
- Check logs in Netlify/Render dashboards
- Review environment variables
- Test locally first
- Check this guide for common solutions

---

**Happy deploying! May your fairy-tale books bring joy to children everywhere! 🧚‍♀️📚**
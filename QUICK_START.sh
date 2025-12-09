#!/bin/bash

# 🧚‍♀️ Fairy Tale Books - Quick Start Script
# This script helps you get started with the fairy-tale book application

set -e

echo "✨ Welcome to Fairy Tale Books Quick Start! ✨"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Function to setup backend
setup_backend() {
    echo ""
    echo "🚀 Setting up Backend..."
    echo "========================"
    
    cd backend
    
    echo "📦 Installing backend dependencies..."
    npm install
    
    echo "⚙️  Setting up environment variables..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo "⚠️  Please edit .env file with your configuration:"
        echo "   - MONGODB_URI: Your MongoDB connection string"
        echo "   - TELEGRAM_BOT_TOKEN: Your Telegram bot token (optional)"
        echo "   - TELEGRAM_CHAT_ID: Your Telegram chat ID (optional)"
    else
        echo "✅ .env file already exists"
    fi
    
    echo "✅ Backend setup complete!"
    cd ..
}

# Function to setup frontend
setup_frontend() {
    echo ""
    echo "🎨 Setting up Frontend..."
    echo "========================="
    
    cd frontend
    
    echo "📦 Installing frontend dependencies..."
    npm install
    
    echo "⚙️  Setting up environment variables..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo "⚠️  Please edit .env file with your configuration:"
        echo "   - REACT_APP_API_URL: Your backend API URL"
    else
        echo "✅ .env file already exists"
    fi
    
    echo "✅ Frontend setup complete!"
    cd ..
}

# Function to create necessary directories
create_directories() {
    echo ""
    echo "📁 Creating necessary directories..."
    echo "===================================="
    
    mkdir -p backend/uploads/photos
    mkdir -p backend/uploads/pdfs
    
    echo "✅ Directories created"
}

# Function to display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup Complete!"
    echo "=================="
    echo ""
    echo "📋 Next Steps:"
    echo "=============="
    echo "1. Edit your environment files:"
    echo "   - backend/.env (database, telegram, etc.)"
    echo "   - frontend/.env (API URL)"
    echo ""
    echo "2. Start MongoDB (if using local):"
    echo "   mongod --dbpath /path/to/data"
    echo ""
    echo "3. Start the backend server:"
    echo "   cd backend && npm run dev"
    echo ""
    echo "4. In a new terminal, start the frontend:"
    echo "   cd frontend && npm start"
    echo ""
    echo "5. Visit http://localhost:3000 to see your app!"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md: Complete project documentation"
    echo "   - DEPLOYMENT.md: Production deployment guide"
    echo ""
    echo "✨ Happy coding! May your fairy-tales bring joy to children everywhere! ✨"
}

# Main execution
main() {
    create_directories
    setup_backend
    setup_frontend
    show_next_steps
}

# Run main function
main
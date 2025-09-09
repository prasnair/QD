#!/bin/bash

# QMSDesk Demo Deployment Script
echo "🚀 QMSDesk Demo Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if code is committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Ready for deployment'"
    exit 1
fi

echo "✅ Git repository is ready"

# Check environment variables
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Please create it with:"
    echo "   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    exit 1
fi

echo "✅ Environment variables configured"

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "🎉 Your project is ready for deployment!"
echo ""
echo "Choose your deployment option:"
echo "1. Vercel (Recommended for demo)"
echo "2. Azure Static Web Apps"
echo "3. AWS Amplify"
echo ""
echo "Follow the instructions in DEMO-DEPLOYMENT.md for detailed steps."

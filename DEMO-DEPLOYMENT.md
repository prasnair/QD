# QMSDesk Demo Deployment Guide

This guide will help you deploy QMSDesk to a demo environment on AWS or Azure.

## Prerequisites

- Node.js 18+ installed
- Git installed
- AWS Account (for AWS deployment)
- Azure Account (for Azure deployment)
- Supabase project set up

## Option 1: AWS Demo Deployment (Vercel - Easiest)

### Step 1: Prepare Your Code
```bash
# Ensure your code is committed to Git
git add .
git commit -m "Ready for demo deployment"
git push origin main
```

### Step 2: Deploy to Vercel (AWS Infrastructure)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your QMSDesk repository
5. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"

### Step 3: Access Your Demo
- Vercel will provide a URL like: `https://qmsdesk-demo.vercel.app`
- Your demo is now live!

## Option 2: Azure Demo Deployment (Static Web Apps)

### Step 1: Install Azure CLI
```bash
# Install Azure CLI (if not already installed)
# Windows: Download from https://aka.ms/installazurecliwindows
# macOS: brew install azure-cli
# Linux: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Step 2: Login to Azure
```bash
az login
```

### Step 3: Create Static Web App
```bash
# Create resource group
az group create --name qmsdesk-demo-rg --location "East US"

# Create static web app
az staticwebapp create \
  --name qmsdesk-demo \
  --resource-group qmsdesk-demo-rg \
  --source https://github.com/YOUR_USERNAME/QMSDesk \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location ".next"
```

### Step 4: Configure Environment Variables
```bash
# Set environment variables
az staticwebapp appsettings set \
  --name qmsdesk-demo \
  --resource-group qmsdesk-demo-rg \
  --setting-names \
    NEXT_PUBLIC_SUPABASE_URL="your-supabase-url" \
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### Step 5: Access Your Demo
- Azure will provide a URL like: `https://qmsdesk-demo.azurestaticapps.net`
- Your demo is now live!

## Option 3: AWS Amplify (Alternative)

### Step 1: Prepare Build Configuration
Create `amplify.yml` in your project root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 2: Deploy to AWS Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Select your branch (main)
5. Configure build settings (use the amplify.yml above)
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Save and deploy"

## Supabase Demo Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and anon key

### Step 2: Run Database Setup
```bash
# Connect to your Supabase project
# Go to SQL Editor in Supabase dashboard
# Run the schema and seed files:

# 1. First run: supabase/schema.sql
# 2. Then run: supabase/seed.sql
```

### Step 3: Configure RLS Policies
Ensure Row Level Security is enabled in Supabase dashboard.

## Demo Environment Variables

Create a `.env.production` file for your demo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Quick Demo Access

Once deployed, you can access your demo with:
- **Default Login**: Use the seeded user accounts from the seed data
- **Demo URL**: Your deployment platform will provide the URL
- **Features**: All QMSDesk features will be available in demo mode

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check Node.js version (18+ required)
2. **Environment Variables**: Ensure all required variables are set
3. **Database Connection**: Verify Supabase URL and keys are correct
4. **Static Export**: For static deployments, ensure `output: 'export'` in next.config.js

### For Static Deployments:
Add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## Demo Limitations

- **Data Persistence**: Demo data may be reset
- **Performance**: May have slower response times
- **Storage**: Limited file upload capabilities
- **Users**: Demo user accounts only

## Next Steps

After successful demo deployment:
1. Test all features
2. Share demo URL with stakeholders
3. Gather feedback
4. Plan production deployment with proper security and scaling

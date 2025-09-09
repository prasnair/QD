# QMSDesk Setup Guide

## 🚀 Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Create `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://karoabohecdnzsddlaiq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthcm9hYm9oZWNkbnpzZGRsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMDU2NTIsImV4cCI6MjA3Mjg4MTY1Mn0.mKy2XmXJ4QEUzwRC2KY51j4i7qm2DTJedBlXyx7vKkI
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/karoabohecdnzsddlaiq)
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** to execute

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Application
Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Optional: Generate Types from Database

If you want to generate TypeScript types from your actual database:

```bash
# Login to Supabase CLI
npx supabase login

# Generate types
npx supabase gen types typescript --project-id karoabohecdnzsddlaiq > src/types/supabase.ts
```

## 🎯 What's Included

- ✅ Multi-tenant architecture
- ✅ Role-based access control
- ✅ Beautiful UI with transparency effects
- ✅ Glass morphism design
- ✅ Gradient animations
- ✅ Responsive design
- ✅ Authentication system
- ✅ Dashboard with role-based views
- ✅ Database schema with RLS policies

## 🚨 Important Notes

1. **Database Schema**: Make sure to run the `supabase/schema.sql` file in your Supabase project
2. **Authentication**: You'll need to set up email authentication in your Supabase project settings
3. **Service Role Key**: Get this from your Supabase project settings for admin operations
4. **First User**: Create your first user through Supabase Auth after setting up email authentication

## 🎨 UI Features

- **Glass Morphism**: Transparent elements with backdrop blur
- **Gradient System**: Beautiful color gradients throughout
- **Hover Effects**: Smooth animations and glow effects
- **Responsive**: Works on all device sizes
- **Modern Design**: Ultra-clean, uncluttered interface

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Multi-tenant Isolation**: Complete data segregation
- **Audit Logging**: Immutable action tracking
- **Role-based Permissions**: Granular access control

## 📱 Next Steps

1. Set up email authentication in Supabase
2. Create your first organization and user
3. Customize the application for your needs
4. Add sample data to test functionality

# Deployment Guide

## Vercel Deployment

### 1. Environment Variables
Set these environment variables in your Vercel dashboard:

```
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-app-name.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### 2. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Domain Configuration
Update `NEXTAUTH_URL` to match your actual domain once deployed.

### 4. Database Setup
Ensure your MongoDB cluster allows connections from all IPs (0.0.0.0/0) or add Vercel's IP ranges.

## Local Development

1. Copy `.env.example` to `.env.local`
2. Update the environment variables with your actual values
3. Run `npm install`
4. Run `npm run dev`

## Features
- Role-based authentication (admin, student, consumer)
- Clean dashboard interfaces
- MongoDB integration
- NextAuth.js authentication
- Responsive design
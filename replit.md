# BDO-APP - Binary Options Lucky Draw Application

## Overview
A React TypeScript application featuring a welcome page and fortune wheel for new users to claim bonuses. Built with modern stack including React, TypeScript, Express.js, and Tailwind CSS.

## Recent Changes
- Project initialized on September 23, 2025
- **September 23, 2025**: Complete database and authentication cleanup
  - Removed all unused database configurations (Drizzle, Prisma, PostgreSQL)
  - Removed authentication systems (Passport, bcrypt, sessions)
  - Cleaned dependencies for Netlify deployment
  - Project now runs as pure client-side application

## User Preferences
- Clean, modern UI with gradient designs
- Mobile-responsive design
- Toast notifications for user feedback

## Project Architecture
- **Frontend**: React 18 with TypeScript, Wouter routing, TanStack Query, Tailwind CSS
- **Backend**: Express.js (development server only)
- **Data**: Client-side mock data with localStorage persistence
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite with custom configuration
- **Deployment**: Static site ready for Netlify/Vercel

### Key Features
- Welcome page with bonus claim functionality
- Fortune wheel with weighted probability system
- Prize pool display and statistics tracking
- Mobile-optimized responsive design
- Toast notifications for user interactions

### File Structure
- `client/` - React frontend application
- `server/` - Express.js development server (basic health check only)
- `shared/` - Shared TypeScript interfaces
- `attached_assets/` - Static assets and images
- `dist/public/` - Production build output for deployment
- `netlify.toml` - Netlify deployment configuration

### Dependencies
- React Query for state management
- Wouter for routing
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling
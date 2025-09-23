# BDO Binary Lucky Draw

## Overview

BDO Binary is a web-based lucky draw application that allows users to spin a fortune wheel to win cash prizes. The system features user authentication, balance tracking, and administrative controls for managing prizes and monitoring user activity. Built with modern technologies, it provides a complete gambling/lottery experience with proper security measures and rate limiting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better development experience
- **UI Library**: Shadcn/UI components built on Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming support (light/dark mode)
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication with bcrypt for password hashing
- **Database Provider**: Neon Database for serverless PostgreSQL hosting
- **Rate Limiting**: In-memory rate limiting to prevent abuse of spin endpoints
- **Security**: CORS protection, input validation with Zod schemas

### Database Schema
- **Users**: Stores user credentials, admin status, and timestamps
- **Balances**: Tracks user profit amounts with decimal precision
- **Prizes**: Configurable prize pool with amounts, weights for probability, and active status
- **Spins**: Complete audit trail of all spins with user, prize, IP, and user agent tracking

### Core Features
- **Fortune Wheel**: Interactive spinning mechanism with weighted probability distribution
- **User Management**: Registration, login, and session management
- **Balance System**: Tracks user winnings with precise decimal calculations
- **Admin Panel**: Prize management, user statistics, and system monitoring
- **Rate Limiting**: Prevents abuse with configurable request limits per user
- **Audit Trail**: Complete logging of all spins and user actions for security

### Authentication & Authorization
- **Session Management**: Server-side session storage with secure session IDs
- **Role-based Access**: Admin users have additional privileges for system management
- **Password Security**: Bcrypt hashing with salt for secure password storage
- **Request Authentication**: Bearer token authentication for API endpoints

### Development Features
- **Hot Module Replacement**: Vite development server with instant updates
- **Error Handling**: Runtime error overlays and comprehensive error boundaries
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Simplified imports with @ aliases for better code organization

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **Prisma Client**: Alternative ORM implementation for database operations

### UI & Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Web fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)

### Development Tools
- **Vite**: Build tool with HMR and optimized bundling
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **Replit Plugins**: Development environment integration for error handling and debugging

### Security & Validation
- **bcryptjs**: Password hashing and verification
- **Zod**: Runtime type validation and schema validation
- **React Hook Form**: Form state management with validation integration

### State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **React Context**: Client-side state management for authentication and UI state
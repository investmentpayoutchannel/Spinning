# BDO Binary Lucky Draw

A modern React-based lucky draw application built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 🌐 Deploy to Vercel

### Option 1: Direct Upload
1. Run `npm run build` to create the production build
2. Upload the `dist` folder contents to Vercel

### Option 2: Git Integration
1. Push this project to a Git repository
2. Connect the repository to Vercel
3. Vercel will automatically detect the configuration

### Option 3: v0.app Integration
1. Export this project to v0.app AI workspace
2. The project is fully compatible with v0.app's AI preview system
3. All components use Shadcn/UI and are AI-friendly structured

## 📁 Project Structure

```
client/src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── fortune-wheel.tsx
│   └── navigation.tsx
├── pages/              # Page components
│   ├── welcome.tsx     # Landing page
│   ├── lucky-draw.tsx  # Main game page
│   └── not-found.tsx   # 404 page
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
└── App.tsx             # Main application component
```

## 🎮 Features

- **Interactive Fortune Wheel**: Spin to win cash prizes
- **Responsive Design**: Works on mobile and desktop
- **Modern UI**: Built with Shadcn/UI and Tailwind CSS
- **TypeScript**: Fully typed for better development experience
- **No Authentication Required**: Simple, instant access

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn/UI (Radix UI + Tailwind CSS)
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🎯 v0.app Compatibility

This project is optimized for v0.app AI workspace:

- ✅ Clean component structure
- ✅ Proper TypeScript types
- ✅ Shadcn/UI components
- ✅ Standard React patterns
- ✅ AI-friendly code organization

## 📦 Dependencies

Core dependencies are minimal and focused:
- React ecosystem (React, React DOM)
- UI library (Radix UI components)
- Styling (Tailwind CSS)
- Build tools (Vite, TypeScript)

## 🚀 Deployment Configuration

The project includes:
- `vercel.json` - Optimized for Vercel deployment
- Vite build configuration
- Static site generation ready
- SPA routing configured

## 🎨 Customization

The app uses Tailwind CSS custom properties for theming:
- Primary colors can be adjusted in `client/src/index.css`
- Components follow Shadcn/UI design system
- Responsive breakpoints are pre-configured
# Pokémon Explorer

A modern, performant Pokémon browsing application built with Next.js 16, featuring infinite scroll, search, sorting, and detailed Pokémon information.

## Links

- **Live Demo**: [https://frontend-developer-technical-test-labamu.vercel.app](https://frontend-developer-technical-test-labamu.vercel.app)

## Features

- **Modern UI/UX** - Clean, responsive design with smooth animations
- **Real-time Search** - Instant search filtering with URL state management
- **Smart Sorting** - Sort Pokémon by ID or name (A-Z)
- **Virtualized Infinite Scroll** - Optimized rendering for thousands of items
- **Detailed Pokémon Pages** - Individual pages with stats, abilities, and information
- **Performance Optimized** - Server-side rendering, caching, and virtualization
- **Loading States** - Skeleton screens and loading indicators
- **Error Handling** - Graceful error states and fallbacks
- **Fully Responsive** - Mobile-first design that works on all devices
- **Accessible** - Semantic HTML and keyboard navigation support

## Tech Stack

### Core Framework

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **CSS Modules** - Component-scoped styling

### Data Fetching

- **Axios** - HTTP client with interceptors
- **Axios Cache Interceptor** - Request caching for improved performance
- **PokeAPI** (via pokenode-ts) - Pokémon data source

### UI/UX

- **Lucide React** - Modern icon library
- **Virtual Scrolling** - Custom implementation for performance

### Code Quality

- **Biome** - Fast linter and formatter
- **ESLint** - Additional code quality checks

## Folder Structure

```
├── app/
│   ├── actions/                       # Server actions
│   │   └── fetch-pokemon.ts           # Pokemon data fetching logic
│   ├── components/                    # React components
│   │   ├── pokemon/                   # Pokemon-specific components
│   │   │   ├── pokemon-card.tsx
│   │   │   └── pokemon-display.tsx
│   │   └── ui/                        # Reusable UI components
│   │       ├── pokeball-logo.tsx
│   │       ├── scroll-to-top.tsx
│   │       ├── search-bar.tsx
│   │       ├── sort-dropdown.tsx
│   │       └── virtualized-grid.tsx
│   ├── pokemon/                       # Dynamic routes
│   │   └── [id]/                      # Individual Pokemon pages
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── types/                         # TypeScript type definitions
│   │   └── pokemon.ts
│   ├── ui/                            # Global UI components
│   │   └── loading-indicator.tsx
│   ├── favicon.ico
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   ├── loading.tsx                    # Global loading state
│   └── page.tsx                       # Home page
├── public/                            # Static assets
├── biome.json                         # Biome configuration
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies and scripts
├── postcss.config.mjs                 # PostCSS configuration
├── tailwind.config.ts                 # Tailwind configuration
└── tsconfig.json                      # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.0+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mhmfajar/frontend-developer-technical-test-labamu.git
   cd frontend-developer-technical-test-labamu
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
```

## Build & Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push your code to GitHub/GitLab
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click (no environment variables needed)

## Key Implementation Details

### Performance Optimizations

- **Server Components** - Default server-side rendering for optimal performance
- **Request Caching** - API responses cached with axios-cache-interceptor
- **Virtual Scrolling** - Only render visible items in the grid
- **Incremental Loading** - Load 50 Pokémon at a time
- **Image Optimization** - Next.js automatic image optimization

### State Management

- **URL as State** - Search and sort parameters stored in URL
- **React Hooks** - useState, useEffect, useMemo for optimal reactivity
- **Server Actions** - Type-safe server-side data fetching

### Error & Loading Handling

- **Suspense Boundaries** - React Suspense for async components
- **Loading States** - Skeleton screens and loading indicators
- **Error Boundaries** - Graceful error handling with fallback UI
- **404 Handling** - Custom error pages for invalid routes

## Code Quality

The project follows best practices:

- **TypeScript** - Full type safety
- **Component Structure** - Organized by feature and reusability
- **Naming Conventions** - Clear, descriptive names
- **Code Formatting** - Consistent style with Biome
- **Separation of Concerns** - UI, logic, and data layers separated
- **Accessibility** - Semantic HTML and ARIA attributes
- **Responsive Design** - Mobile-first approach

## License

This project is created as a technical test submission.

---

**Created by**: Muhammad Fajar  
**Date**: February 2026  
**Test**: Frontend Developer Technical Test - Labamu

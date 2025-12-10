# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoAlquiler Colombia is a Next.js 16 landing page for medical equipment rental (ecógrafos/ultrasound machines). This is a modern React application using TypeScript, styled with CSS Modules, and enhanced with the AOS (Animate On Scroll) library for smooth animations.

## Development Commands

### Core Development
```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build production application
npm start        # Start production server
npm run lint     # Run ESLint for code quality checks
```

### Type Checking
The project uses TypeScript with strict mode enabled. Type errors are shown during development and build time.

## Architecture & Structure

### App Router Architecture (Next.js 16)
- Uses Next.js App Router (`src/app/`) with React Server Components by default
- Root layout defined in `src/app/layout.tsx` with global fonts (Inter, Roboto)
- Main page rendered through `src/app/page.tsx` which orchestrates all sections

### Component Organization
```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with fonts and global providers
│   ├── page.tsx          # Home page composing all sections
│   ├── globals.css       # Global styles and CSS variables
│   └── favicon.ico       # Site favicon
├── components/
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Landing page sections (Hero, Comparison, etc.)
│   └── ui/              # Reusable UI components (AOSInit)
```

### Section-Based Landing Page
The landing page follows a modular section-based architecture:
- **Hero**: Main value proposition and CTA
- **Comparison**: Feature comparison table
- **ProductCatalog**: Equipment showcase
- **Advantages**: Key benefits
- **Testimonials**: Customer testimonials
- **ContactForm**: Lead capture form
- **Footer**: Site navigation and links

### Styling Strategy
- **CSS Modules**: Each component has its own `.module.css` file for scoped styles
- **CSS Variables**: Design tokens defined in `globals.css` for colors, shadows, transitions
- **Medical Tech Theme**: Professional medical industry color palette with blue tones
- **Glassmorphism Effects**: Modern UI with glass-like cards and subtle shadows

### Fonts & Typography
- **Inter**: Primary font for body text
- **Roboto**: Secondary font for headings (weights: 400, 700)
- Both fonts use `display: swap` for performance optimization

### Animation System
- **AOS (Animate On Scroll)**: declarative scroll animations via `data-aos` attributes
- Initialized globally through `AOSInit` component in root layout
- Configured for fade, fade-up, fade-left, and other animation effects

### Third-Party Integrations
- **Unsplash Images**: Medical imagery via direct URLs in Image components
- **WhatsApp Integration**: Direct contact links for lead generation
- **External Links**: Strategic links to pricing, documentation, and contact channels

## Key Development Patterns

### Component Patterns
- Functional components with TypeScript interfaces
- CSS Modules for co-located styling
- Client components marked with `"use client"` directive when needed (e.g., for hooks)
- Props interfaces defined inline or in component files

### State Management
- React hooks (`useState`, `useEffect`) for local component state
- No global state management - landing page is largely stateless
- Scroll-based UI changes (navbar appearance, mobile menu)

### Performance Considerations
- Next.js Image component for optimized image loading
- Font optimization with `next/font/google`
- AOS animations for perceived performance
- CSS containment and GPU-accelerated transforms

### SEO & Metadata
- Metadata configured in root layout for the entire site
- SEO-friendly titles, descriptions, and keywords for medical equipment rental
- Structured content hierarchy with proper heading levels

## Development Guidelines

### When Adding New Sections
1. Create component in `src/components/sections/`
2. Add corresponding `.module.css` file for styles
3. Import and add to `src/app/page.tsx`
4. Use AOS data attributes for scroll animations
5. Follow existing naming conventions (PascalCase for components)

### Styling Guidelines
- Use CSS variables from `globals.css` for consistent theming
- Follow mobile-first responsive design
- Implement glassmorphism effects where appropriate
- Maintain consistent spacing and typography scales

### WhatsApp Integration
Current WhatsApp number is placeholder (`573000000000`). Update with actual contact number for production deployment.
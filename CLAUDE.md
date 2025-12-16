# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Git
git add .            # Stage all changes
git commit -m "message"  # Commit with message
git push origin main # Push to main branch
```

## Project Architecture

This is a Next.js 16 medical equipment rental landing page for EcoAlquiler Colombia, specializing in ultrasound equipment rentals with glass-morphism design system.

### Tech Stack
- **Framework**: Next.js 16 App Router with TypeScript
- **Styling**: CSS Modules with custom CSS variables + Tailwind CSS utilities + shadcn/ui components
- **Animation**: AOS (Animate On Scroll) for section animations + Framer Motion for advanced animations
- **Icons**: Tabler Icons React, Lucide React for professional medical/tech icons
- **Typography**: Inter (primary) and Roboto fonts optimized for Spanish content
- **Utilities**: clsx + tailwind-merge for conditional styling

### Key Architectural Patterns

#### Component Structure
- **Layout Components** (`src/components/layout/`): Navbar, Footer
- **Section Components** (`src/components/sections/`): Individual landing page sections (13 total)
- **UI Components** (`src/components/ui/`): Reusable components including AOSInit, WhatsAppButton, animated components

#### Glass-Morphism Design System
All card components use consistent glass-morphism styling:
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(0, 123, 255, 0.1);
border-radius: 24px;
```

#### Section Organization
Sections follow a consistent pattern:
- Each section has its own component file and CSS module
- Sections use AOS data attributes for scroll animations (`data-aos="fade-up"`)
- All sections are responsive with mobile-first design
- Content is in Spanish targeting Colombian medical professionals
- Standard header structure: overline, h2 with gradient, subtitle

#### Styling System
- **CSS Variables**: Custom medical tech palette defined in `globals.css`
- **Glass-morphism**: Key UI pattern with `glass-card` className
- **Responsive Design**: Standard breakpoints (992px, 768px, 576px)
- **Button Classes**: `.btn-primary`, `.btn-secondary` for consistent CTAs
- **shadcn/ui Integration**: Modern component library with Tailwind CSS variables

#### State Management
- FAQ section uses React useState for accordion functionality
- Footer has form state management for quick contact form
- ProductGalleryModal uses useState for modal visibility
- Testimonials use Framer Motion for animated carousel
- Most components are static/markdown-based for performance

### Content Architecture

The landing page follows AIDA conversion structure with 13 sections:
1. **Hero**: Strong value proposition with urgency elements
2. **Comparison**: Pain vs pleasure positioning
3. **ProductCatalog**: Equipment showcase with pricing (daily rates)
4. **HowItWorks**: Process simplification
5. **AboutUs**: Trust building with metrics and certifications
6. **Advantages**: Value reinforcement with glass-morphism cards
7. **Testimonials**: Social proof with Framer Motion carousel
8. **FAQ**: Two-column accordion layout for space efficiency
9. **AdditionalServices**: Complementary services (calibration, maintenance, sales)
10. **ClinicalApplications**: Medical use cases and scenarios
11. **BookingWizard**: Multi-step equipment booking process
12. **Footer**: Additional conversion point with contact form
13. **Gracias**: Thank you page at `/gracias` route

### Business Logic

#### Pricing Model
- Daily rental rates (not monthly): Z6 ($350k/day), Z60 ($550k/day)
- Nationwide delivery (48h max, same-day in major cities)
- All equipment includes 3 standard probes (convex, linear, transvaginal)
- Maintenance and support included at no extra cost

#### Trust Elements
- INVIMA certification emphasis
- Official Mindray distributor partnership (Equibiomedic)
- 10+ years experience, 500+ equipos, 50+ cities coverage
- 24/7 technical support promise

### Important Notes

#### Image Configuration
- Remote images configured for Unsplash in `next.config.ts`
- Local equipment images in `/public/images/` with subdirectories (z6/, z60/, clinical/)
- All images optimized with Next.js Image component

#### SEO & Performance
- Spanish language targeting Colombian medical professionals
- Schema-ready structure with proper semantic HTML
- Font optimization with display: swap
- Mobile-first responsive design

#### Contact Flow
- Multiple contact points: Footer form, WhatsApp button, section CTAs
- All contact forms use placeholder functionality (actual integration pending)
- Consistent "Habla con un asesor" messaging throughout
- Gracias page provides confirmation with response time promise

#### Component Implementation Details
- **FAQ**: Two-column grid layout, accordion functionality, 12 real questions
- **AdditionalServices**: Glass-morphism cards with service icons and feature lists
- **Advantages**: Icon-based benefit cards with hover animations
- **Gracias**: Success page with clock icon and 24-hour response promise
- **AboutUs**: Stats grid and certifications with glass-morphism styling
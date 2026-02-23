# Technical Architecture

This document outlines the technical design and folder structure of the Climate Space Zimbabwe platform.

## 🏗️ High-Level Design

The application is built using **Next.js 14** with the **App Router**, prioritizing performance, SEO, and developer experience.

### Key Pillars:
1. **Dynamic Content**: Pages are pre-rendered where possible (SSG) and use Client Components for interactivity.
2. **Design System**: A custom design system built with Tailwind CSS, ensuring visual consistency.
3. **AI Integration**: Modular architecture to integrate localized AI models for agriculture.

## 📁 Directory Structure

```text
climate-space-zimbabwe/
├── public/                 # Static assets (logos, icons, 3D assets)
├── src/
│   ├── app/                # App Router (Pages, Layouts, CSS)
│   │   ├── solutions/      # AI Tools & Agri-Search
│   │   ├── creative-space/ # Gallery & Art projects
│   │   └── resources/      # Library & Knowledge hub
│   ├── components/         # UI Components
│   │   ├── ui/             # Atomic components (Buttons, Inputs)
│   │   ├── solutions/      # Logic-heavy feature components
│   │   └── layout/         # Navbar, Footer, Containers
│   └── lib/                # Shared utilities & hooks
├── docs/                   # Markdown documentation
├── tailwind.config.ts      # Design tokens (colors, fonts)
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Design Tokens

Our brand identity is encoded in `tailwind.config.ts`:

- **Primary Green**: `#2D5A27` (Growth & Nature)
- **Accent Cyan**: `#00A8B5` (Intelligence & Tech)
- **Accent Gold**: `#D4AF37` (Resilience & Harvest)
- **Surface**: `#F9F8F6` (Clean & Organic)

## 📡 Data Flow

- **Static Pages**: Fetched at build time for maximum speed.
- **AI Tooling**: Communicates via server-side routes or edge functions to maintain privacy and performance.
- **Asset Management**: Images are optimized using `next/image` to ensure fast loads on mobile networks common in Zimbabwe.

## 🛡️ Best Practices

- **TypeScript**: Used for all logic to prevent runtime errors.
- **Accessibility**: Semantic HTML and ARIA labels for inclusivity.
- **Responsive Design**: Mobile-first approach for accessibility across all devices.

---
For specific feature implementations, refer to the individual Markdown files in `docs/`.

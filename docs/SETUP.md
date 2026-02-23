# Setup & Development Guide

This guide provides instructions for setting up the Climate Space Zimbabwe development environment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or pnpm/yarn)
- **Git**: For version control

## 🛠️ Installation Step-by-Step

1. **Clone the Repo**
   ```bash
   git clone https://github.com/PraiseTechzw/climate-space-zimbabwe-web.git
   cd climate-space-zimbabwe-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory. While the project works with defaults for UI development, you may need keys for specific AI features.
   ```env
   # Example keys (placeholders)
   NEXT_PUBLIC_AI_API_ENDPOINT=
   NEXT_PUBLIC_MAPBOX_TOKEN=
   ```

4. **Launch Dev Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 🧪 Testing & Linting

### Linting
To check for code quality and style issues:
```bash
npm run lint
```

### Build Check
To ensure the project builds correctly for production:
```bash
npm run build
```

## 🚀 Deployment

The project is optimized for **Vercel**. 

1. Push your changes to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and deploy.

## 📁 Common Tasks

- **Adding a new page**: Create a new folder in `src/app` with a `page.tsx` file.
- **Adding a component**: Create a `.tsx` file in `src/components`.
- **Updating styles**: Modify `src/app/globals.css` or use Tailwind classes directly.

---
Need help? Contact the tech lead or open an issue on GitHub.

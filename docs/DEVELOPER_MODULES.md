# System Architecture & Developer Modules

To efficiently build, scale, and maintain **Climate Space Zimbabwe** at world-class production standards, the system has been architected into distinct, decoupled modules. 

This modular approach ensures that as our developer community grows, new contributors can easily onboard and own specific domains without causing merge conflicts or breaking the core systems.

---

## 🧠 Module 1: AI & Core Engine (Assigned to: PraiseTech)
**Status:** CLAIMED 
**Focus:** The "Brain" of Climate Space. This module handles all intelligent processing, decision-making logic, and localized context generation for the Agri-Search platform.

**Core Responsibilities:**
*   **LLM Integration & Routing:** Managing secure API connections to LLM providers (OpenAI/Anthropic) via backend route handlers.
*   **RAG Pipeline Engineering:** Building and querying the Vector Database (e.g., Pinecone/Supabase Vector) filled with Agritex manuals and Zimbabwean context.
*   **Computer Vision Services:** Implementing image recognition pipelines for the Pest Identification tool.
*   **Data Aggregation:** Connecting to live weather APIs (MSD/OpenWeatherMap) to fuse real-time data into AI prompts.
*   **Knowledge Base Curation:** Ensuring the model's responses adhere to our strict ethical guardrails (e.g., no hallucinated weather forecasts).

---

## 🗄️ Module 2: Identity & Access Management (Auth)
**Status:** `[Unassigned]`
**Focus:** Security, user onboarding, and Role-Based Access Control (RBAC).

**Core Responsibilities:**
*   **Authentication:** Integrating NextAuth.js or Clerk for seamless, secure logins (Email, Google, etc.).
*   **Role Management:** Implementing logic to define and enforce permissions for `User` vs. `Full Member` vs. `Admin`.
*   **Session State:** Managing secure sessions across the frontend and protecting API routes.

---

## 🏗️ Module 3: Database & Data Models
**Status:** `[Unassigned]`
**Focus:** The structural foundation of the platform. Building a resilient, scalable database architecture.

**Core Responsibilities:**
*   **Schema Design:** Creating optimized schemas in PostgreSQL (via Prisma or Supabase).
*   **Migrations:** Managing database migrations securely across staging and production environments.
*   **Data Integrity:** Defining relationships for Users, Club Applications, Projects, and Analytics.
*   **API Layer:** Building the internal query layer that other modules will use to fetch and mutate data safely.

---

## 🛡️ Module 4: Admin Dashboard & Internal CRM
**Status:** `[Unassigned]`
**Focus:** The management and operations side of Climate Space. Protecting this area completely from public view.

**Core Responsibilities:**
*   **Management Portal:** Building the `/admin` interface for reviewing and approving "Start a Club" requests.
*   **Communications Hub:** A secure inbox to view and respond to Contact Form submissions.
*   **User Management:** Interface for administrators to ban, upgrade, or manage community members.
*   **Analytics Dashboard:** Displaying high-level metrics on AI usage, user growth, and site traffic.

---

## 📡 Module 5: API Services & Third-Party Integrations
**Status:** `[Unassigned]`
**Focus:** Connecting Climate Space to the outside world, beyond the web app.

**Core Responsibilities:**
*   **Hurudzai WhatsApp Bot:** Setting up webhooks and logic to interact with the Twilio or WhatsApp Business API.
*   **Developer Console:** Architecting the infrastructure to issue API keys to third-party developers.
*   **Email Services:** Integrating Resend or SendGrid to send automated welcome emails and notifications.

---

## 🎨 Module 6: Core Frontend & UI/UX System
**Status:** `[Unassigned]`
**Focus:** The visual identity and interactive experience. Ensuring the app looks and feels premium on all devices.

**Core Responsibilities:**
*   **Design System:** Maintaining `tailwind.config.ts`, typography, and core spacing rules.
*   **Component Library:** Building reusable, accessible Radix UI components (Buttons, Modals, Forms) for other developers to use.
*   **Performance:** Auditing bundle sizes, optimizing images with Next/Image, and ensuring 60fps animations.
*   **Responsive Design:** Testing and perfecting layouts natively across mobile, tablet, and desktop viewports.

---

## ✍️ Module 7: Content Management & Public Pages (CMS)
**Status:** `[Unassigned]`
**Focus:** Bringing the platform to life with dynamic stories, resources, and art.

**Core Responsibilities:**
*   **Dynamic Pages:** Replacing all hardcoded placeholders on `/projects`, `/resources`, and `/news` with data fetched from the database or a Headless CMS (like Sanity/Contentful).
*   **Creative Space:** Building the multimedia gallery to showcase environmental art and narratives.
*   **File Hosting:** Integrating AWS S3 or Supabase Storage for secure PDF downloads in the Climate Library.

---

## ⚙️ Module 8: DevOps & Infrastructure
**Status:** `[Unassigned]`
**Focus:** Deployment, reliability, and world-class developer experience.

**Core Responsibilities:**
*   **CI/CD Pipeline:** Setting up GitHub Actions for automated testing and linting before merges.
*   **Hosting:** Managing the Vercel production and preview deployment environments.
*   **Observability:** Integrating Sentry for error tracking and logging in production.
*   **SEO Automation:** Ensuring dynamic OpenGraph image generation and flawless `generateMetadata` implementation across all routes.
*   **Environment Variables:** Managing `.env` secrets across local and production environments.

---

### 📋 How to Contribute
1. Review the open modules above.
2. Add your name to the `[Unassigned]` slot of the module you wish to own.
3. Coordinate with the team on Slack/Discord to align on API contracts before building.
4. **All PRs must be reviewed** by at least one developer from a different module before merging into `main`.

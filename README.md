# Campfire - Verified Ownership Network

Campfire is a verified word-of-mouth network where people learn about products directly from individuals who actually own and use them.

---

## 🛠️ The Tech Stack (100% Credit-Card-Free, $0 Budget)

| Layer | Technology | Provider & Free Tier Limits |
| :--- | :--- | :--- |
| **Workspace** | Turborepo (pnpm) | Local tooling |
| **Frontend & API** | Next.js (App Router) | **Vercel**: 100 GB bandwidth / month |
| **Primary Database** | PostgreSQL | **Neon**: 0.5 GiB storage, auto-suspend compute |
| **Authentication** | Clerk | **Clerk**: 50,000 Monthly Active Users |
| **File Storage** | UploadThing | **UploadThing**: 2 GB storage, unlimited transfers |
| **Search Engine** | Postgres Full-Text Search (GIN) | **Neon Postgres**: Native indexing |
| **AI Summaries** | Gemini 1.5 Flash | **Google AI Studio**: 1,500 requests/day, 15 RPM |
| **Email Service** | Resend | **Resend**: 3,000 emails/month (100/day) |
| **Analytics** | PostHog | **PostHog**: 1,000,000 events/month |

---

## 📂 Repository Directory Layout

We use a Monorepo structure managed by **Turborepo** and **pnpm** to allow sharing of TypeScript types, Zod validation schemas, and configurations between the web application and the future mobile app.

```
campfire-monorepo/
├── apps/
│   ├── web/                  # Next.js web application (Web UI + API Routes)
│   └── mobile/               # Future React Native / Expo App
├── packages/
│   ├── types/                # Shared TypeScript models and interfaces
│   └── validation/           # Shared Zod validation schemas
├── package.json
└── pnpm-workspace.yaml
```

---

## 🌐 Browser Services to Sign Up For (All Card-Free)

1. **[Neon Database](https://neon.tech)**: Create a free account and spin up a Serverless Postgres database.
2. **[Clerk Auth](https://clerk.com)**: Create a free account and set up a new application.
3. **[UploadThing](https://uploadthing.com)**: Create a free account and create a new project.
4. **[Google AI Studio](https://aistudio.google.com)**: Get a free API key for the Gemini API.
5. **[Resend](https://resend.com)**: Create a free account for sending transactional emails.
6. **[PostHog](https://posthog.com)**: Create a free account for analytics and session recording.
7. **[Vercel](https://vercel.com)**: Create a free Hobby account to host the Next.js app and API endpoints.

---

## 🔑 Environment Variables Needed (`.env.local`)

These keys and tokens must be generated from your accounts and configured in your environment for the application to run:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Neon Postgres Database URL
DATABASE_URL=postgres://user:password@host/dbname?sslmode=require

# UploadThing API Keys
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key

# Resend Email API Key
RESEND_API_KEY=your_resend_api_key

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_client_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## 📦 Required Dependencies

Run these commands inside the Next.js project folder to install the required packages:

### Core Next.js & UI
```bash
pnpm add @clerk/nextjs uploadthing @uploadthing/react @google/generative-ai resend posthog-js zod lucide-react
```

### Database & ORM
```bash
pnpm add drizzle-orm @neondatabase/serverless
pnpm add -D drizzle-kit
```

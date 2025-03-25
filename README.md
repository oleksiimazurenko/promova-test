# 🧠 Promova Test Task – FE Middle Developer

> A frontend project designed as a technical test for Promova. This project represents a dynamic, multi-step quiz with conditional logic, analytics tracking, CMS integration, and delightful UX touches.

---

## 📦 Tech Stack

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS + class-variance-authority**
- **Zustand** – global state management
- **Strapi (Self-hosted)** – headless CMS
- **PostHog** – analytics tracking
- **Sentry** – error monitoring
- **Radix UI** – primitives like checkbox, progress
- **@next/third-parties** – third-party script integration
- **CryptoJS** – localStorage encryption

---

## 🛠️ Getting Started

### 1. 📥 Install Dependencies

```bash
npm install
```

### 2. ▶️ Run Development Server

```bash
npm run dev
```

### 3. 🔨 Build for Production

```bash
npm run build && npm run start
```

---

## 🌐 Environment Variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_APP_URL=your_public_url

NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-url.com
STRAPI_API_TOKEN=your_strapi_token

SENTRY_AUTH_TOKEN=your_sentry_token

NEXT_PUBLIC_ZUSTAND_PERSIST_SECRET=need_just_generate_some_token

NEXT_PUBLIC_POSTHOG_KEY=your_posthog_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_DATASET_ID=XXXXXXXXX

OPENAI_API_KEY=your_openai_token
```

---

## 📋 Features

- ✅ Multi-step quiz powered by Strapi
- 🔁 Conditional logic per step depending on previous answers or `source`
- 💾 Encrypted localStorage with Zustand
- 🧠 Source-aware quiz logic via middleware
- 📊 PostHog integration: `step_viewed`, `quiz_completed`
- 🧨 Global error boundaries with Sentry
- ⚡ ISR with revalidate logic (Next.js caching)
- 💡 Suspense fallback

---

## 🧪 Analytics Setup

### PostHog

- Used for tracking quiz step views and completion
- Captured events:
  - `step_viewed`
  - `quiz_completed`

### Third-Party Scripts via `@next/third-parties`

- **Google Tag Manager**
- **Google Analytics**
- **Meta Dataset (Facebook Pixel)**

---

## 🧩 Folder Structure (Simplified)

```
/entities      → quiz components (Card, CheckboxStep)
/shared        → UI, lib, utils
/app/quiz	     → quiz pages, ISR logic
/store         → Zustand quiz logic with encryption
/actions       → server actions fetching CMS data
```

---

## 👨‍💻 Author

**Олексій Мазуренко**  
Developer  

---

## 📎 Notes

- This app uses **Incremental Static Regeneration (ISR)** via `revalidate`.
- Each step in the quiz is editable from the Strapi admin panel.
- Quiz is resilient: users can resume from where they left off.
- Direct access to quiz steps is protected:
  -- Users cannot jump to a specific step via URL unless they’ve completed the previous steps.
  -- If a user comes from an external source (e.g. ?source=facebook), they start from a specific step, and cannot go back unless they explicitly choose to go through the full personalization flow.

---

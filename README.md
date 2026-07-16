# CareerCompass AI — Frontend

The student-facing web application for CareerCompass AI. Built with React, TypeScript, and Tailwind CSS.

**Live site:** https://careercompass-frontend-seven.vercel.app

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router
- **HTTP client:** Axios (with automatic access-token refresh on expiry)
- **Fonts:** Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (data/technical)

## Design System

The visual identity follows a "wayfinding" concept — navigation instruments and topographic charts — reflecting the product's core idea of plotting a student's profile and finding a bearing toward a career. The RIASEC hexagonal radar chart is the signature visual element, used both decoratively (landing page) and functionally (results page).

**Palette:** Chart Navy (ink), Chart Paper (background), Compass Gold (primary actions), Trail Teal (secondary accents), Signal Rust (errors only).

## Getting Started Locally

### Prerequisites
- Node.js 20+
- The backend API running (locally or deployed) — see the [backend README](https://github.com/graceniyik/careercompass-backend)

### Setup

```bash
git clone https://github.com/graceniyik/careercompass-frontend.git
cd careercompass-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

(Point this at your deployed backend URL if not running the backend locally.)

### Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Key Features

- **Assessment flow:** structured RIASEC (Likert-scale) questions plus open-ended qualitative prompts
- **Results dashboard:** functional RIASEC radar chart, ranked career recommendations with match scores, skill-gap indicators
- **AI-generated explanations:** personalized, natural-language reasoning for each recommendation, with a live-updating "generating" state (polling) while the AI processes in the background
- **Ask about this match:** a bounded follow-up Q&A feature letting students ask clarifying questions about a specific recommendation
- **Career comparison:** overlay up to 3 recommended careers on a single radar chart with a side-by-side skill breakdown
- **Role-based routing:** separate flows for Students, Counselors, and Admins, each protected by role-aware route guards

## Deployment

Deployed on [Vercel](https://vercel.com). Build settings are auto-detected (Vite defaults). Requires the `VITE_API_BASE_URL` environment variable to be set to the deployed backend's URL.

## Authentication Handling

Access tokens (15-minute lifespan) are stored in `sessionStorage` and automatically refreshed via the refresh token when expired, using an Axios response interceptor. If the refresh token itself is invalid or expired, the user is redirected to the login page.

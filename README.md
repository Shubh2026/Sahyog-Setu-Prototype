# SahyogSetu Prototype

SahyogSetu is a Next.js prototype for connecting customers with trusted local service workers through labour cooperatives. It includes customer booking, worker job management, fair-wage views, and a cooperative administrator console.

## What is included

- Customer service discovery, worker profiles, booking, tracking, payment, and reviews
- Worker onboarding, job requests, earnings, skills, welfare, and cooperative profile views
- Admin dashboard with worker verification, bookings, payments, analytics, and settings views
- English and Hindi-ready interface translations
- Responsive UI with demo data and browser-persisted state

This is a demonstration prototype. Authentication, OTP delivery, payments, identity verification, and cooperative records are mocked. No real government, financial, SMS, or identity systems are connected.

## Tech stack

- Next.js 16 with App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Drizzle ORM with PostgreSQL configuration
- Recharts for dashboard visualizations
- Lucide React for icons

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Available scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run lint       # Run ESLint
npm run typecheck  # Run the TypeScript compiler without emitting files
```

## Demo access

The main login is available at `/login`.

| Role | Mobile | OTP |
| --- | --- | --- |
| Customer | `9876543210` | `123456` |
| Worker | `9876543211` | `123456` |

The cooperative administrator console is available at `/admin/login`.

| Field | Demo value |
| --- | --- |
| Email | `admin@sahyogsetu.demo` |
| Password | `coop2026` |

You can also enter a new mobile number to walk through the customer or worker registration flow.

## Main routes

- `/login` - Customer and worker sign in
- `/customer` - Customer dashboard
- `/customer/services` - Browse services
- `/customer/bookings` - Customer bookings
- `/worker` - Worker dashboard
- `/worker/jobs` - Worker job requests and jobs
- `/worker/earnings` - Worker earnings
- `/admin/login` - Cooperative administrator sign in
- `/admin/dashboard` - Administrator dashboard
- `/admin/verification` - Worker verification
- `/admin/analytics` - Cooperative analytics

## Data and persistence

The demo context in `src/lib/demo-context.tsx` seeds the application with fictional records and persists changes in browser `localStorage` under `sahyogsetu-demo-v1`. Use the reset option in the application to restore the demo state.

The repository includes Drizzle and PostgreSQL configuration for future database work. The current prototype flows use seeded client-side demo state rather than a live database.

## Project structure

```text
src/
  app/         App Router pages and API routes
  components/  Shared UI, navigation, cards, charts, and auth components
  db/          Drizzle schema and database entry point
  lib/         Demo state, seed data, translations, and utilities
public/        Brand assets and avatars
```

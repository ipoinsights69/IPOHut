# ISR Implementation Guide

## Overview
This Next.js application uses **Incremental Static Regeneration (ISR)** to serve pre-rendered pages with automatic revalidation. All IPO data is fetched at build time and cached, with periodic updates every 4 hours.

## Key Features

### 1. Build-Time Data Fetching
- All pages fetch data during build using `getIPOData()` and `getIPOById()`
- No client-side or server-side rendering for data fetching
- Pages are statically generated for optimal performance

### 2. Automatic Revalidation
- **Revalidation Period**: 4 hours (14,400 seconds)
- Next.js automatically regenerates pages in the background
- Users always see cached content with periodic updates

### 3. On-Demand Revalidation
- **Endpoint**: `/api/revalidate`
- **Method**: POST
- **Authentication**: Token-based via query parameter

## API Endpoints

### Revalidation Endpoint

**URL**: `POST /api/revalidate?token=YOUR_SECRET_TOKEN`

**Purpose**: Trigger immediate revalidation when new IPO data is added

**Setup**:
1. Add `REVALIDATION_TOKEN` to your `.env.local`:
   ```
   REVALIDATION_TOKEN=your-secret-token-here
   ```

2. Call from your backend when data changes:
   ```bash
   curl -X POST "https://your-domain.com/api/revalidate?token=your-secret-token-here"
   ```

**Response**:
```json
{
  "revalidated": true,
  "now": 1701234567890
}
```

## File Structure

```
src/
├── lib/
│   └── api.ts              # Data fetching utilities
├── app/
│   ├── page.tsx            # Home page (ISR enabled)
│   ├── open/page.tsx       # Open IPOs (ISR enabled)
│   ├── listed/page.tsx     # Listed IPOs (ISR enabled)
│   ├── upcoming/page.tsx   # Upcoming IPOs (ISR enabled)
│   ├── gmp/page.tsx        # GMP Landing (ISR enabled)
│   ├── gmp-tracker/page.tsx # GMP Tracker (ISR enabled)
│   ├── calendar/page.tsx   # Calendar (ISR enabled)
│   ├── sectors/page.tsx    # Sectors (ISR enabled)
│   ├── compare/page.tsx    # Compare (ISR enabled)
│   ├── ipo/[id]/
│   │   ├── page.tsx        # IPO Details (ISR enabled)
│   │   └── allotment/page.tsx # Allotment Checker (ISR enabled)
│   └── api/
│       └── revalidate/
│           └── route.ts    # On-demand revalidation endpoint
└── views/
    └── *.tsx               # Client components (accept data as props)
```

## How It Works

### Page Components (Server Components)
```typescript
// src/app/page.tsx
import { getIPOData } from "@/lib/api";

export const revalidate = 14400; // 4 hours

export default async function HomePage() {
  const ipoData = await getIPOData();
  return <Home ipoData={ipoData} />;
}
```

### View Components (Client Components)
```typescript
// src/views/Home.tsx
"use client";

interface HomeProps {
  ipoData: IPOData[];
}

const Home = ({ ipoData }: HomeProps) => {
  // Component logic
};
```

### Dynamic Routes with Static Params
```typescript
// src/app/ipo/[id]/page.tsx
export async function generateStaticParams() {
  const ipoData = await getIPOData();
  return ipoData.map((ipo) => ({
    id: ipo.id,
  }));
}

export default async function IPODetailsPage({ params }: { params: { id: string } }) {
  const ipo = await getIPOById(params.id);
  return <IPODetails ipo={ipo} />;
}
```

## Deployment

### Environment Variables
Create a `.env.local` file:
```
REVALIDATION_TOKEN=your-secret-token-here
```

### Build Command
```bash
npm run build
```

This will:
1. Fetch all IPO data
2. Generate static pages for all routes
3. Create optimized bundles

### Vercel Deployment
The ISR configuration works automatically on Vercel. No additional setup required.

## Backend Integration

When your backend adds new IPO data:

```javascript
// Example: Node.js backend
const revalidateNextJS = async () => {
  const response = await fetch(
    `https://your-nextjs-app.com/api/revalidate?token=${process.env.REVALIDATION_TOKEN}`,
    { method: 'POST' }
  );
  return response.json();
};

// Call after adding new IPO
await addNewIPO(ipoData);
await revalidateNextJS();
```

## Benefits

1. **Performance**: Pages load instantly from cache
2. **SEO**: Fully pre-rendered HTML for search engines
3. **Scalability**: No database queries on each request
4. **Freshness**: Automatic updates every 4 hours + on-demand revalidation
5. **Cost-Effective**: Minimal server resources required

## Future Enhancements

When you're ready to connect to a real API:

1. Update `src/lib/api.ts`:
   ```typescript
   export async function getIPOData(): Promise<IPOData[]> {
     const response = await fetch('https://your-api.com/ipos');
     return response.json();
   }
   ```

2. The ISR configuration will automatically work with the new API
3. No changes needed to page components

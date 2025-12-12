# TokyoIA Web Application

Next.js web application for the TokyoIA platform.

## Features

- Modern React with Next.js 14
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design
- API integration with backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Project Structure

```
web/
├── pages/              # Next.js pages
│   ├── index.tsx      # Home page
│   └── layout.tsx     # Root layout
├── components/        # React components
│   ├── Button.tsx     # Button component
│   └── Header.tsx     # Header component
├── public/           # Static assets
├── package.json      # Dependencies
└── README.md        # This file
```

## Technologies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React Query** - Data fetching
- **Axios** - HTTP client

## Development

The web application connects to the backend API running on port 8000. Make sure the backend is running before starting development.

## Deployment

See main project README for deployment instructions.

# TokyoIA Repository Structure

This document provides a complete overview of the directory structure and organization of the TokyoIA project.

## Directory Tree

```
.
├── .devcontainer/          # Development container configuration
│   ├── devcontainer.json   # Dev container settings
│   ├── Dockerfile          # Container image definition
│   └── post-create.sh      # Post-creation setup script
│
├── .github/                # GitHub configuration and workflows
│   ├── workflows/          # CI/CD workflow definitions
│   │   ├── ci.yml          # Main CI pipeline
│   │   ├── codespace-setup.yml  # Codespaces configuration
│   │   ├── lint.yml        # Linting checks
│   │   ├── release.yml     # Release automation
│   │   └── security.yml    # Security scanning
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   ├── ISSUE_TEMPLATE.md   # Issue template
│   └── PULL_REQUEST_TEMPLATE.md  # PR template
│
├── android/                # Android mobile application
│   ├── app/                # Android app module
│   │   └── build.gradle    # App-level build configuration
│   ├── build.gradle        # Project-level build configuration
│   └── README.md           # Android-specific documentation
│
├── backend/                # Python backend server
│   ├── app/                # Application source code
│   │   ├── auth/           # Authentication module
│   │   │   └── __init__.py # Auth endpoints and logic
│   │   ├── casino/         # Casino gaming module
│   │   │   └── __init__.py # Game endpoints and logic
│   │   ├── ml/             # Machine learning module
│   │   │   └── __init__.py # ML prediction endpoints
│   │   ├── payments/       # Payment processing module
│   │   │   └── __init__.py # Payment endpoints and logic
│   │   └── main.py         # FastAPI application entry point
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend-specific documentation
│
├── web/                    # Next.js web application
│   ├── app/                # Next.js app directory
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page component
│   ├── components/         # Reusable React components
│   │   ├── Button.tsx      # Button component
│   │   └── Header.tsx      # Header component
│   ├── config/             # Application configuration
│   │   ├── pricing.ts      # Pricing tier definitions
│   │   └── site.config.ts  # Site-wide configuration
│   ├── lib/                # Utility libraries
│   │   ├── auth/           # Authentication utilities
│   │   │   ├── middleware.ts  # Auth middleware functions
│   │   │   └── utils.ts    # Auth helper functions
│   │   ├── stripe/         # Stripe payment integration
│   │   │   ├── client.ts   # Client-side Stripe functions
│   │   │   └── server.ts   # Server-side Stripe functions
│   │   ├── supabase/       # Supabase database integration
│   │   │   ├── client.ts   # Client-side Supabase client
│   │   │   ├── server.ts   # Server-side Supabase client
│   │   │   └── queries.ts  # Database query functions
│   │   └── utils.ts        # General utility functions
│   ├── types/              # TypeScript type definitions
│   │   ├── database.ts     # Database schema types
│   │   ├── index.ts        # Main type exports
│   │   └── stripe.ts       # Stripe-related types
│   ├── .env.example        # Environment variables template
│   ├── .eslintrc.json      # ESLint configuration
│   ├── next.config.js      # Next.js configuration
│   ├── package.json        # Node.js dependencies and scripts
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── vercel.json         # Vercel deployment configuration
│   └── README.md           # Web-specific documentation
│
├── .gitignore              # Git ignore patterns
├── LICENSE                 # Project license
├── README.md               # Main project documentation
├── ARCHITECTURE.md         # System architecture documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── DEPLOYMENT.md           # Deployment instructions
├── DOCUMENTATION.md        # Detailed file documentation
└── STRUCTURE.md            # This file
```

## Component Organization

### Backend (`/backend`)

**Purpose**: Python FastAPI backend server providing REST APIs for authentication, payments, casino gaming, and machine learning features.

**Key Directories**:
- `app/auth/`: User authentication and authorization
- `app/payments/`: Payment processing and transaction management
- `app/casino/`: Casino game logic and session management
- `app/ml/`: Machine learning models and prediction endpoints

### Web (`/web`)

**Purpose**: Next.js 14+ web application with App Router, providing the user interface for the platform.

**Key Directories**:
- `app/`: Next.js pages and layouts using App Router
- `components/`: Reusable React components
- `lib/`: Third-party integrations and utilities
- `types/`: TypeScript type definitions
- `config/`: Application configuration files

### Android (`/android`)

**Purpose**: Native Android mobile application for the platform.

**Key Directories**:
- `app/`: Android app module with Kotlin source code

### Development Tools (`/.devcontainer`, `/.github`)

**Purpose**: Development environment setup and CI/CD automation.

**Key Directories**:
- `.devcontainer/`: Docker-based development environment
- `.github/workflows/`: GitHub Actions for CI/CD

## Folder Purposes

| Directory | Technology | Purpose |
|-----------|------------|---------|
| `/backend` | Python/FastAPI | REST API server for business logic |
| `/web` | TypeScript/Next.js | Web frontend application |
| `/android` | Kotlin/Gradle | Android mobile application |
| `/.devcontainer` | Docker | Containerized development environment |
| `/.github` | GitHub Actions | CI/CD and repository automation |

## Module Responsibilities

### Backend Modules

1. **auth**: User registration, login, logout, and session management
2. **payments**: Deposits, withdrawals, balance inquiries, and transaction history
3. **casino**: Game sessions, available games list, and leaderboard
4. **ml**: Machine learning predictions and model management

### Web Modules

1. **auth**: Authentication middleware and utilities
2. **stripe**: Payment processing integration
3. **supabase**: Database client and query functions
4. **components**: UI building blocks
5. **config**: Application settings and constants

## Navigation

- [Main Documentation](README.md)
- [Architecture](ARCHITECTURE.md)
- [Detailed Documentation](DOCUMENTATION.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT.md)

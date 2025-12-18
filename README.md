# TokyoIA

**AI-Powered Premium Platform with Casino, Payments, and Machine Learning**

[![CI Status](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/workflows/CI/badge.svg)](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/actions)
[![License](https://img.shields.io/badge/license-See%20LICENSE-blue.svg)](LICENSE)

TokyoIA is a comprehensive multi-platform application featuring backend APIs, web interface, and Android mobile app. The platform combines authentication, payment processing, casino gaming, and machine learning capabilities.

## 🌟 Key Features

- **Multi-Platform Support**: Backend API, Web App, and Android Mobile App
- **Authentication System**: Secure user registration and login
- **Payment Processing**: Integrated with Stripe for deposits and withdrawals
- **Casino Gaming**: Multiple game types (slots, poker, blackjack, roulette)
- **Machine Learning**: AI predictions and recommendations
- **Subscription Tiers**: Free, Premium, and Elite membership levels
- **Real-time Operations**: FastAPI async backend with WebSocket support (planned)
- **Modern Web Stack**: Next.js 14+ with App Router and TypeScript
- **Secure & Scalable**: Built with security best practices and horizontal scaling in mind

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Building & Testing](#building--testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Technology Stack

### Backend
- **Language**: Python 3.11+
- **Framework**: FastAPI 0.109+
- **Server**: Uvicorn (ASGI)
- **Database**: PostgreSQL via Supabase
- **ML Libraries**: PyTorch, scikit-learn, transformers
- **Data Validation**: Pydantic

### Web Frontend
- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript 5.3+
- **UI Library**: React 18.2+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js + Supabase Auth
- **Payments**: Stripe SDK

### Android
- **Language**: Kotlin
- **Build System**: Gradle
- **Architecture**: MVVM (expected)
- **Dependency Injection**: Hilt/Dagger (expected)

### Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Web Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Development**: Docker Dev Containers

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.11+, pip
- **Web**: Node.js 16+, npm or yarn
- **Android**: Java 17+, Android SDK (optional)
- **Optional**: Docker for containerized development

### 1. Clone the Repository

```bash
git clone https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2.git
cd bug-free-octo-winner-Tokyo-IA2
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
cd app
python main.py
# Or with uvicorn:
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at http://localhost:8000

API Documentation: http://localhost:8000/docs

### 3. Web Setup

```bash
cd web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Web app will be available at http://localhost:3000

### 4. Android Setup

```bash
cd android

# Build debug APK
./gradlew assembleDebug

# Or open in Android Studio
# File → Open → Select android/ directory
```

## 📁 Project Structure

```
.
├── backend/              # Python FastAPI backend
│   ├── app/             # Application code
│   │   ├── auth/        # Authentication module
│   │   ├── payments/    # Payment processing
│   │   ├── casino/      # Gaming logic
│   │   ├── ml/          # Machine learning
│   │   └── main.py      # FastAPI app entry point
│   └── requirements.txt # Python dependencies
│
├── web/                 # Next.js web application
│   ├── app/            # Next.js pages (App Router)
│   ├── components/     # React components
│   ├── lib/            # Utilities and integrations
│   │   ├── auth/       # Authentication helpers
│   │   ├── stripe/     # Stripe integration
│   │   └── supabase/   # Database client
│   ├── types/          # TypeScript definitions
│   └── config/         # Configuration files
│
├── android/            # Android mobile app
│   └── app/           # Android app module
│
├── .github/           # GitHub workflows and templates
│   └── workflows/     # CI/CD pipelines
│
└── .devcontainer/     # Development container config
```

For detailed structure documentation, see [STRUCTURE.md](STRUCTURE.md).

## 💻 Development Setup

### Using Dev Container (Recommended)

The repository includes a complete dev container configuration:

```bash
# Open in GitHub Codespaces
# OR
# Open in VS Code with Remote - Containers extension
# Command Palette → "Remote-Containers: Reopen in Container"
```

### Manual Setup

#### Backend Development

```bash
cd backend

# Activate virtual environment
source venv/bin/activate

# Install development dependencies
pip install pytest pytest-cov black flake8 mypy

# Run tests
pytest

# Format code
black app/

# Lint
flake8 app/
```

#### Web Development

```bash
cd web

# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linter
npm run lint

# Build for production
npm run build
```

#### Android Development

```bash
cd android

# Run tests
./gradlew test

# Build debug
./gradlew assembleDebug

# Build release
./gradlew assembleRelease
```

## 🧪 Building & Testing

### Backend

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific module tests
pytest app/auth/

# Lint code
flake8 app/
mypy app/
```

### Web

```bash
cd web

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint --fix  # Auto-fix issues

# Build
npm run build

# Start production server
npm start
```

### Android

```bash
cd android

# Run unit tests
./gradlew test

# Run instrumented tests
./gradlew connectedAndroidTest

# Build debug APK
./gradlew assembleDebug

# Build release AAB
./gradlew bundleRelease
```

### CI/CD

All tests run automatically on push/PR via GitHub Actions:
- Backend: Python tests with pytest
- Web: TypeScript type checking, ESLint, build verification
- Android: Gradle build

See workflows in `.github/workflows/`:
- `ci.yml` - Main CI pipeline
- `lint.yml` - Code quality checks
- `security.yml` - Security scanning

## 🚀 Deployment

### Quick Deployment Overview

- **Backend**: Deploy to AWS, GCP, Azure, or any cloud provider supporting Python/Docker
- **Web**: Optimized for Vercel deployment (automatic with git push)
- **Android**: Build AAB and upload to Google Play Console

For comprehensive deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Environment Variables

Required environment variables for each component:

**Backend** (`.env`):
```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
STRIPE_SECRET_KEY=sk_...
ALLOWED_ORIGINS=https://yourdomain.com
```

**Web** (`.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
NEXTAUTH_SECRET=...
```

See `.env.example` files in each directory for complete lists.

## 📚 Documentation

Comprehensive documentation is available:

- **[README.md](README.md)** (this file) - Project overview and quick start
- **[STRUCTURE.md](STRUCTURE.md)** - Complete directory structure and organization
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Detailed file-by-file documentation with examples
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture and design decisions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines and code standards
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions for all platforms

### API Documentation

The backend provides auto-generated interactive API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- OpenAPI Spec: http://localhost:8000/openapi.json

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our code standards (see [CONTRIBUTING.md](CONTRIBUTING.md))
4. Write tests for your changes
5. Ensure all tests pass
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

### Code Standards

- **Python**: PEP 8, type hints, pytest for tests
- **TypeScript**: ESLint, Prettier, functional components
- **Kotlin**: Android best practices, MVVM architecture
- **Git**: Conventional commits format

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the terms in the [LICENSE](LICENSE) file.

## 🔗 Links

- **Repository**: https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2
- **Issues**: https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues
- **Pull Requests**: https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/pulls

## 📞 Support

For questions or support:
- Open an [issue](https://github.com/Melampe001/bug-free-octo-winner-Tokyo-IA2/issues)
- Submit a pull request
- Contact the maintainers

---

**Built with ❤️ by the TokyoIA Team**

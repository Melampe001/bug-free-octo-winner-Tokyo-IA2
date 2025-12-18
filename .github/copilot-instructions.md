# TokyoIA - GitHub Copilot Instructions

## Project Overview
TokyoIA is a multi-component platform consisting of:
- **Backend**: Python FastAPI server with AI/ML capabilities, authentication, casino features, and payment processing
- **Web**: Next.js 14 TypeScript application with Supabase, Stripe integration, and TanStack Query
- **Android**: Kotlin-based mobile application

Target users: Premium subscription platform with AI-powered casino and payment features.

## Repository Structure
```
bug-free-octo-winner-Tokyo-IA2/
├── backend/app/          # FastAPI backend (Python 3.8+)
│   ├── main.py          # Main FastAPI application entry
│   ├── auth/            # Authentication logic
│   ├── casino/          # Casino features
│   ├── ml/              # Machine learning models
│   └── payments/        # Payment processing
├── web/                 # Next.js frontend (Node 16+)
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── lib/            # Utilities and configurations
│   └── config/         # Configuration files
├── android/            # Android application (Kotlin)
│   └── app/           # Android app module
└── .github/           # GitHub workflows and templates
```

## Tech Stack

### Backend (Python)
- **Framework**: FastAPI 0.109.0+, Uvicorn
- **Validation**: Pydantic 2.5.3+, pydantic-settings
- **Security**: python-jose, passlib with bcrypt
- **Database**: SQLAlchemy 2.0.25+, Alembic
- **ML/AI**: NumPy, Pandas, scikit-learn, PyTorch 2.2.0+, Transformers 4.36.0+
- **HTTP**: httpx, aiohttp
- **Environment**: python-dotenv

### Web (TypeScript/JavaScript)
- **Framework**: Next.js 14.2.0+ with App Router
- **UI Library**: React 18.2.0+
- **Styling**: TailwindCSS 3.4.0+, clsx
- **Authentication**: NextAuth 4.24.5+, Supabase SSR
- **Payments**: Stripe 14.14.0+, @stripe/stripe-js
- **Data Fetching**: TanStack Query 5.17.9+, axios
- **Validation**: Zod 3.22.4+
- **Icons**: lucide-react
- **Themes**: next-themes
- **Utilities**: date-fns

### Android
- **Language**: Kotlin 1.9.20+
- **Build**: Android Gradle Plugin 8.2.0+

## Coding Standards

### Python (Backend)
- Follow PEP 8 style guidelines
- Use type hints for all function parameters and return values
- Prefer async/await for I/O-bound operations (FastAPI endpoints, database queries)
- Use Pydantic models for request/response validation
- Structure code with clear separation of concerns:
  - Routes/endpoints in main modules
  - Business logic in service layers
  - Data models in dedicated model files
- Use environment variables for configuration (via pydantic-settings)
- Document all public APIs with docstrings
- Handle errors gracefully with proper HTTP status codes
- Use dependency injection for shared resources (database sessions, settings)

### TypeScript/JavaScript (Web)
- Use TypeScript for all new code
- Follow ESLint configuration defined in `.eslintrc.json`
- Use functional components with React Hooks
- Prefer named exports over default exports for components
- Use TanStack Query for server state management
- Use Zod for runtime validation
- Follow Next.js App Router conventions:
  - Server Components by default
  - Client Components only when needed (mark with 'use client')
  - Use server actions for mutations when appropriate
- Structure components:
  - Keep components small and focused
  - Extract reusable logic into custom hooks
  - Place shared components in `/components`
  - Use Tailwind utility classes for styling
- Use clsx for conditional className logic
- Follow TypeScript strict mode conventions

### Kotlin (Android)
- Follow Kotlin coding conventions
- Use modern Android development practices
- Structure code following MVVM or similar architecture patterns

## Component-Specific Guidelines

### Backend API Development
- All endpoints should be async
- Use FastAPI dependency injection for database sessions
- Implement proper CORS configuration (defined in environment variables)
- Return consistent JSON response structures
- Include proper HTTP status codes (200, 201, 400, 401, 403, 404, 500, etc.)
- Validate all inputs using Pydantic models
- Log errors with appropriate context
- Use SQLAlchemy ORM for database operations
- Apply database migrations using Alembic

### Frontend Development
- Use Server Components for data fetching when possible
- Mark Client Components explicitly with 'use client'
- Implement proper loading and error states
- Use TanStack Query for client-side data fetching
- Implement proper form validation with Zod
- Use Supabase client for authentication flows
- Integrate Stripe for payment processing
- Implement responsive design using Tailwind breakpoints
- Use next-themes for dark mode support
- Handle authentication state properly with NextAuth

### Android Development
- Follow Material Design guidelines
- Implement proper lifecycle management
- Use Kotlin coroutines for asynchronous operations
- Follow Android architecture components best practices

## Security Best Practices
- **Never** commit secrets, API keys, or credentials to the repository
- Use environment variables for sensitive configuration
- Validate and sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization checks
- Use HTTPS for all external communications
- Follow OWASP security guidelines
- Hash passwords using bcrypt (via passlib)
- Use secure token generation (python-jose for JWT)
- Implement rate limiting for API endpoints
- Sanitize user-generated content before display

## Testing Guidelines
- Write tests for critical business logic
- Use pytest for Python backend tests
- Mock external dependencies in unit tests
- Test API endpoints with proper authentication
- Validate edge cases and error conditions
- Run tests locally before committing: `npm test` (web), `pytest` (backend)
- Ensure all tests pass in CI workflows

## Error Handling
- Use structured error responses with consistent format
- Include meaningful error messages for debugging
- Log errors with timestamp and context
- Return appropriate HTTP status codes
- Provide user-friendly error messages in frontend
- Implement proper error boundaries in React components
- Use try-catch blocks for async operations

## Documentation
- Document all public APIs and complex functions
- Use Python docstrings for backend functions
- Use JSDoc comments for complex TypeScript functions
- Keep README files updated in each subdirectory
- Document environment variables in `.env.example` files
- Update API documentation when adding new endpoints

## Git Workflow
- Follow conventional commit message format when possible
- Create feature branches for new development
- Use pull request templates defined in `.github/`
- Ensure CI checks pass before merging
- Review workflows in `.github/workflows/` for CI requirements:
  - `ci.yml`: Continuous integration checks
  - `lint.yml`: Code linting
  - `security.yml`: Security scanning
  - `release.yml`: Release automation

## Development Setup
- Use `.devcontainer/` for consistent development environment (Codespaces/VS Code)
- Install dependencies before starting development:
  - Backend: `pip install -r backend/requirements.txt`
  - Web: `cd web && npm install`
- Configure environment variables using `.env.example` as template
- Run applications:
  - Backend: `cd backend/app && python main.py` or `uvicorn main:app --reload`
  - Web: `cd web && npm run dev`
  - Android: Open in Android Studio or use `./gradlew assembleDebug`

## Performance Considerations
- Use async/await for I/O operations
- Implement proper database indexing
- Use React.memo for expensive component renders
- Implement code splitting in Next.js
- Optimize images using Next.js Image component
- Use proper caching strategies (TanStack Query, Next.js)
- Monitor bundle size for web application

## Accessibility
- Follow WCAG guidelines for web accessibility
- Use semantic HTML elements
- Implement proper ARIA labels where needed
- Ensure keyboard navigation support
- Test with screen readers when implementing complex UI

## Additional Notes
- When uncertain about implementation details, ask clarifying questions.
- Check existing patterns in the codebase before introducing new approaches.
- Consider scalability and maintainability in design decisions.
- Prioritize code readability and clarity over cleverness.
- Keep dependencies up to date but test thoroughly before upgrading major versions.

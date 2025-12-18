# TokyoIA System Architecture

This document describes the high-level architecture, component interactions, and design decisions for the TokyoIA platform.

## System Overview

TokyoIA is a multi-tier platform consisting of:
- **Backend API**: Python/FastAPI REST API server
- **Web Application**: Next.js React application with SSR
- **Android Application**: Native mobile app
- **Third-party Services**: Supabase (database), Stripe (payments)

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
├──────────────────────────────┬──────────────────────────────────┤
│    Web Application           │    Android Application           │
│    (Next.js/React)           │    (Kotlin)                      │
│    - User Interface          │    - Mobile Interface            │
│    - Client-side logic       │    - Native features             │
└──────────────┬───────────────┴────────────┬─────────────────────┘
               │                             │
               │  HTTPS/REST                 │  HTTPS/REST
               │                             │
┌──────────────┴─────────────────────────────┴─────────────────────┐
│                       API Gateway Layer                           │
│                    (Backend FastAPI Server)                       │
├───────────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌─────────────────┐    │
│  │  Auth   │  │ Payments │  │ Casino │  │  ML Predictions │    │
│  │ Module  │  │  Module  │  │ Module │  │     Module      │    │
│  └────┬────┘  └────┬─────┘  └───┬────┘  └────────┬────────┘    │
└───────┼────────────┼────────────┼─────────────────┼──────────────┘
        │            │            │                  │
        │            │            │                  │
┌───────┴────────────┴────────────┴──────────────────┴──────────────┐
│                      Service Layer                                 │
├────────────────────────┬──────────────────────┬────────────────────┤
│   Supabase            │      Stripe           │   ML Models        │
│   - Database          │   - Payments          │   - PyTorch        │
│   - Authentication    │   - Subscriptions     │   - scikit-learn   │
│   - Storage           │   - Webhooks          │   - Transformers   │
└───────────────────────┴───────────────────────┴────────────────────┘
```

## Component Interactions

### Authentication Flow

```
User → Web/Android → Backend /auth/login → Supabase Auth
                                             ↓
                              JWT Token ← Supabase Auth
                                             ↓
User ← Web/Android ← Backend ← Session Created
```

### Payment Processing Flow

```
User → Web → Stripe Checkout (Client) → Stripe API
                                           ↓
                                       Payment Intent
                                           ↓
Backend ← Stripe Webhook ← Payment Confirmed
    ↓
Supabase DB → Update User Balance
    ↓
User ← Notification
```

### Casino Game Flow

```
User → Backend /casino/play → Game Logic
                                  ↓
                         Generate Result
                                  ↓
                         Update Balance
                                  ↓
                      Supabase DB Update
                                  ↓
User ← Game Result with Winnings
```

### ML Prediction Flow

```
User → Backend /ml/predict → Load Model
                               ↓
                         Process Input
                               ↓
                      Generate Prediction
                               ↓
User ← Prediction with Confidence Score
```

## Technology Stack

### Backend
- **Framework**: FastAPI 0.109+
- **Language**: Python 3.11+
- **Server**: Uvicorn (ASGI)
- **Data Validation**: Pydantic
- **ML Libraries**: PyTorch, scikit-learn, transformers
- **HTTP Client**: httpx, aiohttp

### Web Frontend
- **Framework**: Next.js 14.2+
- **Language**: TypeScript 5.3+
- **UI Library**: React 18.2+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: React Query (TanStack Query)
- **Forms**: Zod validation
- **Authentication**: NextAuth.js
- **Database Client**: Supabase JS SDK
- **Payment Client**: Stripe JS SDK

### Android
- **Language**: Kotlin
- **Build System**: Gradle
- **Architecture**: MVVM pattern (expected)
- **DI Framework**: Hilt/Dagger (expected)

### Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Web Hosting**: Vercel
- **CI/CD**: GitHub Actions

## Data Flow

### Request/Response Cycle

1. **Client Request**: User interacts with web/mobile UI
2. **API Call**: HTTP request sent to backend endpoint
3. **Authentication**: JWT token validated via Supabase
4. **Authorization**: User permissions checked
5. **Business Logic**: Request processed by appropriate module
6. **Data Access**: Database queries via Supabase
7. **Response**: JSON response returned to client
8. **UI Update**: Client updates interface with new data

### Real-time Updates (Future)

```
Client ← WebSocket ← Backend ← Database Change
                                  (Supabase Realtime)
```

## Security Architecture

### Authentication & Authorization
- JWT-based authentication via Supabase
- Role-based access control (RBAC)
- Subscription tier checks (free, premium, elite)
- API endpoint protection with middleware

### Data Protection
- HTTPS/TLS for all communications
- Environment variables for secrets
- Stripe webhook signature verification
- CORS configuration for allowed origins
- Security headers (X-Frame-Options, CSP, etc.)

### API Security
- Rate limiting (to be implemented)
- Input validation with Pydantic/Zod
- SQL injection prevention (ORM)
- XSS protection via React

## Scalability Considerations

### Horizontal Scaling
- Stateless backend design for easy replication
- Load balancer compatible (multiple Uvicorn instances)
- Database connection pooling

### Caching Strategy (Future)
- Redis for session caching
- API response caching
- Static asset CDN (Vercel)

### Database Optimization
- Indexed queries on frequently accessed data
- Query optimization with proper SELECT statements
- Connection pooling

### Asynchronous Processing
- FastAPI async/await for non-blocking I/O
- Background tasks for long-running operations
- Webhook processing for payment confirmations

## Deployment Architecture

### Development
```
Local Machine → Dev Container → Local Services
                     ↓
               GitHub Codespaces (Optional)
```

### Staging/Production
```
GitHub → CI/CD Pipeline → Tests → Build
                            ↓
    ┌──────────────────────┴─────────────────────┐
    ↓                      ↓                      ↓
Backend Server      Web (Vercel)        Android (Play Store)
(Cloud Provider)
```

## Technology Decisions

### Why FastAPI?
- High performance (ASGI)
- Automatic API documentation (OpenAPI/Swagger)
- Native async/await support
- Excellent type checking with Pydantic
- Easy integration with ML libraries

### Why Next.js?
- Server-side rendering for SEO
- App Router for modern routing
- API routes for serverless functions
- Excellent TypeScript support
- Vercel deployment optimization

### Why Supabase?
- PostgreSQL database with real-time capabilities
- Built-in authentication
- REST and GraphQL APIs
- Storage for files
- Cost-effective for early stage

### Why Stripe?
- Industry-leading payment processing
- Comprehensive subscription management
- Excellent documentation and SDKs
- Strong security and compliance (PCI DSS)
- Webhook system for event handling

## Performance Considerations

### Backend Performance
- Async I/O for concurrent requests
- Database query optimization
- Caching frequently accessed data
- Connection pooling

### Frontend Performance
- Code splitting with Next.js
- Image optimization
- Static generation where possible
- Lazy loading of components

### Mobile Performance
- Native compilation for Android
- Efficient memory management
- Background task optimization

## Monitoring & Observability (Future)

### Logging
- Structured logging with correlation IDs
- Log aggregation and analysis
- Error tracking (e.g., Sentry)

### Metrics
- Application performance monitoring
- API endpoint latency
- Database query performance
- Error rates and status codes

### Alerts
- Uptime monitoring
- Error rate thresholds
- Performance degradation alerts
- Security incident notifications

## Future Architecture Enhancements

1. **Microservices**: Split monolithic backend into focused services
2. **Event-Driven**: Implement event bus for service communication
3. **Caching Layer**: Add Redis for session and data caching
4. **GraphQL**: Add GraphQL API alongside REST
5. **Real-time**: WebSocket support for live updates
6. **Message Queue**: Add job queue for background processing
7. **Service Mesh**: Implement for inter-service communication
8. **API Gateway**: Dedicated gateway for routing and rate limiting

## Navigation

- [Main Documentation](README.md)
- [Repository Structure](STRUCTURE.md)
- [Detailed Documentation](DOCUMENTATION.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT.md)

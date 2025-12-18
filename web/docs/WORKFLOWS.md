# Workflows System Documentation

## Overview

This document explains the workflow system implemented for user onboarding in the Local Premium Elite application. The workflow system is based on Vercel Workflows pattern, providing a robust way to orchestrate multi-step processes with automatic retry capabilities.

## Table of Contents

- [What are Workflows?](#what-are-workflows)
- [Key Concepts](#key-concepts)
- [Error Handling](#error-handling)
- [Implementation Details](#implementation-details)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Security Considerations](#security-considerations)

## What are Workflows?

Workflows are a way to orchestrate complex, multi-step processes in a reliable and maintainable way. In our system, a workflow consists of multiple steps that execute sequentially, with built-in error handling and retry logic.

### Key Features

- **Step-based Execution**: Each function marked with `"use step"` is executed as an isolated step
- **Automatic Retries**: Steps that fail with regular errors are automatically retried
- **Fatal Error Handling**: Certain errors can be marked as fatal to prevent unnecessary retries
- **Full Node.js Access**: Steps have complete access to Node.js APIs, database calls, external services, etc.
- **Type Safety**: Full TypeScript support with strict typing

## Key Concepts

### Workflow Function

A workflow function is the main orchestrator that coordinates multiple steps. It's marked with the `"use workflow"` directive:

```typescript
export async function userOnboardingWorkflow(email: string) {
  "use workflow";
  
  const user = await createUser(email);
  await sendWelcomeEmail(user);
  await sendOnboardingEmail(user);
  
  return { success: true, userId: user.id };
}
```

### Step Function

Step functions are individual units of work within a workflow. Each step is marked with `"use step"`:

```typescript
async function createUser(email: string) {
  "use step";
  console.log(`Creating user with email: ${email}`);
  return { id: crypto.randomUUID(), email };
}
```

## Error Handling

The workflow system provides two types of error handling:

### 1. Retryable Errors (Default)

By default, any error thrown in a step will trigger an automatic retry. This is useful for transient failures like network issues or temporary service unavailability.

```typescript
async function sendWelcomeEmail(user: { id: string; email: string }) {
  "use step";
  console.log(`Sending welcome email to user: ${user.id}`);
  
  if (Math.random() < 0.3) {
    // This error will trigger automatic retries
    throw new Error("Retryable error - service temporarily unavailable");
  }
}
```

**When to use:**
- Network failures
- Temporary service outages
- Rate limit errors (should retry after delay)
- Database connection timeouts

### 2. Fatal Errors (No Retry)

When an error is fundamental and retrying won't help, use `FatalError` to immediately stop the workflow without retries:

```typescript
import { FatalError } from '@/lib/workflows/user-onboarding';

async function sendOnboardingEmail(user: { id: string; email: string }) {
  "use step";
  
  if (!user.email.includes("@")) {
    // This will stop the workflow immediately without retries
    throw new FatalError("Invalid Email - missing @ symbol");
  }
  
  console.log(`Sending onboarding email to user: ${user.id}`);
}
```

**When to use:**
- Invalid input data
- Business logic violations
- Authorization failures
- Data validation errors

### Error Handling in Workflow

The workflow function should catch and handle errors appropriately:

```typescript
export async function userOnboardingWorkflow(email: string) {
  "use workflow";
  
  try {
    const user = await createUser(email);
    await sendWelcomeEmail(user);
    await sendOnboardingEmail(user);
    
    return {
      success: true,
      userId: user.id,
      message: "User onboarded successfully"
    };
  } catch (error) {
    if (error instanceof FatalError) {
      return {
        success: false,
        error: error.message,
        retry: false
      };
    }
    throw error; // Allow retry for non-fatal errors
  }
}
```

## Implementation Details

### File Structure

```
web/
├── lib/
│   └── workflows/
│       └── user-onboarding.ts    # Workflow implementation
├── types/
│   └── workflow.ts                # TypeScript type definitions
├── app/
│   └── api/
│       └── workflows/
│           └── onboarding/
│               └── route.ts       # API endpoint
└── docs/
    └── WORKFLOWS.md               # This documentation
```

### Type Definitions

The workflow system uses strict TypeScript types defined in `types/workflow.ts`:

```typescript
export interface WorkflowUser {
  id: string;
  email: string;
  createdAt?: Date;
}

export interface WorkflowResult {
  success: boolean;
  userId?: string;
  message?: string;
  error?: string;
  retry?: boolean;
}

export interface WorkflowStep {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  error?: string;
}
```

## Usage Examples

### Example 1: Calling the Workflow via API

```bash
curl -X POST http://localhost:3000/api/workflows/onboarding \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

**Success Response:**
```json
{
  "success": true,
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "User onboarded successfully"
}
```

**Fatal Error Response (Invalid Email):**
```json
{
  "success": false,
  "error": "Invalid Email",
  "retry": false
}
```

**Retryable Error Response:**
```json
{
  "error": "Internal server error",
  "retry": true
}
```

### Example 2: Calling the Workflow Programmatically

```typescript
import { userOnboardingWorkflow } from '@/lib/workflows/user-onboarding';

async function handleUserSignup(email: string) {
  const result = await userOnboardingWorkflow(email);
  
  if (result.success) {
    console.log(`User ${result.userId} onboarded successfully`);
  } else {
    console.error(`Onboarding failed: ${result.error}`);
    
    if (result.retry) {
      // Implement retry logic here
    }
  }
}
```

### Example 3: Creating a New Workflow

```typescript
import { FatalError } from '@/lib/workflows/user-onboarding';

async function stepOne(data: string) {
  "use step";
  // Your logic here
  return processedData;
}

async function stepTwo(data: ProcessedData) {
  "use step";
  // Validate data
  if (!isValid(data)) {
    throw new FatalError("Invalid data");
  }
  // Process data
}

export async function myCustomWorkflow(input: string) {
  "use workflow";
  
  try {
    const data = await stepOne(input);
    await stepTwo(data);
    
    return { success: true };
  } catch (error) {
    if (error instanceof FatalError) {
      return { success: false, error: error.message, retry: false };
    }
    throw error;
  }
}
```

## Best Practices

### 1. Step Granularity

- **Keep steps focused**: Each step should do one thing well
- **Make steps idempotent**: Steps should be safe to retry without side effects
- **Avoid long-running steps**: Break down complex operations into smaller steps

```typescript
// Good: Focused, single-responsibility steps
async function createUserInDatabase(email: string) {
  "use step";
  return await db.users.create({ email });
}

async function sendWelcomeEmail(userId: string) {
  "use step";
  return await emailService.send(userId, 'welcome');
}

// Avoid: Doing too much in one step
async function createUserAndSendEmail(email: string) {
  "use step";
  const user = await db.users.create({ email });
  await emailService.send(user.id, 'welcome'); // If this fails, user creation is lost
  return user;
}
```

### 2. Error Classification

- **Use FatalError for validation**: Input validation failures should not be retried
- **Let transient errors retry**: Network issues, temporary outages should use regular errors
- **Log errors appropriately**: Include context for debugging

```typescript
async function processPayment(amount: number) {
  "use step";
  
  // Validation - use FatalError
  if (amount <= 0) {
    throw new FatalError("Invalid amount");
  }
  
  try {
    // Network call - let regular errors retry
    return await paymentGateway.charge(amount);
  } catch (error) {
    console.error('Payment failed:', { amount, error });
    throw error; // Will retry automatically
  }
}
```

### 3. Input Validation

- **Validate early**: Check inputs at the workflow level before executing steps
- **Provide clear error messages**: Help users understand what went wrong
- **Use TypeScript types**: Leverage type system for compile-time validation

```typescript
export async function userOnboardingWorkflow(email: string) {
  "use workflow";
  
  // Validate input early
  if (!email || typeof email !== 'string') {
    return {
      success: false,
      error: "Email is required and must be a string",
      retry: false
    };
  }
  
  if (!email.includes('@')) {
    return {
      success: false,
      error: "Invalid email format",
      retry: false
    };
  }
  
  // Proceed with workflow
  // ...
}
```

### 4. Logging and Monitoring

- **Log step start/completion**: Track workflow progress
- **Include correlation IDs**: Make debugging easier
- **Don't log sensitive data**: Avoid logging passwords, tokens, etc.

```typescript
async function createUser(email: string) {
  "use step";
  
  const correlationId = crypto.randomUUID();
  console.log(`[${correlationId}] Creating user with email: ${email}`);
  
  try {
    const user = await db.users.create({ email });
    console.log(`[${correlationId}] User created successfully: ${user.id}`);
    return user;
  } catch (error) {
    console.error(`[${correlationId}] Failed to create user:`, error);
    throw error;
  }
}
```

### 5. Return Values

- **Use consistent response format**: Always return the same structure
- **Include enough information**: Provide context for success and failure cases
- **Type your responses**: Use TypeScript interfaces

```typescript
// Good: Consistent, well-typed response
interface WorkflowResponse {
  success: boolean;
  userId?: string;
  message?: string;
  error?: string;
  retry?: boolean;
}

export async function myWorkflow(input: string): Promise<WorkflowResponse> {
  "use workflow";
  // Implementation
}
```

## Security Considerations

### 1. Input Validation

Always validate and sanitize inputs before processing:

```typescript
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function userOnboardingWorkflow(email: string) {
  "use workflow";
  
  if (!isValidEmail(email)) {
    return {
      success: false,
      error: "Invalid email format",
      retry: false
    };
  }
  // Continue...
}
```

### 2. Rate Limiting

Implement rate limiting at the API level:

```typescript
// In route.ts
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Check rate limit
  const identifier = request.ip || 'anonymous';
  const { success } = await rateLimit(identifier);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // Continue with workflow...
}
```

### 3. Sensitive Data

Never log or expose sensitive information:

```typescript
async function createUser(email: string, password: string) {
  "use step";
  
  // Good: Don't log passwords
  console.log(`Creating user with email: ${email}`);
  
  // Bad: Never do this
  // console.log(`Creating user with password: ${password}`);
  
  const hashedPassword = await hash(password);
  return await db.users.create({ email, password: hashedPassword });
}
```

### 4. Authentication & Authorization

Protect workflow endpoints with proper authentication:

```typescript
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Continue with workflow...
}
```

## Integration with Existing Systems

### Supabase Integration

```typescript
import { createClient } from '@supabase/supabase-js';

async function createUser(email: string) {
  "use step";
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data, error } = await supabase
    .from('users')
    .insert({ email })
    .select()
    .single();
  
  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }
  
  return data;
}
```

### NextAuth Integration

```typescript
import { getServerSession } from "next-auth";

export async function userOnboardingWorkflow(email: string, sessionToken: string) {
  "use workflow";
  
  const session = await getServerSession();
  
  if (!session) {
    return {
      success: false,
      error: "Unauthorized",
      retry: false
    };
  }
  
  // Continue with workflow...
}
```

## Troubleshooting

### Common Issues

**Issue: Steps not retrying**
- **Cause**: Using FatalError when regular Error should be used
- **Solution**: Only use FatalError for permanent failures

**Issue: Workflow timing out**
- **Cause**: Step taking too long to complete
- **Solution**: Break down into smaller steps or optimize the operation

**Issue: Type errors**
- **Cause**: Missing or incorrect type definitions
- **Solution**: Ensure all types are properly defined and imported

## Further Reading

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Error Handling in Node.js](https://nodejs.org/en/docs/guides/error-handling/)

## Support

For questions or issues with the workflow system, please:
1. Check this documentation
2. Review existing workflow implementations
3. Contact the development team

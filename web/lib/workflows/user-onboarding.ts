// Custom FatalError class for non-retryable errors
export class FatalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FatalError';
    Object.setPrototypeOf(this, FatalError.prototype);
  }
}

// Workflow function para crear usuario
async function createUser(email: string) {
  "use step"; 
  console.log(`Creating user with email: ${email}`);
  // Full Node.js access - database calls, APIs, etc.
  return { id: crypto.randomUUID(), email };
}

// Workflow function para enviar email de bienvenida
async function sendWelcomeEmail(user: { id: string; email: string }) {
  "use step"; 
  console.log(`Sending welcome email to user: ${user.id}`);
  if (Math.random() < 0.3) {
    // By default, steps will be retried for unhandled errors
    throw new Error("Retryable!");
  }
}

// Workflow function para enviar email de onboarding
async function sendOnboardingEmail(user: { id: string; email: string }) {
  "use step"; 
  if (!user.email.includes("@")) {
    // To skip retrying, throw a FatalError instead
    throw new FatalError("Invalid Email");
  }
  console.log(`Sending onboarding email to user: ${user.id}`);
}

// Workflow principal que orquesta el proceso completo
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

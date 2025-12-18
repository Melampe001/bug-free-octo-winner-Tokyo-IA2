import { NextRequest, NextResponse } from 'next/server';
import { verifyCronAuth, createUnauthorizedResponse } from '@/lib/middleware/cron-auth';
import { userOnboardingWorkflow } from '@/lib/workflows/user-onboarding';

export async function POST(request: NextRequest) {
  // Verificar autenticación
  const authResult = verifyCronAuth(request);
  
  if (!authResult.authorized) {
    return createUnauthorizedResponse(authResult.error);
  }

  try {
    const { email, action } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required', success: false },
        { status: 400 }
      );
    }
    
    // Ejecutar workflow basado en la acción
    let result;
    
    switch (action) {
      case 'onboarding':
        result = await userOnboardingWorkflow(email);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action', success: false },
          { status: 400 }
        );
    }
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    });
  } catch (error) {
    console.error('Cron workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false, retry: true },
      { status: 500 }
    );
  }
}

// Endpoint GET para health check
export async function GET(request: NextRequest) {
  const authResult = verifyCronAuth(request);
  
  if (!authResult.authorized) {
    return createUnauthorizedResponse(authResult.error);
  }
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'cron-workflows'
  });
}

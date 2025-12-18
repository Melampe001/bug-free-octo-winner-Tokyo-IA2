import { NextRequest, NextResponse } from 'next/server';

export interface CronAuthResult {
  authorized: boolean;
  error?: string;
}

export function verifyCronAuth(request: NextRequest): CronAuthResult {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return {
      authorized: false,
      error: 'Missing Authorization header'
    };
  }
  
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
  
  if (authHeader !== expectedAuth) {
    // Log unauthorized attempt for security monitoring
    console.error('Unauthorized cron attempt:', {
      ip: request.ip || 'unknown',
      timestamp: new Date().toISOString(),
      headerPrefix: authHeader.substring(0, 20) + '...'
    });
    
    return {
      authorized: false,
      error: 'Invalid or expired token'
    };
  }
  
  return { authorized: true };
}

export function createUnauthorizedResponse(error: string = 'Unauthorized'): NextResponse {
  return NextResponse.json(
    { error, success: false },
    { status: 401 }
  );
}

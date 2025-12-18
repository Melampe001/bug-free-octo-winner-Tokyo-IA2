import { NextRequest, NextResponse } from 'next/server';
import { userOnboardingWorkflow } from '@/lib/workflows/user-onboarding';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const result = await userOnboardingWorkflow(email);
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    });
  } catch (error) {
    console.error('Workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error', retry: true },
      { status: 500 }
    );
  }
}

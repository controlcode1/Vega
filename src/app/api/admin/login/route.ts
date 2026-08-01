import { NextResponse } from 'next/server';
import { verifyCredentials, encryptSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Verify credentials with injection-proof and timing-safe check
    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const sessionData = {
      username: 'Nemo',
      expires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours expiry
    };

    const token = encryptSession(sessionData);

    const response = NextResponse.json({ success: true, username: 'Nemo' });
    
    // Set cookie securely
    response.cookies.set('vega_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

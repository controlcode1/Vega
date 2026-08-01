import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/session';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('vega_admin_session')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = decryptSession(token);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, username: session.username });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

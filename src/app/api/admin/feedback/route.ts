import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase';

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('vega_admin_session')?.value;
  if (!token) return false;
  const session = decryptSession(token);
  return !!session;
}

// GET /api/admin/feedback — all feedback entries (admin only)
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('id, name, text, rating, status, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const feedback = (data ?? []).map((f) => ({
      id: f.id,
      name: f.name,
      text: f.text,
      rating: f.rating,
      status: f.status,
      createdAt: f.created_at,
    }));

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Admin feedback GET error:', error);
    return NextResponse.json({ error: 'Failed to load feedback' }, { status: 500 });
  }
}

// PATCH /api/admin/feedback — update status: approved | hidden | pending
export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !['pending', 'approved', 'hidden'].includes(status)) {
      return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
    }

    const { error, count } = await supabaseAdmin
      .from('feedback')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    if (count === 0) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin feedback PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

// DELETE /api/admin/feedback?id=xxx — permanently delete
export async function DELETE(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { error, count } = await supabaseAdmin
      .from('feedback')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw error;
    if (!count || count === 0) {
      return NextResponse.json({ error: 'Feedback not found or already deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin feedback DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}

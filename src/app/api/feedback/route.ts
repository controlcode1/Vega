import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

// GET /api/feedback — public: returns only approved feedback
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('id, name, text, rating, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const feedback = (data ?? []).map((f) => ({
      id: f.id,
      name: f.name,
      text: f.text,
      rating: f.rating,
      createdAt: f.created_at,
    }));

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Feedback GET error:', error);
    return NextResponse.json({ error: 'Failed to load feedback' }, { status: 500 });
  }
}

// POST /api/feedback — public: submit new feedback (saved as 'pending')
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, text, rating } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 chars)' }, { status: 400 });
    }
    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      return NextResponse.json({ error: 'Feedback text is required (min 3 chars)' }, { status: 400 });
    }
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const id = `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error } = await supabaseAdmin
      .from('feedback')
      .insert({
        id,
        name: name.trim(),
        text: text.trim(),
        rating,
        status: 'pending',
      });

    if (error) throw error;

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error('Feedback POST error:', error);
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }
}

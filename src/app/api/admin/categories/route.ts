import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateCache, CACHE_KEYS } from '@/lib/redis';

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('vega_admin_session')?.value;
  if (!token) return false;
  const session = decryptSession(token);
  return !!session;
}

// ── POST /api/admin/categories — Create a new category ──
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { nameEn, nameAr, icon } = body;

    if (!nameEn || !nameAr || typeof nameEn !== 'string' || typeof nameAr !== 'string') {
      return NextResponse.json({ error: 'Invalid name inputs' }, { status: 400 });
    }

    const cleanNameEn = nameEn.trim();
    const cleanNameAr = nameAr.trim();
    const cleanIcon = typeof icon === 'string' ? icon.trim() : 'Zap';

    // Generate slug ID from English name
    const slug = cleanNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = slug || `cat-${Date.now()}`;

    // Check duplicate
    const { data: existing } = await supabaseAdmin
      .from('categories')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }

    // Get next sort_order
    const { count } = await supabaseAdmin
      .from('categories')
      .select('*', { count: 'exact', head: true });

    const { data: newCat, error } = await supabaseAdmin
      .from('categories')
      .insert({ id, name_en: cleanNameEn, name_ar: cleanNameAr, icon: cleanIcon, sort_order: (count ?? 0) + 1 })
      .select()
      .single();

    if (error) throw error;

    await invalidateCache(CACHE_KEYS.MENU_DATA);

    return NextResponse.json({
      success: true,
      category: {
        id: newCat.id,
        nameEn: newCat.name_en,
        nameAr: newCat.name_ar,
        icon: newCat.icon,
      },
    });
  } catch (error) {
    console.error('Category POST error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

// ── DELETE /api/admin/categories?id=xxx — Delete a category ──
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    // Check if category has items
    const { count: itemCount } = await supabaseAdmin
      .from('menu_items')
      .select('*', { count: 'exact', head: true })
      .ilike('category_id', id);

    if (itemCount && itemCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category: Please remove all products inside this category first.' },
        { status: 400 }
      );
    }

    const { error, count } = await supabaseAdmin
      .from('categories')
      .delete({ count: 'exact' })
      .ilike('id', id);

    if (error) throw error;
    if (!count || count === 0) {
      return NextResponse.json({ error: 'Category not found or already deleted' }, { status: 404 });
    }

    await invalidateCache(CACHE_KEYS.MENU_DATA);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

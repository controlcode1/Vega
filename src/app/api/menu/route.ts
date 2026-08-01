import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCache, setCache, CACHE_KEYS } from '@/lib/redis';
import type { Category, MenuItem } from '@/lib/db';

export async function GET() {
  try {
    // 1. Try Redis cache first
    const cachedData = await getCache(CACHE_KEYS.MENU_DATA);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'X-Cache-Status': 'HIT',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // 2. Fetch categories from Supabase
    const { data: cats, error: catErr } = await supabase
      .from('categories')
      .select('id, name_en, name_ar, icon, sort_order')
      .order('sort_order', { ascending: true });

    if (catErr) throw catErr;

    // 3. Fetch available menu items from Supabase
    const { data: items, error: itemErr } = await supabase
      .from('menu_items')
      .select('id, category_id, name, name_ar, description, description_ar, price, image, tag, tag_ar, badge')
      .eq('is_available', true)
      .order('sort_order', { ascending: true });

    if (itemErr) throw itemErr;

    // 4. Map snake_case → camelCase to keep the frontend unchanged
    const categories: Category[] = (cats ?? []).map((c) => ({
      id: c.id,
      nameEn: c.name_en,
      nameAr: c.name_ar,
      icon: c.icon,
    }));

    const menuItems: MenuItem[] = (items ?? []).map((i) => ({
      id: i.id,
      categoryId: i.category_id,
      name: i.name,
      nameAr: i.name_ar,
      description: i.description ?? '',
      descriptionAr: i.description_ar ?? '',
      price: i.price,
      image: i.image ?? '',
      tag: i.tag ?? undefined,
      tagAr: i.tag_ar ?? undefined,
      badge: i.badge ?? undefined,
    }));

    const data = { categories, items: menuItems };

    // 5. Store in Redis cache for 1 hour
    await setCache(CACHE_KEYS.MENU_DATA, data, 3600);

    return NextResponse.json(data, {
      headers: {
        'X-Cache-Status': 'MISS',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ error: 'Failed to load menu' }, { status: 500 });
  }
}

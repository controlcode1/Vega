import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase';
import { invalidateCache, CACHE_KEYS } from '@/lib/redis';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('vega_admin_session')?.value;
  if (!token) return false;
  const session = decryptSession(token);
  return !!session;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// ── POST /api/admin/products — Add a new product ──
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const categoryId    = formData.get('categoryId')?.toString().trim() || '';
    const name          = formData.get('name')?.toString().trim() || '';
    const nameAr        = formData.get('nameAr')?.toString().trim() || '';
    const description   = formData.get('description')?.toString().trim() || '';
    const descriptionAr = formData.get('descriptionAr')?.toString().trim() || '';
    const price         = formData.get('price')?.toString().trim() || '';
    const tag           = formData.get('tag')?.toString().trim() || null;
    const tagAr         = formData.get('tagAr')?.toString().trim() || null;
    const badge         = formData.get('badge')?.toString().trim() || null;

    if (!categoryId || !name || !nameAr || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify category exists in Supabase
    const { data: cat } = await supabaseAdmin
      .from('categories')
      .select('id')
      .eq('id', categoryId)
      .maybeSingle();

    if (!cat) {
      return NextResponse.json({ error: 'Selected category does not exist' }, { status: 400 });
    }

    // Handle image upload (keep local /uploads/ storage)
    const imageFile = formData.get('image');
    let imageUrl = '';

    if (imageFile && typeof imageFile === 'object' && 'arrayBuffer' in imageFile) {
      const file = imageFile as unknown as File;

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Only image files (JPEG, PNG, GIF, WEBP) are allowed' }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size exceeds 20MB limit' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const rawBuffer = Buffer.from(bytes);

      const webpBuffer = await sharp(rawBuffer)
        .webp({ quality: 82, effort: 4, lossless: false })
        .toBuffer();

      const cleanFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.webp`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, cleanFilename), webpBuffer);
      imageUrl = `/uploads/${cleanFilename}`;
    } else if (typeof imageFile === 'string') {
      imageUrl = imageFile;
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    // Get sort_order for this category
    const { count } = await supabaseAdmin
      .from('menu_items')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId);

    const productId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const { data: newProduct, error } = await supabaseAdmin
      .from('menu_items')
      .insert({
        id:             productId,
        category_id:   categoryId,
        name,
        name_ar:        nameAr,
        description,
        description_ar: descriptionAr,
        price,
        image:          imageUrl,
        tag,
        tag_ar:         tagAr,
        badge,
        is_available:   true,
        sort_order:     (count ?? 0) + 1,
      })
      .select()
      .single();

    if (error) throw error;

    await invalidateCache(CACHE_KEYS.MENU_DATA);

    return NextResponse.json({
      success: true,
      product: {
        id:            newProduct.id,
        categoryId:    newProduct.category_id,
        name:          newProduct.name,
        nameAr:        newProduct.name_ar,
        description:   newProduct.description ?? '',
        descriptionAr: newProduct.description_ar ?? '',
        price:         newProduct.price,
        image:         newProduct.image ?? '',
        tag:           newProduct.tag ?? undefined,
        tagAr:         newProduct.tag_ar ?? undefined,
        badge:         newProduct.badge ?? undefined,
      },
    });
  } catch (error) {
    console.error('Product POST error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// ── DELETE /api/admin/products?id=xxx — Delete a product ──
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    // Fetch the item first to get image path
    const { data: item } = await supabaseAdmin
      .from('menu_items')
      .select('image')
      .eq('id', id)
      .maybeSingle();

    if (!item) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete local image file if applicable
    if (item.image?.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', item.image);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { console.error('Error deleting file', e); }
      }
    }

    const { error } = await supabaseAdmin
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) throw error;

    await invalidateCache(CACHE_KEYS.MENU_DATA);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { products } from '@/lib/products'
import { blogPosts } from '@/lib/blogs'

export async function GET() {
  const supabase = await createClient()

  // 1. Migrate Products
  const productsToInsert = products.map((p) => ({
    // Use an existing UUID if you want, but gen_random_uuid is better for DB.
    // However, our code might rely on these string IDs. For safety, let's keep the existing IDs if they are valid UUIDs, otherwise let Supabase generate them.
    // The current IDs are '1', '2', '3', etc., which are NOT valid UUIDs.
    // Wait, the products table uses UUID. So we must avoid passing '1', '2', let it generate, but then existing code using these IDs (cart, etc) might break if not cleared.
    // Actually, local storage cart will break if IDs change. That's a known trade-off when moving to real UUIDs.
    
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    category: p.category,
    stock: p.stock,
    full_description: p.fullDescription || null,
    tablets_count: p.tabletsCount || null,
    packs: p.packs || [],
    shipping_options: p.shippingOptions || [],
    how_to_use: p.howToUse || [],
    benefits: p.benefits || [],
    effects_timing: p.effectsTiming || null,
    last_updated: p.lastUpdated || null,
    written_by: p.writtenBy || null,
    medically_reviewed_by: p.medicallyReviewedBy || null,
    reviews: p.reviews || []
  }))

  const { error: productsError } = await supabase
    .from('products')
    .insert(productsToInsert)

  if (productsError) {
    console.error('Error inserting products:', productsError)
    return NextResponse.json({ error: productsError.message }, { status: 500 })
  }

  // 2. Migrate Blogs
  const blogsToInsert = blogPosts.map((b) => ({
    title: b.title,
    excerpt: b.excerpt,
    content: b.content,
    date: b.date,
    author: b.author,
    category: b.category,
  }))

  const { error: blogsError } = await supabase
    .from('blogs')
    .insert(blogsToInsert)

  if (blogsError) {
    console.error('Error inserting blogs:', blogsError)
    return NextResponse.json({ error: blogsError.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Migration successful!' })
}

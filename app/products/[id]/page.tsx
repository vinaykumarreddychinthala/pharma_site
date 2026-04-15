import { createClient } from '@/lib/supabase/server'
import { ProductDetailClient } from './product-detail-client'
import { notFound } from 'next/navigation'

export const revalidate = 0

// We need to un-await params in Next 15+ if using dynamic segments, but traditionally it's fine.
// Next 15 requires `params` to be awaited if they are used, e.g. `const { id } = await params`.
// We will type params as a Promise.
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

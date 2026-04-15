import { createClient } from '@/lib/supabase/server'
import { ProductsClient } from './products-client'

export const metadata = {
  title: 'Products - Believe Pharma',
  description: 'Premium performance & wellness solutions — discreetly delivered worldwide.',
}

// Revalidate occasionally, or keep it perfectly dynamic based on DB updates 
// For an ecommerce site with an admin panel, setting revalidate to 0 or using dynamic route is standard.
export const revalidate = 0

export default async function ProductsServerPage() {
  const supabase = await createClient()
  // Fetch existing static products just in case DB is empty for a seamless transition?
  const { data: dbProducts } = await supabase.from('products').select('*')
  
  // If no DB products yet, fallback to empty array (the migration script will populate it)
  const products = dbProducts || []

  return <ProductsClient initialProducts={products} />
}

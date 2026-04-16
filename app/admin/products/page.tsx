import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, deleteProduct } from '../actions'
import { Trash2, Edit } from 'lucide-react'
import { ProductForm } from './product-form'
import Link from 'next/link'

export default async function AdminProductsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ edit?: string }> 
}) {
  try {
    const { edit: editId } = await searchParams
    const supabase = await createClient()
    
    // Fetch all products
    const { data: products, error: fetchError } = await supabase.from('products').select('*').order('created_at', { ascending: false })

    if (fetchError) {
      throw new Error(`Database Error: ${fetchError.message}`)
    }

    // Fetch product to edit if requested
    let editingProduct = null
    if (editId) {
      const { data } = await supabase.from('products').select('*').eq('id', editId).single()
      editingProduct = data
    }

    return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
        <p className="text-muted-foreground mt-2">Add new products or remove existing ones.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Form to Add/Edit Product */}
        <div className="md:col-span-4">
          <ProductForm initialData={editingProduct} />
        </div>

        {/* List of Products */}
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Existing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-contain bg-white rounded-md border" />
                        <div>
                          <p className="font-bold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category} • ${product.price} • Stock: {product.stock}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/products?edit=${product.id}`}>
                          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteProduct(product.id)
                        }}>
                          <Button type="submit" variant="destructive" size="icon" className="h-9 w-9">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8 border border-dashed rounded-lg">No products found. Migrate data or add a new one.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500">
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm opacity-80">{error?.message || "An unexpected error occurred while loading the products."}</p>
        <p className="mt-4 text-xs opacity-50 font-mono">Check your Vercel logs or environment variables for details.</p>
      </div>
    )
  }
}

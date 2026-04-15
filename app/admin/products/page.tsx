import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, deleteProduct } from '../actions'
import { Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
        <p className="text-muted-foreground mt-2">Add new products or remove existing ones.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Form to Add Product */}
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea id="description" name="description" required className="resize-none" rows={3}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" name="price" type="number" step="0.01" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" name="stock" type="number" defaultValue="100" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="e.g. ED Treatment" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image Path/URL</Label>
                  <Input id="image" name="image" placeholder="/viagra.jpeg" required />
                </div>

                <Button type="submit" className="w-full">Create Product</Button>
              </form>
            </CardContent>
          </Card>
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
                      <form action={async () => {
                        'use server'
                        await deleteProduct(product.id)
                      }}>
                        <Button type="submit" variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
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
}

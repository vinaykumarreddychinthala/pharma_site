'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct, updateProduct } from '../actions'
import { 
  StringListInput, 
  ObjectListInput, 
  SingleObjectInput 
} from '@/components/admin/dynamic-form-fields'
import { Product } from '@/lib/products'
import { X } from 'lucide-react'
import Link from 'next/link'

interface ProductFormProps {
  initialData?: Product | null
}

export function ProductForm({ initialData }: ProductFormProps) {
  const isEditing = !!initialData

  return (
    <Card className={isEditing ? 'border-primary ring-1 ring-primary/20' : ''}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
        {isEditing && (
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <form 
          key={initialData?.id || 'new'}
          action={async (formData) => {
            const action = isEditing ? updateProduct : createProduct
            const result = await action(formData)
            
            if (result.error) {
              alert(`Error: ${result.error}`)
            } else {
              alert(isEditing ? 'Product updated successfully!' : 'Product created successfully!')
              if (isEditing) {
                window.location.href = '/admin/products'
              } else {
                window.location.reload()
              }
            }
          }} 
          className="space-y-6"
        >
          {/* Hidden ID and Existing Image for Editing */}
          {isEditing && (
            <>
              <input type="hidden" name="id" value={initialData.id} />
              <input type="hidden" name="existingImage" value={initialData.image} />
            </>
          )}

          {/* --- Basic Information --- */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Basic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. Sildenafil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input id="slug" name="slug" defaultValue={initialData?.slug} placeholder="e.g. sildenafil-100mg" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input id="title" name="title" defaultValue={initialData?.title} placeholder="SEO Title for the page" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="overview">Overview (Short Hook)</Label>
              <Textarea id="overview" name="overview" defaultValue={initialData?.overview} className="resize-none" rows={2}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" required defaultValue={initialData?.description} className="resize-none" rows={3}/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" name="price" type="number" step="0.01" required defaultValue={initialData?.price} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock</Label>
                <Input id="stock" name="stock" type="number" required defaultValue={initialData?.stock ?? 100} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="e.g. ED Treatment" required defaultValue={initialData?.category} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Product Image {isEditing && '(Optional - Leave blank to keep current)'}</Label>
              <Input id="image" name="image" type="file" accept="image/*" required={!isEditing} className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {isEditing && initialData.image && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={initialData.image} alt="Current" className="w-10 h-10 object-contain rounded border" />
                  <span className="text-[10px] text-muted-foreground">Current Image</span>
                </div>
              )}
            </div>
          </div>

          {/* --- Medical & Technical Details --- */}
          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Medical & Technical Details</h3>
            
            <SingleObjectInput 
              label="Composition" 
              name="composition" 
              defaultValue={initialData?.composition}
              fields={[
                { key: 'activeIngredient', label: 'Active Ingredient' },
                { key: 'drugClass', label: 'Drug Class' }
              ]} 
            />

            <div className="space-y-2">
              <Label htmlFor="how_it_works">Detailed Mechanism (How it works)</Label>
              <Textarea id="how_it_works" name="how_it_works" defaultValue={initialData?.howItWorks} placeholder="Explain the biological process..." className="resize-none" rows={3}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StringListInput label="Uses / Indications" name="uses" defaultValue={initialData?.uses} />
              <StringListInput label="Usage Guidelines" name="usage_instructions" defaultValue={initialData?.usage || initialData?.howToUse} />
            </div>

            <ObjectListInput 
              label="Dosage Options" 
              name="dosage" 
              defaultValue={initialData?.dosage}
              fields={[
                { key: 'strength', label: 'Strength (e.g. 50mg)' },
                { key: 'price', label: 'Price Tag (e.g. $5.00)' }
              ]}
            />

            <SingleObjectInput 
              label="Effects Timing & Duration" 
              name="effects" 
              defaultValue={initialData?.effects}
              fields={[
                { key: 'startTime', label: 'Starts working in' },
                { key: 'duration', label: 'Lasts for' }
              ]} 
            />

            <div className="space-y-4 p-4 bg-muted/20 border rounded-xl">
              <Label className="font-bold">Side Effects</Label>
              <StringListInput label="Common Side Effects" name="side_effects_common" defaultValue={initialData?.sideEffects?.common} />
              <StringListInput label="Serious Side Effects" name="side_effects_serious" defaultValue={initialData?.sideEffects?.serious} />
              <input type="hidden" name="side_effects_merge" value="true" />
            </div>

            <StringListInput label="Precautions & Warnings" name="precautions" defaultValue={initialData?.precautions} />

            <div className="space-y-2">
              <Label htmlFor="storage">Storage Instructions</Label>
              <Input id="storage" name="storage" defaultValue={initialData?.storage} placeholder="e.g. Store at room temperature away from moisture." />
            </div>

            <ObjectListInput 
              label="Frequently Asked Questions" 
              name="faqs" 
              defaultValue={initialData?.faqs}
              fields={[
                { key: 'question', label: 'Question' },
                { key: 'answer', label: 'Answer', type: 'textarea' }
              ]}
            />
          </div>

          {/* --- Admin & Shipping settings --- */}
          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Settings & Shipping</h3>
            
            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="reviews_enabled" name="reviews_enabled" className="w-4 h-4 rounded text-primary" defaultChecked={initialData?.reviewsEnabled ?? true} />
              <Label htmlFor="reviews_enabled">Enable Public Reviews Display</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping_info">Shipping Information (Custom Text)</Label>
              <Input id="shipping_info" name="shipping_info" defaultValue={initialData?.shippingInfo} placeholder="Ships confidentially in 2-4 days." />
            </div>

            <SingleObjectInput 
              label="Button Text (CTAs)" 
              name="cta" 
              defaultValue={initialData?.cta}
              fields={[
                { key: 'primary', label: 'Primary Button (e.g. Buy Now)' },
                { key: 'secondary', label: 'Secondary Button (e.g. View Details)' }
              ]} 
            />
          </div>

          <div className="flex gap-4">
            {isEditing && (
              <Link href="/admin/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full text-lg py-6 h-auto">
                  Cancel
                </Button>
              </Link>
            )}
            <Button type="submit" className={`flex-[2] text-lg font-bold py-6 h-auto shadow-lg ${isEditing ? 'bg-primary' : 'bg-gradient-to-r from-primary to-secondary'}`}>
              {isEditing ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

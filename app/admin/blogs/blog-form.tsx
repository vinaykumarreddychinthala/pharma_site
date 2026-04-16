'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createBlog, updateBlog } from '../actions'
import { 
  StringListInput, 
  ObjectListInput 
} from '@/components/admin/dynamic-form-fields'
import { BlogPost } from '@/lib/blogs'
import { X } from 'lucide-react'
import Link from 'next/link'

interface BlogFormProps {
  initialData?: BlogPost | null
}

export function BlogForm({ initialData }: BlogFormProps) {
  const isEditing = !!initialData

  return (
    <Card className={isEditing ? 'border-primary ring-1 ring-primary/20' : ''}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{isEditing ? 'Edit Blog Post' : 'Write New Post'}</CardTitle>
        {isEditing && (
          <Link href="/admin/blogs">
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
            const action = isEditing ? updateBlog : createBlog
            const result = await action(formData)
            
            if (result.error) {
              alert(`Error: ${result.error}`)
            } else {
              alert(isEditing ? 'Blog post updated successfully!' : 'Blog post published successfully!')
              if (isEditing) {
                window.location.href = '/admin/blogs'
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
              <input type="hidden" name="existingImage" value={initialData.image || ''} />
            </>
          )}

          {/* --- Header Information --- */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Article Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input id="title" name="title" required defaultValue={initialData?.title} placeholder="e.g. Sildenafil Guide" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input id="slug" name="slug" defaultValue={initialData?.slug} placeholder="e.g. sildenafil-guide" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt (List View Summary)</Label>
              <Textarea id="excerpt" name="excerpt" required defaultValue={initialData?.excerpt} className="resize-none" rows={2}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intro">Introduction (Hero Section)</Label>
              <Textarea id="intro" name="intro" defaultValue={initialData?.intro} className="resize-none" rows={3}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={initialData?.author || "Believe Pharma Team"} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewed_by">Reviewed By</Label>
                <Input id="reviewed_by" name="reviewed_by" defaultValue={initialData?.reviewedBy} placeholder="e.g. Dr. James Carter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" defaultValue={initialData?.category} placeholder="e.g. ED Treatment" required />
              </div>
            </div>
          </div>

          {/* --- Content Sections --- */}
          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Structured Content</h3>

            <ObjectListInput 
              label="Article Sections" 
              name="sections" 
              defaultValue={initialData?.sections}
              fields={[
                { key: 'heading', label: 'Section Heading' },
                { key: 'content', label: 'Section Content', type: 'textarea' }
              ]}
            />

            <ObjectListInput 
              label="Frequently Asked Questions" 
              name="faq" 
              defaultValue={initialData?.faq}
              fields={[
                { key: 'question', label: 'Question' },
                { key: 'answer', label: 'Answer', type: 'textarea' }
              ]}
            />

            <StringListInput label="Related Products (Enter IDs or Slugs)" name="related_products" defaultValue={initialData?.relatedProducts} />

            <div className="space-y-2">
              <Label htmlFor="conclusion">Conclusion Block</Label>
              <Textarea id="conclusion" name="conclusion" defaultValue={initialData?.conclusion} className="resize-none" rows={3}/>
            </div>
          </div>

          {/* --- Media & Media Fallback --- */}
          <div className="space-y-6 pt-6 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b pb-2">Media & Fallback</h3>
            
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image {isEditing && '(Optional)'}</Label>
              <Input id="image" name="image" type="file" accept="image/*" className="cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {isEditing && initialData.image && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={initialData.image} alt="Current" className="w-10 h-10 object-cover rounded border" />
                  <span className="text-[10px] text-muted-foreground">Current Image</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Full Content (Legacy Markdown Support)</Label>
                <span className="text-[10px] text-muted-foreground italic">Use this ONLY if you are not using the structured section builder above.</span>
              </div>
              <Textarea id="content" name="content" defaultValue={initialData?.content} className="font-mono text-xs leading-relaxed" rows={10} placeholder="Markdown fallback..." />
            </div>
          </div>

          <div className="flex gap-4">
            {isEditing && (
              <Link href="/admin/blogs" className="flex-1">
                <Button type="button" variant="outline" className="w-full text-lg py-6 h-auto">
                  Cancel
                </Button>
              </Link>
            )}
            <Button type="submit" className={`flex-[2] text-lg font-bold py-6 h-auto shadow-lg ${isEditing ? 'bg-primary' : 'bg-gradient-to-r from-primary to-secondary'}`}>
              {isEditing ? 'Update Blog Post' : 'Publish Blog Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

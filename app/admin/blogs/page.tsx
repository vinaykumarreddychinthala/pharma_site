import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createBlog, deleteBlog } from '../actions'
import { Trash2, Edit } from 'lucide-react'
import { BlogForm } from './blog-form'
import Link from 'next/link'

export default async function AdminBlogsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ edit?: string }> 
}) {
  try {
    const { edit: editId } = await searchParams
    const supabase = await createClient()
    
    // Fetch all blogs
    const { data: blogs, error: fetchError } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })

    if (fetchError) {
      throw new Error(`Database Error: ${fetchError.message}`)
    }

    // Fetch blog to edit if requested
    let editingBlog = null
    if (editId) {
      const { data } = await supabase.from('blogs').select('*').eq('id', editId).single()
      editingBlog = data
    }

    return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
        <p className="text-muted-foreground mt-2">Publish professional health insights and articles.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Form to Add/Edit Blog */}
        <div className="md:col-span-5">
          <BlogForm initialData={editingBlog} />
        </div>

        {/* List of Blogs */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Published Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <div key={blog.id} className="flex items-start justify-between p-4 border border-border rounded-lg bg-muted/20">
                      <div>
                        <p className="font-bold text-lg">{blog.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{blog.excerpt}</p>
                        <div className="text-xs text-muted-foreground mt-2 flex gap-3">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span className="font-semibold text-primary">{blog.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4 shrink-0">
                        <Link href={`/admin/blogs?edit=${blog.id}`}>
                          <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/5">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteBlog(blog.id)
                        }}>
                          <Button type="submit" variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8 border border-dashed rounded-lg">No posts found. Migrate data or write a new one.</p>
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
        <p className="text-sm opacity-80">{error?.message || "An unexpected error occurred while loading the blogs."}</p>
        <p className="mt-4 text-xs opacity-50 font-mono">Check your Vercel logs or environment variables for details.</p>
      </div>
    )
  }
}

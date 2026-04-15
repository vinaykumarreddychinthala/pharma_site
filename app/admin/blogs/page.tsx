import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createBlog, deleteBlog } from '../actions'
import { Trash2 } from 'lucide-react'

export default async function AdminBlogsPage() {
  const supabase = await createClient()
  const { data: blogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
        <p className="text-muted-foreground mt-2">Publish professional health insights and articles.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Form to Add Blog */}
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Write New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createBlog} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input id="title" name="title" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt (Short Summary)</Label>
                  <Textarea id="excerpt" name="excerpt" required className="resize-none" rows={2}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" defaultValue="Believe Pharma Team" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" placeholder="e.g. ED Treatment" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Full Content (Markdown supported)</Label>
                  <Textarea id="content" name="content" className="font-mono text-sm" rows={12} required />
                </div>

                <Button type="submit" className="w-full">Publish Post</Button>
              </form>
            </CardContent>
          </Card>
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
                      <form action={async () => {
                        'use server'
                        await deleteBlog(blog.id)
                      }}>
                        <Button type="submit" variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-4 shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
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
}

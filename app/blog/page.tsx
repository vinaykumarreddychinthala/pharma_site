import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Calendar, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Health Blog - Believe Pharma',
  description: 'Latest health tips, medical news, and wellness advice from Believe Pharma experts.',
}

export const revalidate = 0

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: blogPosts } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  
  // Fallback if empty array before migration
  const posts = blogPosts || []

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 text-center relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -mr-32 -mt-32 mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl -ml-32 -mb-32 mix-blend-screen"></div>
          <div className="relative max-w-4xl mx-auto px-4 z-10">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-md rounded-full text-primary-foreground/90 font-medium tracking-wider text-sm mb-6 uppercase">
              Insights & News
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-6 tracking-tight drop-shadow-sm">
              The Health Journal
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed">
              Read our latest articles on health, wellness, and medical science curated by industry experts.
            </p>
          </div>
        </section>

        {/* Text-only Blog Posts */}
        <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col z-10 overflow-hidden">
                  
                  {/* Featured Image */}
                  {post.image ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute bottom-4 left-6 inline-flex items-center px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  ) : (
                    <div className="h-4 bg-primary/5"></div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    {!post.image && (
                      <div className="flex items-center justify-between mb-6">
                        <span className="inline-flex items-center px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.date}
                        </span>
                      </div>
                    )}
                    
                    {post.image && (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-4">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </div>
                    )}

                    <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                     <span className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20">
                          <UserIcon className="h-4 w-4" />
                        </div>
                        {post.author}
                      </span>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="rounded-full hover:bg-primary hover:text-primary-foreground group/btn transition-all px-6">
                        Read Story
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

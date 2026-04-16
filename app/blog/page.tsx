import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArrowRight, Calendar, User as UserIcon, Pill } from 'lucide-react'
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
                  
                  {/* Featured Image or Placeholder */}
                  {post.image ? (
                    <div className="relative h-56 w-full overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute bottom-4 left-6 inline-flex items-center px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  ) : (
                    <div className="relative h-56 w-full bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent scale-150 animate-pulse"></div>
                      <Pill className="h-16 w-16 text-primary/20 rotate-12" />
                      <span className="absolute bottom-4 left-6 inline-flex items-center px-4 py-1.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/70 mb-4 uppercase tracking-widest">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3 text-sm font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-8 py-6 border-t border-border/50 bg-muted/5 group-hover:bg-muted/10 transition-colors">
                     <span className="flex items-center gap-2.5 text-sm font-bold text-foreground/70">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                          <UserIcon className="h-4.5 w-4.5" />
                        </div>
                        {post.author}
                      </span>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="rounded-full hover:bg-primary hover:text-primary-foreground group/btn transition-all px-5 py-2 h-auto text-xs font-bold uppercase tracking-wider">
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

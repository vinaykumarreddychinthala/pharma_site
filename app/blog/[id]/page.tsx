import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, User as UserIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()


  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb / Back Navigation */}
        <div className="bg-muted/30 py-4 border-b border-border/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Health Journal
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <header className="mb-14 text-center pb-14 border-b border-border/50">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20">
                  <UserIcon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground/80">{post.author}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('**')) {
                 const titleMatch = paragraph.match(/\*\*(.*?)\*\*/);
                 if (titleMatch) {
                    const title = titleMatch[1];
                    const rest = paragraph.replace(/\*\*(.*?)\*\*/, '');
                    return (
                      <div key={index} className="mb-10">
                         <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
                         {rest.trim() && (
                           <p className="text-muted-foreground leading-relaxed text-lg tracking-wide">{rest.trim()}</p>
                         )}
                      </div>
                    )
                 }
              }

              if (paragraph.trim().startsWith('- **')) {
                const parts = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc pl-6 mb-10 space-y-4 text-lg">
                    {parts.map((part, i) => {
                      if (!part.trim()) return null;
                      const match = part.match(/- \*\*(.*?)\*\*(.*)/);
                      if (match) {
                        return (
                          <li key={i} className="text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">{match[1]}</strong>{match[2]}
                          </li>
                        )
                      }
                      return <li key={i} className="text-muted-foreground leading-relaxed">{part.replace('- ', '')}</li>
                    })}
                  </ul>
                )
              }
              
              if (paragraph.trim().match(/^\d+\.\s\*\*/)) {
                const parts = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal pl-6 mb-10 space-y-4 text-lg">
                    {parts.map((part, i) => {
                       if (!part.trim()) return null;
                       const match = part.match(/^\d+\.\s\*\*(.*?)\*\*(.*)/);
                       if (match) {
                         return (
                           <li key={i} className="text-muted-foreground leading-relaxed">
                             <strong className="text-foreground">{match[1]}</strong>{match[2]}
                           </li>
                         )
                       }
                       return <li key={i} className="text-muted-foreground leading-relaxed">{part.replace(/^\d+\.\s/, '')}</li>
                    })}
                  </ol>
                )
              }

              if (!paragraph.trim()) return null;

              return (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg tracking-wide mb-10">
                  {paragraph.trim()}
                </p>
              )
            })}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

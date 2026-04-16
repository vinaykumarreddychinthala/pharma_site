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
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary border border-primary/20">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-foreground/80">By {post.author}</span>
                  {post.reviewed_by && (
                    <span className="text-xs text-primary/80 font-medium">Reviewed by {post.reviewed_by}</span>
                  )}
                </div>
              </div>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border"></span>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-border/50">
              <img src={post.image} alt={post.title} className="w-full h-auto max-h-[600px] object-cover" />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-3xl mx-auto space-y-12 pb-16">
            
            {post.intro && (
              <p className="text-xl font-medium text-foreground/90 leading-relaxed border-l-4 border-primary pl-6">
                {post.intro}
              </p>
            )}

            {post.sections && post.sections.length > 0 && (
              <div className="space-y-10">
                {post.sections.map((sec: any, i: number) => (
                  <div key={`sec-${i}`}>
                    {sec.heading && <h3 className="text-2xl font-bold text-foreground mb-4">{sec.heading}</h3>}
                    <div className="text-muted-foreground leading-relaxed text-lg tracking-wide whitespace-pre-wrap">{sec.content}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Fallback Legacy Markdown if it exists and sections don't (or as additional content) */}
            {post.content && (!post.sections || post.sections.length === 0) && (
              <div className="space-y-10">
                {post.content.split(/\n\n+/).map((paragraph: string, index: number) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith('**')) {
                    const titleMatch = trimmed.match(/^\*\*(.*?)\*\*(.*)/s);
                    if (titleMatch) {
                      return (
                        <div key={index}>
                          <h3 className="text-2xl font-bold text-foreground mb-4">{titleMatch[1]}</h3>
                          {titleMatch[2].trim() && (
                            <p className="text-muted-foreground leading-relaxed text-lg tracking-wide whitespace-pre-wrap">{titleMatch[2].trim()}</p>
                          )}
                        </div>
                      );
                    }
                  }

                  if (trimmed.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-4 text-lg">
                        {trimmed.split('\n').map((part, i) => {
                          if (!part.trim()) return null;
                          const match = part.match(/^- (.*)/);
                          return <li key={i} className="text-muted-foreground leading-relaxed">{match ? match[1] : part}</li>;
                        })}
                      </ul>
                    );
                  }

                  if (trimmed.match(/^\d+\.\s/)) {
                    return (
                      <ol key={index} className="list-decimal pl-6 space-y-4 text-lg">
                        {trimmed.split('\n').map((part, i) => {
                           if (!part.trim()) return null;
                           const match = part.match(/^\d+\.\s(.*)/);
                           return <li key={i} className="text-muted-foreground leading-relaxed">{match ? match[1] : part}</li>;
                        })}
                      </ol>
                    );
                  }

                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed text-lg tracking-wide whitespace-pre-wrap">
                      {trimmed}
                    </p>
                  )
                })}
              </div>
            )}

            {post.conclusion && (
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 mt-12">
                <h3 className="text-xl font-bold text-foreground mb-3">Final Thoughts</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{post.conclusion}</p>
              </div>
            )}

            {post.faq && post.faq.length > 0 && (
              <div className="mt-16 bg-muted/20 p-8 rounded-3xl border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6 lg:space-y-8">
                  {post.faq.map((item: any, i: number) => (
                    <div key={`faq-${i}`} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                      <h4 className="font-bold text-lg text-foreground mb-2 flex gap-3"><span className="text-primary font-black">Q:</span> {item.question}</h4>
                      <p className="text-muted-foreground pl-6"><span className="text-foreground font-semibold mr-1">A:</span> {item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

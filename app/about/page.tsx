import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShieldCheck, Globe, Heart, TrendingUp, Star, Zap, Users } from 'lucide-react'

export const metadata = {
  title: 'About Us - Believe Pharma',
  description: 'Learn about Believe Pharma — a US-based wellness company dedicated to helping individuals rediscover confidence, connection, and fulfillment.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary py-28 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -mr-32 -mt-32 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl -ml-32 -mb-32 mix-blend-screen" />
          <div className="relative max-w-4xl mx-auto px-4 z-10">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-md rounded-full text-primary-foreground/80 font-medium tracking-wider text-sm mb-6 uppercase">
              US-Based Wellness Company
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-primary-foreground mb-6 tracking-tight drop-shadow-sm">
              About Believe Pharma
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed">
              Helping individuals rediscover confidence, connection, and fulfillment — one life-changing solution at a time.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-5">
                  Who We Are
                </span>
                <h2 className="text-4xl font-black text-foreground mb-6 leading-tight">
                  A Trusted Name in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Wellness & Performance</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                  At Believe Pharma, we are a US-based wellness company dedicated to helping individuals rediscover confidence, connection, and fulfillment in their personal lives.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We specialize in sourcing and delivering high-quality wellness and performance solutions from trusted manufacturers around the world — ensuring that every product meets our standards of effectiveness, safety, and reliability.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                  <img
                    src="/pharma_logo.png"
                    alt="Believe Pharma"
                    className="relative h-80 w-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-gradient-to-br from-muted/40 to-muted/10 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div className="text-4xl font-black text-foreground mb-1">40,000+</div>
                <div className="font-bold text-foreground mb-2">Happy Clients</div>
                <p className="text-sm text-muted-foreground">Trusted by thousands of customers worldwide</p>
              </div>
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <div className="text-4xl font-black text-foreground mb-1">25,000+</div>
                <div className="font-bold text-foreground mb-2">Orders Shipped</div>
                <p className="text-sm text-muted-foreground">Successfully delivered worldwide</p>
              </div>
              <div className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Star className="h-7 w-7 text-primary" />
                </div>
                <div className="text-4xl font-black text-foreground mb-1">Growing</div>
                <div className="font-bold text-foreground mb-2">Community</div>
                <p className="text-sm text-muted-foreground">Focused on wellness and confidence</p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do & Vision */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-card rounded-3xl p-10 border border-border shadow-sm hover:border-primary/30 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">What We Do</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We import carefully selected products globally to bring you the best solutions for performance, confidence, and relationship wellness — all in one place.
                </p>
                <p className="text-lg font-bold text-foreground">Our mission is simple:</p>
                <p className="text-primary font-bold text-lg mt-1">
                  To help people feel better, perform better, and live better.
                </p>
              </div>
              <div className="bg-card rounded-3xl p-10 border border-border shadow-sm hover:border-primary/30 transition-all">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  We believe that true happiness comes from strong connections, confidence, and inner satisfaction. That's why we focus on:
                </p>
                <ul className="space-y-3">
                  {[
                    'Enhancing personal confidence',
                    'Supporting relationship wellness',
                    'Helping couples reconnect and enjoy meaningful moments together',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-5">
                Why Choose Us
              </span>
              <h2 className="text-4xl font-black text-foreground mb-4">Built on Trust. Driven by Results.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                At Believe Pharma, we don't just sell products — we provide solutions that help you unlock your confidence, strengthen your relationships, and experience life with more energy and satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Globe, title: 'Global Sourcing', desc: 'Premium quality products sourced from trusted manufacturers worldwide.' },
                { icon: Users, title: 'Trusted by Thousands', desc: 'Over 40,000 happy clients have placed their confidence in us.' },
                { icon: Zap, title: 'Real Results', desc: 'Our focus is on delivering genuine, impactful outcomes — not just products.' },
                { icon: ShieldCheck, title: '100% Discreet', desc: 'Secure packaging, confidential service, and reliable customer support.' },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise Banner */}
        <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-black text-primary-foreground mb-6 leading-tight">
              Our Promise to You
            </h2>
            <p className="text-primary-foreground/90 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              We are constantly working to bring new and improved solutions that help you feel confident, stay connected, and enjoy life to the fullest.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {[
                'Feel Confident',
                'Stay Connected',
                'Enjoy Life to the Fullest',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-foreground/20">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  <span className="text-primary-foreground font-bold">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-primary-foreground/80 text-lg italic font-medium">
              "Because when confidence meets connection — life feels complete."
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Truck, Pill, Clock } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'

export const metadata = {
  title: 'Believe Pharma - Quality Medicines Online',
  description: 'Discover trusted pharmaceutical products with fast delivery and competitive prices',
}

export default function Home() {
  const featuredProducts = getFeaturedProducts(6)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/95 via-primary/80 to-secondary/90 py-24 md:py-40 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/30 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Trusted by 50,000+ Happy Customers
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight tracking-tight">
                  Your <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">Health</span> is Our Priority
                </h1>
                <p className="text-lg text-primary-foreground/95 mb-8 leading-relaxed">
                  Access quality medicines with expert guidance, fast delivery, and unbeatable prices. Your wellness journey starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/products" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-transparent rounded-3xl blur-2xl"></div>
                <img
                  src="/logo.png"
                  alt="Believe Pharma"
                  className="h-80 w-auto drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Why Choose Believe Pharma?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We're committed to delivering quality, trust, and convenience in every order</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground text-center group-hover:text-primary transition-colors">100% Authentic</h3>
                <p className="text-sm text-muted-foreground text-center">
                  All products genuine and sourced directly from licensed manufacturers
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full">
                    <Truck className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground text-center group-hover:text-primary transition-colors">24-48hr Delivery</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Quick and reliable delivery straight to your home
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full">
                    <Pill className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground text-center group-hover:text-primary transition-colors">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Licensed pharmacists available for free consultation
                </p>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-full">
                    <Clock className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground text-center group-hover:text-primary transition-colors">24/7 Support</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Round-the-clock customer care for your peace of mind
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Our most trusted and popular medicines</p>
              </div>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-r from-primary via-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 -right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Access premium quality medicines with expert pharmacist guidance, lightning-fast delivery, and exclusive discounts. Your health deserves the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

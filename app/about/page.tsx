import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">About Believe Pharma</h1>
            <p className="text-lg text-primary-foreground/90">
              Your trusted partner in healthcare for quality medicines and wellness products
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At Believe Pharma, our mission is to make quality healthcare products accessible to everyone. We believe that everyone deserves access to genuine medicines at competitive prices.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to providing exceptional service, expert guidance, and fast delivery to ensure your health and wellness needs are met with utmost care.
                </p>
              </div>
              <div>
                <img
                  src="/logo.png"
                  alt="Believe Pharma"
                  className="h-80 w-auto mx-auto drop-shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">100+</h3>
                <p className="text-foreground font-semibold mb-2">Products</p>
                <p className="text-sm text-muted-foreground">Quality medicines and health products available</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">50K+</h3>
                <p className="text-foreground font-semibold mb-2">Happy Customers</p>
                <p className="text-sm text-muted-foreground">Trusted by thousands across the country</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">24/7</h3>
                <p className="text-foreground font-semibold mb-2">Customer Support</p>
                <p className="text-sm text-muted-foreground">Always here to help you anytime</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

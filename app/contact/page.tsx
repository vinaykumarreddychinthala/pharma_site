import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Contact Us - Believe Pharma',
  description: 'Get in touch with Believe Pharma for any inquiries, support, or feedback.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Dynamic Wave Hero Section */}
        <section className="bg-gradient-to-br from-primary/95 via-primary to-secondary/95 pt-28 pb-40 text-center relative overflow-hidden">
          {/* Glassmorphism spheres */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 backdrop-blur-3xl rounded-full shadow-2xl skew-x-12 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/30 backdrop-blur-3xl rounded-full shadow-2xl -skew-y-12"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-primary-foreground/5 rounded-full blur-[100px] mix-blend-overlay"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 z-10 flex flex-col items-center">
            <div className="p-3 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              Let's Connect
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              We're here to provide you with the best support. Drop us a message anytime.
            </p>
          </div>

          {/* Curved shape divider */}
          <div className="absolute bottom-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,93.42,103.11,66.1,155,52.26,208.57,37.94,263.29,67.21,321.39,56.44Z" className="fill-background"></path>
            </svg>
          </div>
        </section>

        {/* Contact Content Area - Pulled up to overlap hero */}
        <section className="-mt-32 pb-24 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              
              {/* Premium Contact Form - Takes 3 columns */}
              <div className="lg:col-span-3">
                <div className="bg-card/70 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Send a Message</h2>
                    <p className="text-muted-foreground mt-2 text-sm">Fill out the form below and we'll get back to you immediately.</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 relative group">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest pl-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full flex h-14 rounded-xl border border-input/50 bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent group-hover:border-primary/50 shadow-sm" 
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2 relative group">
                        <label className="text-xs font-bold text-foreground uppercase tracking-widest pl-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full flex h-14 rounded-xl border border-input/50 bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent group-hover:border-primary/50 shadow-sm" 
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest pl-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full flex h-14 rounded-xl border border-input/50 bg-background/50 px-4 py-2 text-sm placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent group-hover:border-primary/50 shadow-sm" 
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2 relative group">
                      <label className="text-xs font-bold text-foreground uppercase tracking-widest pl-1">Message</label>
                      <textarea 
                        className="w-full flex min-h-[160px] rounded-xl border border-input/50 bg-background/50 px-4 py-4 text-sm placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent group-hover:border-primary/50 shadow-sm resize-none" 
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <Button type="button" className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300" size="lg">
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Side Information Cards - Takes 2 columns */}
              <div className="lg:col-span-2 space-y-6 mt-12 lg:mt-0">
                {/* Info Card 1 */}
                <div className="group bg-gradient-to-br from-card to-card border border-border p-8 rounded-3xl hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Our Location</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        123 Health Street<br />
                        Medical City Plaza<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Card 2 */}
                <div className="group bg-gradient-to-br from-card to-card border border-border p-8 rounded-3xl hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Contact Details</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                        <strong className="text-foreground">Phone:</strong> +1 (800) 123-4567
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong className="text-foreground">Email:</strong> info@believepharma.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Card 3 */}
                <div className="group bg-gradient-to-br from-card to-card border border-border p-8 rounded-3xl hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2">Working Hours</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-1">
                        <strong className="text-foreground">Mon - Fri:</strong> 8:00 AM - 8:00 PM
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong className="text-foreground">Weekend:</strong> 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

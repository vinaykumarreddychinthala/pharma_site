import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full -ml-40 -mb-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl md:text-2xl">Believe Pharma</h3>
            <p className="text-sm opacity-95 leading-relaxed">
              Your trusted healthcare partner delivering quality medicines with excellence and reliability.
            </p>
            <img src="/pharma_logo.png" alt="Believe Pharma" className="h-16 w-auto hover:scale-105 transition-transform" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block">
                  → All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block">
                  → About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block">
                  → Health Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-base mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block">
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm opacity-90 hover:opacity-100 hover:translate-x-1 transition-all inline-block">
                  → Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-sm">
                  <p className="font-semibold">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-sm">
                  <p className="font-semibold">support@believepharma.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-sm">
                  <p className="font-semibold">123 Health Street<br />Medical City, MC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm opacity-90">
              © 2024 Believe Pharma. All rights reserved. | Made with care for your health
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

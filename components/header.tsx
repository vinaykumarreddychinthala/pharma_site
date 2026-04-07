'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'

export function Header() {
  const { cart, wishlist } = useCart()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-card to-card/95 border-b border-primary/10 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Believe Pharma" className="h-12 md:h-14 w-auto" />
            <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
              Believe Pharma
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/wishlist" className="relative p-2 text-foreground hover:text-primary transition-colors group">
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart">
              <Button className="relative bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

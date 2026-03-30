'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-3xl font-bold mb-2 text-foreground">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">Save your favorite medicines for later</p>
              <Link href="/products">
                <Button size="lg">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
            <p className="mt-2 text-primary-foreground/90">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
        </section>

        {/* Wishlist Items */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:translate-y-[-4px]">
                  <Link href={`/products/${item.id}`}>
                    <div className="relative h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2 text-foreground">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(item.id)}
                        variant="outline"
                        size="sm"
                        className="px-4 font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/products">
              <Button variant="outline" className="mt-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

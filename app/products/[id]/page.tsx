'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { getProductById } from '@/lib/products'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-foreground">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/products" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-96">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold mb-4 text-foreground">
                  {product.name}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-semibold">In Stock ({product.stock} available)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8 p-4 bg-muted/30 rounded-lg space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">About this product</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.fullDescription || product.description}
                    </p>
                  </div>
                  {product.tabletsCount !== undefined && product.tabletsCount > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-1">Quantity Details</h3>
                      <p className="text-muted-foreground">Contains {product.tabletsCount} tablets per package.</p>
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="flex items-center gap-4 mb-8">
                    <label className="font-semibold text-foreground">Quantity:</label>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 font-semibold text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    size="lg"
                    className="flex-1"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleWishlist}
                    variant={inWishlist ? 'default' : 'outline'}
                    size="lg"
                    className="px-8"
                  >
                    <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Free Shipping</h4>
                      <p className="text-sm text-muted-foreground">On orders above ₹500</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Easy Returns</h4>
                      <p className="text-sm text-muted-foreground">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="py-12 bg-muted/10 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8 text-foreground">Customer Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold text-foreground">{review.user}</div>
                        <div className="text-xs text-muted-foreground mt-1">{review.date}</div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Heart 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

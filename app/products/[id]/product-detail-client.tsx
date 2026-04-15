'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, DollarSign, Lock, Truck, CheckCircle, Clock, Zap, Package } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { ProductPack } from '@/lib/products'
import Link from 'next/link'
import { Product } from '@/lib/products'

export function ProductDetailClient({ product }: { product: Product }) {
  
  const [quantity, setQuantity] = useState(1)
  const [packQuantities, setPackQuantities] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products">
              <Button size="lg" className="rounded-full shadow-md font-semibold">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const isOutOfStock = product.stock === 0

  const handleBaseAddToCart = () => {
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

  const handlePackAddToCart = (pack: ProductPack) => {
    const qty = packQuantities[pack.size] || 1
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: `${product.id}-${pack.size}`,
        name: `${product.name} (${pack.size})`,
        price: pack.price,
        image: product.image,
      })
    }
    setPackQuantities(prev => ({ ...prev, [pack.size]: 1 }))
  }

  const updatePackQuantity = (packSize: string, change: number) => {
    setPackQuantities(prev => {
      const current = prev[packSize] || 1
      return {
        ...prev,
        [packSize]: Math.max(1, current + change)
      }
    })
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
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/20 py-3 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>

        {/* Product Highlights Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Image */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden p-8 flex items-center justify-center min-h-[400px] relative">
                  {isOutOfStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                      Out of Stock
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full max-w-[300px] h-auto object-contain hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
                  />
                </div>
              </div>

              {/* Right Column: Key Details & Purchasing */}
              <div className="lg:col-span-7">
                {/* Meta & Title */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    {isOutOfStock && (
                      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider">
                        Currently Unavailable
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Benefits (if available) */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="mb-6 bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-foreground">Key Benefits</h3>
                    </div>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Effects & Timing (if available) */}
                {product.effectsTiming && (
                  <div className="mb-6 bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-foreground mb-1">Effects & Timing</h3>
                        <p className="text-sm text-muted-foreground">{product.effectsTiming}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guarantees Box */}
                <div className="space-y-3 mb-8 bg-card p-5 rounded-2xl border border-border shadow-sm">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0"/>
                    <span className="text-sm font-semibold">Genuine products guarantee</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <DollarSign className="h-5 w-5 text-primary flex-shrink-0"/>
                    <span className="text-sm font-semibold">Best price in market</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0"/>
                    <span className="text-sm font-semibold">100% discreet & private packaging</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Truck className="h-5 w-5 text-primary flex-shrink-0"/>
                    <span className="text-sm font-semibold">Fast, secure worldwide delivery</span>
                  </div>
                </div>

                {/* Pack Selection Table */}
                {product.packs && product.packs.length > 0 ? (
                  <div className="mb-6">
                    <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                      <div className="bg-muted/30 p-4 border-b border-border text-center">
                        <h3 className="font-bold text-foreground text-lg">Available Options & Pricing</h3>
                      </div>
                      
                      <div className="divide-y divide-border/50">
                        {/* Table Header */}
                        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                          <div className="col-span-4 pl-2">Option</div>
                          <div className="col-span-3 text-center">Price (USD)</div>
                          <div className="col-span-2 text-center">Qty</div>
                          <div className="col-span-3 text-center">Action</div>
                        </div>

                        {product.packs.map((pack, i) => (
                          <div key={i} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center p-4 hover:bg-muted/10 transition-colors">
                            <div className="sm:col-span-4 w-full text-center sm:text-left pl-0 sm:pl-2">
                              <span className="font-bold text-foreground text-sm">{pack.size}</span>
                            </div>
                            
                            <div className="sm:col-span-3 text-center w-full">
                              <div className="font-bold text-lg text-foreground">${pack.price}</div>
                            </div>
                            
                            <div className="sm:col-span-2 flex justify-center w-full">
                              <div className="flex items-center border border-border rounded-lg bg-background">
                                <button
                                  onClick={() => updatePackQuantity(pack.size, -1)}
                                  disabled={isOutOfStock}
                                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors rounded-l-lg disabled:opacity-40"
                                >
                                  −
                                </button>
                                <span className="w-8 text-center text-sm font-semibold text-foreground">
                                  {packQuantities[pack.size] || 1}
                                </span>
                                <button
                                  onClick={() => updatePackQuantity(pack.size, 1)}
                                  disabled={isOutOfStock}
                                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors rounded-r-lg disabled:opacity-40"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="sm:col-span-3 w-full flex justify-center">
                              <Button 
                                onClick={() => handlePackAddToCart(pack)} 
                                size="sm"
                                disabled={isOutOfStock}
                                className="w-full sm:w-auto bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all rounded-full"
                              >
                                <ShoppingCart className="h-4 w-4 mr-1.5" />
                                {isOutOfStock ? 'Out of Stock' : 'Add'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Fallback single quantity */
                  <div className="mb-8 p-6 bg-card rounded-3xl border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <div className="text-3xl font-black text-foreground mb-1">${product.price.toFixed(2)}</div>
                      <div className={isOutOfStock ? "text-red-500 font-semibold text-sm" : "text-green-600 font-semibold text-sm"}>
                        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                      </div>
                    </div>
                    
                    {!isOutOfStock && (
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center border border-border rounded-lg bg-background h-12">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-full text-foreground hover:bg-muted transition-colors rounded-l-lg"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-bold text-foreground">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            className="w-12 h-full text-foreground hover:bg-muted transition-colors rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                        <Button
                          onClick={handleBaseAddToCart}
                          size="lg"
                          className="flex-1 sm:flex-none h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg"
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Shipping Options */}
                {product.shippingOptions && product.shippingOptions.length > 0 && (
                  <div className="mb-6 bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-foreground">Shipping Options</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {product.shippingOptions.map((option, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                          <span className="text-sm font-semibold text-foreground">{option.quantity}</span>
                          <span className="text-sm font-bold text-primary">${option.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bulk Order Banner */}
                <div className="mb-8 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-foreground font-bold text-lg mb-1">Want to order in bulk / B2B price?</p>
                    <p className="text-muted-foreground text-sm">Contact our sales team for special partner rates.</p>
                  </div>
                  <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-md hover:shadow-lg rounded-full shrink-0">
                    Send Inquiry
                  </Button>
                </div>

                {/* Wishlist Action */}
                <Button
                  onClick={handleWishlist}
                  variant={inWishlist ? 'default' : 'outline'}
                  size="lg"
                  className="w-full lg:w-auto rounded-full font-bold group"
                >
                  <Heart className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-current' : 'group-hover:fill-current'} transition-all`} />
                  {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Details & Reviews Tabs */}
        <section className="py-12 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Tab Headers */}
            <div className="flex justify-center border-b border-border/50 mb-10 w-full overflow-x-auto">
              <div className="flex w-full justify-start md:justify-center">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 md:flex-none text-center px-8 py-4 font-bold text-lg transition-all border-b-2 whitespace-nowrap ${
                    activeTab === 'description' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 md:flex-none text-center px-8 py-4 font-bold text-lg transition-all border-b-2 whitespace-nowrap flex items-center justify-center gap-2 ${
                    activeTab === 'reviews' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  Reviews 
                  {product.reviews && product.reviews.length > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{product.reviews.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[400px]">
              
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {product.lastUpdated && (
                    <div className="text-sm font-medium text-muted-foreground mb-5">
                      Last Updated on <span className="font-bold text-foreground">{product.lastUpdated}</span>
                    </div>
                  )}

                  {(product.writtenBy || product.medicallyReviewedBy) && (
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                      {product.writtenBy && (
                        <div className="flex items-center gap-2 px-5 py-3 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800/50">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0" />
                          <span className="text-sm">Written by <strong className="font-bold">{product.writtenBy}</strong></span>
                        </div>
                      )}
                      {product.medicallyReviewedBy && (
                        <div className="flex items-center gap-2 px-5 py-3 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800/50">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0" />
                          <span className="text-sm">Medically Reviewed by <strong className="font-bold">{product.medicallyReviewedBy}</strong></span>
                        </div>
                      )}
                    </div>
                  )}

                  <h2 className="text-3xl font-black text-foreground mb-6 leading-tight">
                    What Is {product.name}?
                    <span className="block text-xl font-bold text-muted-foreground mt-2">— About {product.name}</span>
                  </h2>

                  <div className="prose prose-lg dark:prose-invert prose-primary max-w-none text-muted-foreground">
                    <p className="leading-relaxed mb-6 font-medium text-foreground">
                      {product.fullDescription || product.description}
                    </p>
                  </div>

                  {/* How to Use */}
                  {product.howToUse && product.howToUse.length > 0 && (
                    <div className="mt-8 p-6 bg-muted/20 rounded-2xl border border-border">
                      <h3 className="font-bold text-foreground text-xl mb-4">📝 How to Use</h3>
                      <ol className="space-y-3">
                        {product.howToUse.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="mt-6">
                    <p className="leading-relaxed text-muted-foreground">
                      We ensure that every batch meets rigorous quality standards before reaching you. Whether you're managing performance needs or exploring new experiences, you can rely on the quality and safety of {product.name}.
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="bg-background border border-border p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
                          <div className="flex justify-between items-start mb-4 gap-4">
                            <div>
                              <div className="font-bold text-foreground text-lg mb-1">{review.user}</div>
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{review.date}</div>
                            </div>
                            <div className="flex gap-1 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                              {[...Array(5)].map((_, i) => (
                                <Heart 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-foreground/80 leading-relaxed text-lg">"{review.text}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border border-dashed">
                      <p className="text-muted-foreground text-lg mb-4">There are no reviews for this product yet.</p>
                      <Button variant="outline" className="rounded-full font-semibold">Write the first review</Button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

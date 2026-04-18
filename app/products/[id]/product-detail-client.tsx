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

  const displayPacks = (product?.packs || []) as ProductPack[];
  const hasPacks = displayPacks.length > 0;

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
        pillsCount: 0,
      })
    }
    setQuantity(1)
  }

  const handlePackAddToCart = (pack: ProductPack) => {
    const packKey = `${pack.size}-${pack.pills || ''}`
    const qty = packQuantities[packKey] || 1

    const currentPackPriceRaw = pack.price || 0;
    const currentPackPriceNum = typeof currentPackPriceRaw === 'number'
      ? currentPackPriceRaw
      : parseFloat(String(currentPackPriceRaw).replace(/[^0-9.]/g, '')) || 0;

    const pillsRaw = pack.pills || '';
    const pillsNum = parseInt(pillsRaw.replace(/[^0-9]/g, '')) || 0;

    for (let i = 0; i < qty; i++) {
      addToCart({
        id: `${product.id}-${pack.size}-${pack.pills || ''}`.replace(/\s+/g, '-'),
        name: `${product.name} - ${pack.size} ${pack.pills ? `(${pack.pills})` : ''}`.trim(),
        price: currentPackPriceNum,
        image: product.image,
        pillsCount: pillsNum,
      })
    }
    setPackQuantities(prev => ({ ...prev, [packKey]: 1 }))
  }

  const updatePackQuantity = (packKey: string, change: number) => {
    setPackQuantities(prev => {
      const current = prev[packKey] || 1
      return {
        ...prev,
        [packKey]: Math.max(1, current + change)
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

        {/* Main Product Content */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Column: Product Image */}
              <div className="lg:col-span-5">
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

              {/* Right Column: Scrollable Content */}
              <div className="lg:col-span-7 space-y-12">

                {/* 1. Key Details & Purchasing */}
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
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
                      {product.title || product.name}
                    </h1>

                    {product.composition && (product.composition.activeIngredient || product.composition.drugClass) && (
                      <div className="flex flex-wrap gap-3 mb-6">
                        {product.composition.activeIngredient && (
                          <div className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-md bg-muted/40 text-muted-foreground border border-border">
                            <span className="opacity-70 mr-1">Active Ingredient:</span> {product.composition.activeIngredient}
                          </div>
                        )}
                        {product.composition.drugClass && (
                          <div className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-md bg-muted/40 text-muted-foreground border border-border">
                            <span className="opacity-70 mr-1">Class:</span> {product.composition.drugClass}
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {product.overview || product.description}
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
                      <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">Genuine products guarantee</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">Best price in market</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">100% discreet & private packaging</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold">Fast, secure worldwide delivery</span>
                    </div>
                  </div>

                  {hasPacks ? (
                    <div className="mb-6">
                      <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                        <div className="bg-muted/30 p-4 border-b border-border text-center">
                          <h3 className="font-bold text-foreground text-lg">Available Options & Pricing</h3>
                        </div>

                        <div className="divide-y divide-border/50">
                          {/* Table Header */}
                          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                            <div className="col-span-4 pl-2">Size & Quantity</div>
                            <div className="col-span-3 text-center">Price</div>
                            <div className="col-span-2 text-center">Qty</div>
                            <div className="col-span-3 text-center">Action</div>
                          </div>

                          {displayPacks.map((pack, i) => {
                            const packKey = `${pack.size}-${pack.pills || ''}`;
                            return (
                              <div key={i} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center p-4 hover:bg-muted/10 transition-colors border-l-4 border-transparent hover:border-primary">
                                <div className="sm:col-span-4 w-full text-center sm:text-left pl-0 sm:pl-2">
                                  <span className="font-bold text-foreground text-sm block leading-tight">{pack.size}</span>
                                  {pack.pills && <span className="text-xs text-muted-foreground font-semibold uppercase">{pack.pills}</span>}
                                </div>

                                <div className="sm:col-span-3 text-center w-full">
                                  <div className="font-bold text-xl text-foreground">
                                    ${typeof pack.price === 'number' ? pack.price.toFixed(2) : pack.price}
                                  </div>
                                </div>

                                <div className="sm:col-span-2 flex justify-center w-full">
                                  <div className="flex items-center border border-border rounded-lg bg-background">
                                    <button
                                      onClick={() => updatePackQuantity(packKey, -1)}
                                      disabled={isOutOfStock}
                                      className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors rounded-l-lg disabled:opacity-40"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center text-sm font-semibold text-foreground">
                                      {packQuantities[packKey] || 1}
                                    </span>
                                    <button
                                      onClick={() => updatePackQuantity(packKey, 1)}
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
                                    className="w-full sm:w-auto bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all rounded-full px-6 py-5"
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
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
                            <span className="w-12 text-center font-bold text-foreground inline-flex items-center justify-center">
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
                            className="flex-1 sm:flex-none h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all"
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {product.cta?.primary || 'Add to Cart'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shipping Options */}
                  {product.shippingInfo ? (
                    <div className="mb-6 bg-card rounded-2xl border border-border p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-foreground">Shipping Information</h3>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{product.shippingInfo}</p>
                    </div>
                  ) : (
                    product.shippingOptions && product.shippingOptions.length > 0 && (
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
                    )
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

                {/* 2. Details & Reviews Tabs */}
                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm animate-in fade-in duration-700">
                  <div className="p-1">
                    {/* Tab Headers */}
                    <div className="flex border-b border-border/50 w-full overflow-x-auto">
                      <button
                        onClick={() => setActiveTab('description')}
                        className={`flex-1 text-center py-5 font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === 'description'
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                          }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab('reviews')}
                        className={`flex-1 text-center py-5 font-bold transition-all border-b-2 whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'reviews'
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                          }`}
                        style={{ display: product.reviewsEnabled !== false ? 'flex' : 'none' }}
                      >
                        Reviews
                        {product.reviews && product.reviews.length > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{product.reviews.length}</span>
                        )}
                      </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="p-6 md:p-10 min-h-[400px]">

                      {/* Description Tab */}
                      {activeTab === 'description' && (
                        <div className="animate-in fade-in duration-500">

                          {product.lastUpdated && (
                            <div className="text-sm font-medium text-muted-foreground mb-5">
                              Last Updated on <span className="font-bold text-foreground">{product.lastUpdated}</span>
                            </div>
                          )}

                          {(product.writtenBy || product.medicallyReviewedBy) && (
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                              {product.writtenBy && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-800/30">
                                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
                                  <span className="text-xs">By <strong className="font-bold">{product.writtenBy}</strong></span>
                                </div>
                              )}
                              {product.medicallyReviewedBy && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                  <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-500 shrink-0" />
                                  <span className="text-xs">Reviewed by <strong className="font-bold">{product.medicallyReviewedBy}</strong></span>
                                </div>
                              )}
                            </div>
                          )}

                          <h2 className="text-2xl font-black text-foreground mb-6 leading-tight">
                            What Is {product.name}?
                          </h2>

                          <div className="prose prose-primary max-w-none text-muted-foreground mb-10">
                            <p className="leading-relaxed font-medium text-foreground/90">
                              {product.fullDescription || product.description}
                            </p>
                          </div>

                          <div className="space-y-8">
                            {product.howItWorks && (
                              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                                <h3 className="font-bold text-foreground text-lg mb-3">Mechanism of Action</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{product.howItWorks}</p>
                              </div>
                            )}

                            {product.uses && product.uses.length > 0 && (
                              <div>
                                <h3 className="font-bold text-foreground text-lg mb-4">Primary Uses</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {product.uses.map((use, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                      <span>{use}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {((product.howToUse && product.howToUse.length > 0) || (product.usage && product.usage.length > 0)) && (
                              <div className="p-6 bg-muted/20 rounded-2xl border border-border">
                                <h3 className="font-bold text-foreground text-lg mb-4">📝 Usage Guidelines</h3>
                                <ol className="space-y-4">
                                  {(product.usage && product.usage.length > 0 ? product.usage : (product.howToUse || [])).map((step: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                      <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </span>
                                      <span className="leading-relaxed">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Reviews Tab */}
                      {activeTab === 'reviews' && (
                        <div className="animate-in fade-in duration-500">
                          {product.reviews && product.reviews.length > 0 ? (
                            <div className="space-y-4">
                              {product.reviews.map((review) => (
                                <div key={review.id} className="bg-muted/20 border border-border/50 p-5 rounded-xl transition-all hover:bg-muted/30">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <div className="font-bold text-foreground text-sm">{review.user}</div>
                                      <div className="text-[10px] font-semibold text-muted-foreground uppercase">{review.date}</div>
                                    </div>
                                    <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <Heart
                                          key={i}
                                          className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-foreground/80 text-sm italic">"{review.text}"</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border/60">
                              <p className="text-muted-foreground text-sm mb-4">No reviews yet.</p>
                              <Button variant="outline" size="sm" className="rounded-full font-semibold">Write a review</Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Product FAQs */}
                {product.faqs && product.faqs.length > 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="mb-6">
                      <h2 className="text-2xl font-black text-foreground mb-2">FAQs</h2>
                      <p className="text-sm text-muted-foreground">Answers to common questions about {product.name}</p>
                    </div>
                    <div className="space-y-3">
                      {product.faqs.map((faq, i) => (
                        <details key={`faq-${i}`} className="group bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                          <summary className="cursor-pointer font-bold px-6 py-4 list-none flex justify-between items-center text-foreground hover:text-primary transition-colors">
                            <span className="text-sm pr-6">{faq.question}</span>
                            <span className="transition-transform duration-300 group-open:rotate-180 flex-shrink-0 text-primary text-xs">▼</span>
                          </summary>
                          <div className="px-6 pb-5 pt-2 border-t border-border mt-1">
                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

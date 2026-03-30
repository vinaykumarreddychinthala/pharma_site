'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, couponCode, applyCoupon, getSubtotal, getDiscount, getCartTotal } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [appliedMessage, setAppliedMessage] = useState('')

  const handleApplyCoupon = () => {
    applyCoupon(couponInput)
    if (couponInput) {
      setAppliedMessage('Coupon applied successfully!')
      setTimeout(() => setAppliedMessage(''), 3000)
      setCouponInput('')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-3xl font-bold mb-2 text-foreground">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">Add some medicines to get started</p>
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
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <p className="mt-2 text-primary-foreground/90">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="divide-y divide-border">
                    {cart.map((item) => (
                      <div key={item.id} className="p-6 flex gap-6 items-start hover:bg-muted/30 transition-colors">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-2xl font-bold text-primary mt-2">
                            ₹{item.price.toFixed(2)}
                          </p>

                          {/* Quantity Control */}
                          <div className="flex items-center gap-2 mt-4">
                            <label className="text-sm text-muted-foreground">Qty:</label>
                            <div className="flex items-center border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-foreground hover:bg-muted"
                              >
                                −
                              </button>
                              <span className="px-4 py-1 font-semibold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-foreground hover:bg-muted"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground mb-4">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/products">
                  <Button variant="outline" className="mt-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>

                  {/* Coupon Section */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Have a coupon code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 border border-border rounded text-foreground placeholder-muted-foreground"
                      />
                      <Button onClick={handleApplyCoupon} size="sm">
                        Apply
                      </Button>
                    </div>
                    {couponCode && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700 font-medium">
                        ✓ Code "{couponCode}" applied
                      </div>
                    )}
                    {appliedMessage && (
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                        {appliedMessage}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: SAVE10, SAVE20, HEALTH50, WELLNESS25
                    </p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>₹{getSubtotal().toFixed(2)}</span>
                    </div>

                    {couponCode && (
                      <div className="flex justify-between text-red-600 font-semibold">
                        <span>Discount ({couponCode})</span>
                        <span>-₹{getDiscount().toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between text-xl font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">₹{getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
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

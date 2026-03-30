'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, clearCart, getSubtotal, getDiscount, getCartTotal } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  })

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add items to your cart before checkout</p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-foreground">Order Placed Successfully!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been confirmed and will be delivered soon.
              </p>

              <div className="bg-white rounded-lg border border-border p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Order ID</p>
                    <p className="text-lg font-bold text-foreground">#{Math.random().toString(36).substring(7).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                    <p className="text-lg font-bold text-primary">₹{getCartTotal().toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Items</p>
                    <p className="text-lg font-bold text-foreground">{cart.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Delivery</p>
                    <p className="text-lg font-bold text-green-600">24-48 hours</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-muted-foreground">A confirmation email has been sent to your email address.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Link href="/">
                    <Button>Back to Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all fields')
      return
    }
    // Order placed
    setOrderPlaced(true)
    clearCart()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Shipping Information</h2>

                    {/* Full Name */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Mumbai"
                          className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Maharashtra"
                          className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="400001"
                          className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>India</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>₹{getSubtotal().toFixed(2)}</span>
                    </div>
                    {getDiscount() > 0 && (
                      <div className="flex justify-between text-red-600 font-semibold">
                        <span>Discount</span>
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
                </div>
              </div>
            </div>

            <Link href="/cart" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mt-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

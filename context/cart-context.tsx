'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  pillsCount: number
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

export interface CartContextType {
  cart: CartItem[]
  wishlist: WishlistItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  couponCode: string
  discountPercent: number
  applyCoupon: (code: string) => void
  getCartTotal: () => number
  getSubtotal: () => number
  getDiscount: () => number
  shippingCost: number
  setShippingCost: (cost: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const VALID_COUPONS: { [key: string]: number } = {
  'SAVE10': 10,
  'SAVE20': 20,
  'HEALTH50': 50,
  'WELLNESS25': 25,
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  
  // Calculate shipping dynamically based on pill count
  const shippingCost = cart.reduce((total, item) => total + (item.pillsCount || 0) * item.quantity, 0) >= 250 ? 35 : 27;

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedCoupon = localStorage.getItem('coupon')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedCoupon) {
      const { code, percent } = JSON.parse(savedCoupon)
      setCouponCode(code)
      setDiscountPercent(percent)
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.id === item.id)
      if (existingItem) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
    setCouponCode('')
    setDiscountPercent(0)
    localStorage.removeItem('coupon')
  }, [])

  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => w.id === item.id)
      if (exists) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const isInWishlist = useCallback((id: string) => {
    return wishlist.some((item) => item.id === id)
  }, [wishlist])

  const applyCoupon = useCallback((code: string) => {
    const upperCode = code.toUpperCase()
    if (VALID_COUPONS[upperCode]) {
      setCouponCode(upperCode)
      setDiscountPercent(VALID_COUPONS[upperCode])
      localStorage.setItem('coupon', JSON.stringify({
        code: upperCode,
        percent: VALID_COUPONS[upperCode]
      }))
    } else {
      setCouponCode('')
      setDiscountPercent(0)
    }
  }, [])

  const getSubtotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const getDiscount = useCallback(() => {
    return (getSubtotal() * discountPercent) / 100
  }, [discountPercent, getSubtotal])

  const getCartTotal = useCallback(() => {
    return getSubtotal() - getDiscount() + shippingCost
  }, [getSubtotal, getDiscount, shippingCost])

  const value: CartContextType = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    couponCode,
    discountPercent,
    applyCoupon,
    getCartTotal,
    getSubtotal,
    getDiscount,
    shippingCost,
    setShippingCost: () => {}, // No-op, now automatic
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

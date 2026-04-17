'use client'

import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  packs?: any[]
  dosage?: any[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:translate-y-[-4px]">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 bg-gradient-to-br from-primary to-secondary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2 text-foreground">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {(product.packs && product.packs.length > 0) || (product.dosage && product.dosage.length > 0) 
              ? <span className="text-lg">Options Available</span>
              : `$${product.price}`}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold bg-red-100/50 text-red-700 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold"
            size="sm"
            asChild={(product.packs && product.packs.length > 0) || (product.dosage && product.dosage.length > 0)}
          >
            {((product.packs && product.packs.length > 0) || (product.dosage && product.dosage.length > 0)) ? (
              <Link href={`/products/${product.id}`}>
                View Details
              </Link>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            onClick={handleWishlist}
            variant={inWishlist ? 'default' : 'outline'}
            size="sm"
            className="px-4 font-semibold"
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}

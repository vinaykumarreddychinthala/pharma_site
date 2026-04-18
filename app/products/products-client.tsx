'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = ['All', 'ED Treatment', 'Sexual Wellness', 'Couples']

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = selectedCategory === 'All'
    ? initialProducts
    : initialProducts.filter((p) => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold">Our Products</h1>
            <p className="mt-2 text-primary-foreground/90">Premium performance & wellness solutions — discreetly delivered worldwide</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl border border-border mb-6 shadow-sm">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Categories</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full bg-muted/30 border-border/60 rounded-xl h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-muted/30 border-border/60 rounded-xl h-11">
                      <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="lg:col-span-3">
                {sortedProducts.length > 0 ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {sortedProducts.length} products
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products found in this category.</p>
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

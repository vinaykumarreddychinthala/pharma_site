'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

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
                <div className="bg-white p-6 rounded-lg border border-border mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'bg-muted/50 text-foreground hover:bg-muted'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'name', label: 'Name: A to Z' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                          sortBy === option.value
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'bg-muted/50 text-foreground hover:bg-muted'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
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

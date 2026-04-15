export interface ProductPack {
  size: string
  price: number
  unitPrice?: number
}

export interface ShippingOption {
  quantity: string
  price: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  fullDescription?: string
  tabletsCount?: number
  packs?: ProductPack[]
  shippingOptions?: ShippingOption[]
  howToUse?: string[]
  benefits?: string[]
  effectsTiming?: string
  lastUpdated?: string
  writtenBy?: string
  medicallyReviewedBy?: string
  reviews?: {
    id: string
    user: string
    rating: number
    text: string
    date: string
  }[]
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sildenafil (Viagra Generic)',
    description: 'Fast-acting ED treatment — improves blood flow for stronger, longer-lasting erections.',
    price: 80,
    image: '/viagra.jpeg',
    category: 'ED Treatment',
    stock: 100,
    fullDescription: 'Sildenafil is one of the most widely used and trusted treatments for erectile dysfunction. It works by improving blood flow to the penile region, helping you achieve and maintain a firm erection during sexual activity.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: 'Dr. James Carter',
    benefits: [
      'Enhances blood circulation for stronger erections',
      'Helps maintain erection during intimacy',
      'Improves overall sexual performance and confidence',
    ],
    effectsTiming: 'Starts working within 30–60 minutes. Effective for 4–6 hours. Best taken when needed before activity.',
    packs: [
      { size: '100 mg', price: 80 },
      { size: '150 mg', price: 100 },
      { size: '200 mg', price: 120 },
    ],
    shippingOptions: [
      { quantity: '100 pills', price: 27 },
      { quantity: '250 pills', price: 35 },
    ],
    howToUse: [
      'Take 1 tablet with water 30–60 minutes before activity',
      'Avoid heavy meals or alcohol before use',
      'Do not exceed recommended dosage',
    ],
    reviews: [
      { id: '1-1', user: 'Robert M.', rating: 5, text: 'Works exactly as described. Very fast acting and reliable.', date: '2025-03-10' },
      { id: '1-2', user: 'James T.', rating: 5, text: 'Best ED solution I have tried. Highly recommend.', date: '2025-02-22' },
      { id: '1-3', user: 'David K.', rating: 5, text: 'Excellent product. Discreet packaging and fast delivery.', date: '2025-01-15' },
      { id: '1-4', user: 'Michael S.', rating: 4, text: 'Really effective. Already ordered again.', date: '2024-12-20' },
      { id: '1-5', user: 'Thomas W.', rating: 5, text: 'Genuine product, great results. Very happy.', date: '2024-11-18' },
      { id: '1-6', user: 'Andrew B.', rating: 5, text: 'Quality is top notch. Feels like the real deal.', date: '2024-10-05' },
    ],
  },
  {
    id: '2',
    name: 'Tadalafil (Cialis Generic)',
    description: 'Long-lasting ED solution — up to 36 hours of performance support for natural intimacy.',
    price: 80,
    image: '/cialis.jpeg',
    category: 'ED Treatment',
    stock: 100,
    fullDescription: 'Tadalafil is a long-lasting ED solution known for its extended duration. It allows for more natural and spontaneous intimacy without the need to time your dose precisely.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: 'Dr. James Carter',
    benefits: [
      'Supports natural erection response',
      'Provides long-lasting performance support (up to 36 hours)',
      'Reduces pressure of "timing" intimacy',
    ],
    effectsTiming: 'Starts working within 30–45 minutes. Lasts up to 24–36 hours.',
    packs: [
      { size: '20 mg', price: 80 },
      { size: '40 mg', price: 90 },
      { size: '60 mg', price: 100 },
      { size: '80 mg', price: 130 },
      { size: '80 mg (Black)', price: 150 },
    ],
    shippingOptions: [
      { quantity: '100 pills', price: 27 },
      { quantity: '250 pills', price: 35 },
    ],
    howToUse: [
      'Take 1 tablet 30–45 minutes before activity',
      'Can also be used in low doses daily (as advised)',
      'Avoid excessive alcohol',
    ],
    reviews: [
      { id: '2-1', user: 'Chris P.', rating: 5, text: 'The weekend pill really works. Love not having to plan ahead.', date: '2025-03-14' },
      { id: '2-2', user: 'Nathan L.', rating: 4, text: 'Great product, lasting effects, very pleased.', date: '2025-02-01' },
      { id: '2-3', user: 'Brian H.', rating: 5, text: 'Better than Viagra for me personally. 36 hours is amazing.', date: '2025-01-20' },
      { id: '2-4', user: 'Scott F.', rating: 5, text: 'Renewed confidence. Would recommend to anyone.', date: '2024-12-12' },
      { id: '2-5', user: 'Kevin D.', rating: 4, text: 'Fast delivery, quality product. Will order again.', date: '2024-11-08' },
    ],
  },
  {
    id: '3',
    name: 'Femigra (Pink Pill)',
    description: 'Designed for female sexual wellness — enhances sensitivity, arousal, and intimacy experience.',
    price: 90,
    image: '/femigra.jpeg',
    category: 'Sexual Wellness',
    stock: 100,
    fullDescription: 'Femigra is designed to support sexual wellness and arousal. It works by increasing blood flow and sensitivity, helping improve overall experience and satisfaction.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: 'Dr. Sarah Mitchell',
    benefits: [
      'Enhances sensitivity and stimulation',
      'Supports improved arousal response',
      'Helps boost confidence and comfort',
    ],
    effectsTiming: 'Starts working within 30–60 minutes. Effects last several hours.',
    packs: [
      { size: 'Femigra (Pink Pill)', price: 90 },
    ],
    shippingOptions: [
      { quantity: '100 pills', price: 27 },
      { quantity: '250 pills', price: 35 },
    ],
    howToUse: [
      'Take 1 tablet before planned activity',
      'Use only as directed',
      'Do not exceed recommended dose',
    ],
    reviews: [
      { id: '3-1', user: 'Emily R.', rating: 5, text: 'Really made a difference for me. Highly recommend.', date: '2025-03-05' },
      { id: '3-2', user: 'Jessica M.', rating: 5, text: 'Great product, noticeable effects. Very satisfied.', date: '2025-02-10' },
      { id: '3-3', user: 'Sarah K.', rating: 4, text: 'Works well. Discreet packaging too, which I appreciate.', date: '2025-01-22' },
      { id: '3-4', user: 'Laura T.', rating: 5, text: 'Exactly what I needed. Will definitely buy again.', date: '2024-12-15' },
      { id: '3-5', user: 'Amanda C.', rating: 4, text: 'Good quality and fast delivery. Happy with my purchase.', date: '2024-11-02' },
    ],
  },
  {
    id: '4',
    name: '50 Sex Position Game Cards',
    description: 'Premium couple experience cards — 50 unique positions to explore connection, fun & excitement.',
    price: 70,
    image: '/game_cards.png',
    category: 'Couples',
    stock: 100,
    fullDescription: 'The 50 Sex Position Game Cards are a beautifully designed card set made for couples who want to explore, connect, and enjoy deeper moments together. Each card introduces a unique idea designed to encourage connection, creativity, and shared moments.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: undefined,
    benefits: [
      'Break the routine and discover new ways to connect',
      'Build deeper emotional and physical chemistry',
      'Add excitement, surprise, and spontaneity',
      'Perfect for all couples — new or long-term',
    ],
    effectsTiming: 'Shuffle the deck, pick a card, and explore the moment together.',
    packs: [
      { size: '50 Card Set', price: 70 },
    ],
    shippingOptions: [
      { quantity: 'Per order', price: 27 },
    ],
    howToUse: [
      'Shuffle the deck',
      'Pick a random card together',
      'Explore the experience as a couple',
    ],
    reviews: [
      { id: '4-1', user: 'Mark & Lisa', rating: 5, text: 'Such a fun addition to our relationship. Highly recommended!', date: '2025-03-20' },
      { id: '4-2', user: 'Carlos B.', rating: 5, text: 'Our date nights are so much more exciting now. Great buy.', date: '2025-02-14' },
      { id: '4-3', user: 'Sophie W.', rating: 4, text: 'Great idea, great cards. Packaging is very discreet too.', date: '2025-01-30' },
      { id: '4-4', user: 'Raj & Priya', rating: 5, text: 'Perfect gift for couples. We love using these!', date: '2024-12-25' },
      { id: '4-5', user: 'Tom H.', rating: 5, text: 'Really refreshed our relationship. Wonderful product.', date: '2024-11-11' },
    ],
  },
  {
    id: '5',
    name: 'Kamagra 100mg / 150mg / 200mg',
    description: 'Fast-acting Sildenafil-based ED solution for stronger, more confident performance.',
    price: 80,
    image: '/kamagra.jpeg',
    category: 'ED Treatment',
    stock: 0, // Out of Stock
    fullDescription: 'Kamagra is a powerful erectile dysfunction solution formulated with Sildenafil Citrate, designed to help improve blood flow and support stronger, longer-lasting erections. Perfect for those looking for a reliable and fast-acting performance boost.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: 'Dr. James Carter',
    benefits: [
      'Helps achieve firm and lasting erections',
      'Improves performance and stamina',
      'Fast-acting formula (30–60 minutes)',
      'Cost-effective Sildenafil-based alternative',
    ],
    effectsTiming: 'Starts working in 30–60 minutes. Duration: 4–6 hours.',
    packs: [
      { size: '100 mg', price: 80 },
      { size: '150 mg', price: 100 },
      { size: '200 mg', price: 120 },
    ],
    shippingOptions: [
      { quantity: '100 pills', price: 27 },
      { quantity: '250 pills', price: 35 },
    ],
    howToUse: [
      'Take 1 tablet with water before activity',
      'Use 30–60 minutes prior',
      'Avoid heavy meals and alcohol',
      'Do not exceed recommended dosage',
    ],
    reviews: [
      { id: '5-1', user: 'Peter A.', rating: 5, text: 'Very effective! Great alternative at an affordable price.', date: '2025-02-18' },
      { id: '5-2', user: 'Gary N.', rating: 4, text: 'Works well for me. Fast delivery and discreet packaging.', date: '2024-12-08' },
    ],
  },
  {
    id: '6',
    name: 'Levitra (Vardenafil) 5mg / 10mg / 20mg',
    description: 'Smooth, reliable ED support — consistent results with a natural feel and proven effectiveness.',
    price: 90,
    image: '/levitra.jpeg',
    category: 'ED Treatment',
    stock: 0, // Out of Stock
    fullDescription: 'Levitra is a trusted erectile dysfunction treatment powered by Vardenafil, designed to improve blood flow and support strong, consistent erections. Known for its balanced performance and smooth results.',
    lastUpdated: '14/04/2025',
    writtenBy: 'Believe Pharma Team',
    medicallyReviewedBy: 'Dr. James Carter',
    benefits: [
      'Helps achieve firm and consistent erections',
      'Smooth and controlled performance',
      'Works effectively even for some users where others may not',
      'Reliable and well-tolerated formula',
    ],
    effectsTiming: 'Starts working in 30–60 minutes. Duration: 5–8 hours.',
    packs: [
      { size: '5 mg', price: 90 },
      { size: '10 mg', price: 110 },
      { size: '20 mg', price: 130 },
    ],
    shippingOptions: [
      { quantity: '100 pills', price: 27 },
      { quantity: '250 pills', price: 35 },
    ],
    howToUse: [
      'Take 1 tablet with water before activity',
      'Use 30–60 minutes prior',
      'Can be taken with or without food',
      'Avoid excessive alcohol',
      'Do not exceed recommended dosage',
    ],
    reviews: [
      { id: '6-1', user: 'Frank L.', rating: 5, text: 'Tried other pills before, this one gives the smoothest results for me.', date: '2025-01-10' },
      { id: '6-2', user: 'Steve O.', rating: 4, text: 'Consistent performance. Very happy with the product.', date: '2024-11-25' },
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit)
}

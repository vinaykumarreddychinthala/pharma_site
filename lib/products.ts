export interface ProductPack {
  size: string
  price: number
  unitPrice: number
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
    name: 'Aspirin 500mg',
    description: 'Effective pain relief and fever reduction',
    price: 149,
    image: '/aspirin.png',
    category: 'Pain Relief',
    stock: 50,
    fullDescription: 'Aspirin 500mg provides fast and effective relief from headaches, muscle aches, backaches, minor arthritis pain, menstrual cramps, and the common cold. Works within 30 minutes of taking it.',
    tabletsCount: 30,
    lastUpdated: '19/12/2024',
    writtenBy: 'Mark John',
    medicallyReviewedBy: 'Dr. Aditya Shah',
    packs: [
      { size: '28 Tablets', price: 54, unitPrice: 1.93 },
      { size: '56 Tablets', price: 93, unitPrice: 1.66 },
      { size: '84 Tablets', price: 124, unitPrice: 1.48 }
    ],
    reviews: [
      { id: '1-1', user: 'Amit K.', rating: 5, text: 'Very effective and fast acting.', date: '2025-10-12' },
      { id: '1-2', user: 'Priya S.', rating: 4, text: 'Good quality, packaging was nice.', date: '2025-09-28' },
      { id: '1-3', user: 'Rohan M.', rating: 5, text: 'Always rely on this for headache.', date: '2025-08-15' },
      { id: '1-4', user: 'Sneha P.', rating: 4, text: 'Works well for me.', date: '2025-07-22' }
    ]
  },
  {
    id: '2',
    name: 'Vitamin C 1000mg',
    description: 'Boost immunity with daily vitamin C',
    price: 299,
    image: '/vitaminC.png',
    category: 'Vitamins',
    stock: 75,
    fullDescription: 'High-potency Vitamin C supplement that supports immune system function, collagen formation, and acts as a powerful antioxidant. Helps fight free radicals and supports overall wellness.',
    tabletsCount: 60,
    lastUpdated: '15/11/2024',
    writtenBy: 'Rachel Adams',
    medicallyReviewedBy: 'Dr. Sarah Jenkins',
    packs: [
      { size: '30 Tablets', price: 15, unitPrice: 0.50 },
      { size: '60 Tablets', price: 25, unitPrice: 0.41 },
      { size: '90 Tablets', price: 35, unitPrice: 0.38 }
    ],
    reviews: [
      { id: '2-1', user: 'Rahul D.', rating: 5, text: 'Feel much more energetic after taking these daily.', date: '2025-11-05' },
      { id: '2-2', user: 'Sneha M.', rating: 5, text: 'Great for immunity. Always keep these in stock.', date: '2025-10-20' },
      { id: '2-3', user: 'Karan V.', rating: 4, text: 'Tablets are a bit large but doable.', date: '2025-08-15' }
    ]
  },
  {
    id: '3',
    name: 'Cough Syrup DX',
    description: 'Relief from cough and cold symptoms',
    price: 189,
    image: '/cough_syrup.png',
    category: 'Cold & Flu',
    stock: 40,
    fullDescription: 'Effective cough syrup that provides fast relief from dry and productive cough. Contains natural ingredients that soothe throat and help you recover faster from cold and flu.',
    tabletsCount: 0,
    lastUpdated: '10/01/2025',
    writtenBy: 'Mark John',
    medicallyReviewedBy: 'Dr. Aditya Shah',
    packs: [
      { size: '100ml Bottle', price: 10, unitPrice: 0.10 },
      { size: '200ml Bottle', price: 18, unitPrice: 0.09 },
    ],
    reviews: [
      { id: '3-1', user: 'Vikram B.', rating: 4, text: 'Soothes throat instantly.', date: '2025-12-01' }
    ]
  },
  {
    id: '4',
    name: 'Amoxicillin 500mg',
    description: 'Antibiotic for bacterial infections',
    price: 349,
    image: '/amoxicillin.png',
    category: 'Antibiotics',
    stock: 30,
    fullDescription: 'Amoxicillin is a penicillin-type antibiotic used to treat various bacterial infections. It works by stopping the growth of bacteria. Available in 500mg capsules.',
    tabletsCount: 15,
    lastUpdated: '05/02/2025',
    writtenBy: 'John Doe',
    medicallyReviewedBy: 'Dr. Emily Chen',
    packs: [
      { size: '15 Capsules', price: 12, unitPrice: 0.80 },
      { size: '30 Capsules', price: 20, unitPrice: 0.66 }
    ],
    reviews: [
      { id: '4-1', user: 'Nisha R.', rating: 5, text: 'Cleared up my infection in a week.', date: '2025-11-22' }
    ]
  },
  {
    id: '5',
    name: 'Multivitamin Plus',
    description: 'Complete daily vitamin and mineral supplement',
    price: 399,
    image: '/multi_vitamin.png',
    category: 'Vitamins',
    stock: 60,
    fullDescription: 'Comprehensive multivitamin formula containing essential vitamins and minerals for overall health and wellness. Supports energy levels, immune function, and general wellbeing.',
    tabletsCount: 90,
    lastUpdated: '12/12/2024',
    writtenBy: 'Sarah Lee',
    medicallyReviewedBy: 'Dr. John Miller',
    packs: [
      { size: '30 Tablets', price: 15, unitPrice: 0.50 },
      { size: '60 Tablets', price: 25, unitPrice: 0.41 },
      { size: '90 Tablets', price: 35, unitPrice: 0.38 }
    ],
    reviews: [
      { id: '5-1', user: 'Arjun P.', rating: 4, text: 'A good daily supplement.', date: '2025-10-30' },
      { id: '5-2', user: 'Meera K.', rating: 5, text: 'Noticed better energy levels.', date: '2025-09-18' }
    ]
  },
  {
    id: '6',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain reliever',
    price: 179,
    image: '/ibuprofen.png',
    category: 'Pain Relief',
    stock: 55,
    fullDescription: 'Ibuprofen 400mg reduces inflammation and relieves pain from headaches, muscle aches, backaches, minor arthritis pain, menstrual cramps, and the common cold.',
    tabletsCount: 20,
    lastUpdated: '19/12/2024',
    writtenBy: 'Mark John',
    medicallyReviewedBy: 'Dr. Aditya Shah',
    packs: [
      { size: '20 Tablets', price: 8, unitPrice: 0.40 },
      { size: '40 Tablets', price: 14, unitPrice: 0.35 },
      { size: '60 Tablets', price: 18, unitPrice: 0.30 }
    ],
    reviews: [
      { id: '6-1', user: 'Sanjay T.', rating: 5, text: 'Very helpful for my back pain.', date: '2025-11-10' }
    ]
  },
  {
    id: '7',
    name: 'Cold Relief Tablets',
    description: 'Comprehensive cold symptom relief',
    price: 149,
    image: '/aspirin.png',
    category: 'Cold & Flu',
    stock: 45,
    fullDescription: 'Combination formula that relieves multiple cold symptoms including congestion, cough, sore throat, fever, and body aches. Fast-acting relief in one convenient tablet.',
    tabletsCount: 24,
    lastUpdated: '22/11/2024',
    writtenBy: 'Emily White',
    medicallyReviewedBy: 'Dr. Sarah Jenkins',
    packs: [
      { size: '12 Tablets', price: 6, unitPrice: 0.50 },
      { size: '24 Tablets', price: 10, unitPrice: 0.41 }
    ],
    reviews: [
      { id: '7-1', user: 'Riya J.', rating: 4, text: 'Works well for seasonal colds.', date: '2025-12-05' }
    ]
  },
  {
    id: '8',
    name: 'Azithromycin 500mg',
    description: 'Broad-spectrum antibiotic',
    price: 449,
    image: '/amoxicillin.png',
    category: 'Antibiotics',
    stock: 25,
    fullDescription: 'Azithromycin is a macrolide antibiotic used to treat various bacterial infections. Effective against a wide range of organisms and well-tolerated by most patients.',
    tabletsCount: 6,
    lastUpdated: '19/12/2024',
    writtenBy: 'Mark John',
    medicallyReviewedBy: 'Dr. Aditya Shah',
    packs: [
      { size: '3 Tablets', price: 15, unitPrice: 5.00 },
      { size: '6 Tablets', price: 25, unitPrice: 4.16 }
    ],
    reviews: [
      { id: '8-1', user: 'Tarun M.', rating: 5, text: 'Prescribed by my doctor, worked effectively.', date: '2025-08-20' }
    ]
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

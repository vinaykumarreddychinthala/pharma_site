export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  fullDescription?: string
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
    fullDescription: 'Aspirin 500mg provides fast and effective relief from headaches, muscle aches, backaches, minor arthritis pain, menstrual cramps, and the common cold. Works within 30 minutes of taking it.'
  },
  {
    id: '2',
    name: 'Vitamin C 1000mg',
    description: 'Boost immunity with daily vitamin C',
    price: 299,
    image: '/vitaminC.png',
    category: 'Vitamins',
    stock: 75,
    fullDescription: 'High-potency Vitamin C supplement that supports immune system function, collagen formation, and acts as a powerful antioxidant. Helps fight free radicals and supports overall wellness.'
  },
  {
    id: '3',
    name: 'Cough Syrup DX',
    description: 'Relief from cough and cold symptoms',
    price: 189,
    image: '/cough_syrup.png',
    category: 'Cold & Flu',
    stock: 40,
    fullDescription: 'Effective cough syrup that provides fast relief from dry and productive cough. Contains natural ingredients that soothe throat and help you recover faster from cold and flu.'
  },
  {
    id: '4',
    name: 'Amoxicillin 500mg',
    description: 'Antibiotic for bacterial infections',
    price: 349,
    image: '/amoxicillin.png',
    category: 'Antibiotics',
    stock: 30,
    fullDescription: 'Amoxicillin is a penicillin-type antibiotic used to treat various bacterial infections. It works by stopping the growth of bacteria. Available in 500mg capsules.'
  },
  {
    id: '5',
    name: 'Multivitamin Plus',
    description: 'Complete daily vitamin and mineral supplement',
    price: 399,
    image: '/multi_vitamin.png',
    category: 'Vitamins',
    stock: 60,
    fullDescription: 'Comprehensive multivitamin formula containing essential vitamins and minerals for overall health and wellness. Supports energy levels, immune function, and general wellbeing.'
  },
  {
    id: '6',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain reliever',
    price: 179,
    image: '/ibuprofen.png',
    category: 'Pain Relief',
    stock: 55,
    fullDescription: 'Ibuprofen 400mg reduces inflammation and relieves pain from headaches, muscle aches, backaches, minor arthritis pain, menstrual cramps, and the common cold.'
  },
  {
    id: '7',
    name: 'Cold Relief Tablets',
    description: 'Comprehensive cold symptom relief',
    price: 149,
    image: '/aspirin.png',
    category: 'Cold & Flu',
    stock: 45,
    fullDescription: 'Combination formula that relieves multiple cold symptoms including congestion, cough, sore throat, fever, and body aches. Fast-acting relief in one convenient tablet.'
  },
  {
    id: '8',
    name: 'Azithromycin 500mg',
    description: 'Broad-spectrum antibiotic',
    price: 449,
    image: '/amoxicillin.png',
    category: 'Antibiotics',
    stock: 25,
    fullDescription: 'Azithromycin is a macrolide antibiotic used to treat various bacterial infections. Effective against a wide range of organisms and well-tolerated by most patients.'
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

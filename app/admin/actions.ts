'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  // Parse simple fields
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const image = formData.get('image') as string || '/placeholder.png'
  const category = formData.get('category') as string
  const stock = parseInt(formData.get('stock') as string) || 0

  const { error } = await supabase.from('products').insert({
    name,
    description,
    price,
    image,
    category,
    stock
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const author = formData.get('author') as string || 'Believe Pharma Team'
  const category = formData.get('category') as string
  
  // Create static date for simplicity, or grab from current timestamp
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const { error } = await supabase.from('blogs').insert({
    title,
    excerpt,
    content,
    date,
    author,
    category
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  return { success: true }
}

export async function deleteBlog(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/blogs')
  revalidatePath('/blog')
  return { success: true }
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/orders')
  return { success: true }
}

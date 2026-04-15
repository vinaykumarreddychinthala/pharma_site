'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function uploadImage(file: File, folder: string) {
  if (!file || file.size === 0) return null

  const supabase = await createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('pharma-images')
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('pharma-images')
    .getPublicUrl(filePath)

  return publicUrl
}

export async function createProduct(formData: FormData) {
  try {
    const supabase = await createClient()

    // Parse simple fields
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const stock = parseInt(formData.get('stock') as string) || 0
    
    // Handle Image Upload
    const imageFile = formData.get('image') as File
    const imageUrl = await uploadImage(imageFile, 'products') || '/placeholder.png'

    const { error } = await supabase.from('products').insert({
      name,
      description,
      price,
      image: imageUrl,
      category,
      stock
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
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
  try {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string || 'Believe Pharma Team'
    const category = formData.get('category') as string
    
    // Handle Image Upload (Optional for blogs, but good to have)
    const imageFile = formData.get('image') as File
    const imageUrl = await uploadImage(imageFile, 'blogs') || ''

    // Create static date for simplicity, or grab from current timestamp
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const { error } = await supabase.from('blogs').insert({
      title,
      excerpt,
      content,
      date,
      author,
      category,
      image: imageUrl // Assuming we added an image column to blogs
    })

    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
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

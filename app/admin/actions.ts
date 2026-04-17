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
    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const overview = formData.get('overview') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string) || 0
    const category = formData.get('category') as string
    const stock = parseInt(formData.get('stock') as string) || 0
    
    // Parse complex JSON fields
    const safeParseJSON = (data: any, fallback: any) => {
      if (!data) return fallback;
      try { return JSON.parse(data); } catch { return fallback; }
    }
    
    const composition = safeParseJSON(formData.get('composition'), {})
    const how_it_works = formData.get('how_it_works') as string
    const uses = safeParseJSON(formData.get('uses'), [])
    const dosage = safeParseJSON(formData.get('dosage'), [])
    const packs = safeParseJSON(formData.get('packs'), [])
    const effects = safeParseJSON(formData.get('effects'), {})
    const usage_instructions = safeParseJSON(formData.get('usage_instructions'), [])
    
    let side_effects = safeParseJSON(formData.get('side_effects'), {})
    if (formData.get('side_effects_merge')) {
      side_effects = {
        common: safeParseJSON(formData.get('side_effects_common'), []),
        serious: safeParseJSON(formData.get('side_effects_serious'), [])
      }
    }

    const precautions = safeParseJSON(formData.get('precautions'), [])
    const storage = formData.get('storage') as string
    const faqs = safeParseJSON(formData.get('faqs'), [])
    const reviews_enabled = formData.get('reviews_enabled') === 'on'
    const shipping_info = formData.get('shipping_info') as string
    const cta = safeParseJSON(formData.get('cta'), {})
    
    // Handle Image Upload
    const imageFile = formData.get('image') as File
    const imageUrl = await uploadImage(imageFile, 'products') || '/placeholder.png'

    const { error } = await supabase.from('products').insert({
      name,
      slug,
      title,
      overview,
      description,
      price,
      image: imageUrl,
      category,
      stock,
      composition,
      how_it_works,
      uses,
      dosage,
      packs,
      effects,
      usage_instructions,
      side_effects,
      precautions,
      storage,
      faqs,
      reviews_enabled,
      shipping_info,
      cta
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

export async function updateProduct(formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    if (!id) throw new Error('Product ID is required for updating')

    // Parse simple fields
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const title = formData.get('title') as string
    const overview = formData.get('overview') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string) || 0
    const category = formData.get('category') as string
    const stock = parseInt(formData.get('stock') as string) || 0
    
    const safeParseJSON = (data: any, fallback: any) => {
      if (!data) return fallback;
      try { return JSON.parse(data); } catch { return fallback; }
    }
    
    const composition = safeParseJSON(formData.get('composition'), {})
    const how_it_works = formData.get('how_it_works') as string
    const uses = safeParseJSON(formData.get('uses'), [])
    const dosage = safeParseJSON(formData.get('dosage'), [])
    const packs = safeParseJSON(formData.get('packs'), [])
    const effects = safeParseJSON(formData.get('effects'), {})
    const usage_instructions = safeParseJSON(formData.get('usage_instructions'), [])
    
    let side_effects = safeParseJSON(formData.get('side_effects'), {})
    if (formData.get('side_effects_merge')) {
      side_effects = {
        common: safeParseJSON(formData.get('side_effects_common'), []),
        serious: safeParseJSON(formData.get('side_effects_serious'), [])
      }
    }

    const precautions = safeParseJSON(formData.get('precautions'), [])
    const storage = formData.get('storage') as string
    const faqs = safeParseJSON(formData.get('faqs'), [])
    const reviews_enabled = formData.get('reviews_enabled') === 'on'
    const shipping_info = formData.get('shipping_info') as string
    const cta = safeParseJSON(formData.get('cta'), {})
    
    // Handle Image Update
    const existingImage = formData.get('existingImage') as string
    const imageFile = formData.get('image') as File
    let imageUrl = existingImage

    if (imageFile && imageFile.size > 0) {
      const newUrl = await uploadImage(imageFile, 'products')
      if (newUrl) imageUrl = newUrl
    }

    const { error } = await supabase.from('products').update({
      name,
      slug,
      title,
      overview,
      description,
      price,
      image: imageUrl,
      category,
      stock,
      composition,
      how_it_works,
      uses,
      dosage,
      packs,
      effects,
      usage_instructions,
      side_effects,
      precautions,
      storage,
      faqs,
      reviews_enabled,
      shipping_info,
      cta
    }).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/products')
    revalidatePath('/products')
    revalidatePath(`/products/${id}`)
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
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const intro = formData.get('intro') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string || 'Believe Pharma Team'
    const reviewed_by = formData.get('reviewed_by') as string
    const category = formData.get('category') as string
    const conclusion = formData.get('conclusion') as string
    
    const safeParseJSON = (data: any, fallback: any) => {
      if (!data) return fallback;
      try { return JSON.parse(data); } catch { return fallback; }
    }
    
    const sections = safeParseJSON(formData.get('sections'), [])
    const faq = safeParseJSON(formData.get('faq'), [])
    const related_products = safeParseJSON(formData.get('related_products'), [])
    
    // Handle Image Upload (Optional for blogs, but good to have)
    const imageFile = formData.get('image') as File
    const imageUrl = await uploadImage(imageFile, 'blogs') || ''

    // Create static date for simplicity, or grab from current timestamp
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const { error } = await supabase.from('blogs').insert({
      title,
      slug,
      excerpt,
      intro,
      sections,
      faq,
      related_products,
      conclusion,
      content,
      date,
      author,
      reviewed_by,
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

export async function updateBlog(formData: FormData) {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string
    if (!id) throw new Error('Blog ID is required for updating')

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const excerpt = formData.get('excerpt') as string
    const intro = formData.get('intro') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string
    const reviewed_by = formData.get('reviewed_by') as string
    const category = formData.get('category') as string
    const conclusion = formData.get('conclusion') as string
    
    const safeParseJSON = (data: any, fallback: any) => {
      if (!data) return fallback;
      try { return JSON.parse(data); } catch { return fallback; }
    }
    
    const sections = safeParseJSON(formData.get('sections'), [])
    const faq = safeParseJSON(formData.get('faq'), [])
    const related_products = safeParseJSON(formData.get('related_products'), [])
    
    // Handle Image Update
    const existingImage = formData.get('existingImage') as string
    const imageFile = formData.get('image') as File
    let imageUrl = existingImage

    if (imageFile && imageFile.size > 0) {
      const newUrl = await uploadImage(imageFile, 'blogs')
      if (newUrl) imageUrl = newUrl
    }

    const { error } = await supabase.from('blogs').update({
      title,
      slug,
      excerpt,
      intro,
      sections,
      faq,
      related_products,
      conclusion,
      content,
      author,
      reviewed_by,
      category,
      image: imageUrl
    }).eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath(`/blog/${id}`)
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

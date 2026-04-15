'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  // Direct check against .env
  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    
    revalidatePath('/', 'layout')
    redirect('/admin')
  } else {
    return { error: 'Invalid admin credentials' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  revalidatePath('/', 'layout')
  redirect('/')
}

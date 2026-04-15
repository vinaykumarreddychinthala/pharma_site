-- Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    stripe_session_id TEXT,
    stripe_payment_url TEXT
);

-- Enable RLS for orders based on email (optional for anonymous tracking)
-- But since we removed auth, we let anonymous inserts work
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to orders
CREATE POLICY "Enable insert for anonymous users on orders" ON public.orders
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow anonymous selects on orders they just created (optional, usually not needed if we just return it from API server side bypassing RLS, wait, the API uses server client). 
-- WAIT: "createServerClient" in server.ts uses the standard NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.
-- We must make sure the service role key or public key has access. If public key, we must add INSERT policies.

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users on order_items" ON public.order_items
    FOR INSERT
    TO public
    WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- MIGRATION: Add Stripe payment columns to existing orders table
-- Run this in Supabase SQL Editor if the orders table already exists:
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_payment_url TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- MIGRATION: Admin Panel & Dynamic Content
-- Run this in Supabase SQL Editor to enable dynamic Products and Blogs
-- ─────────────────────────────────────────────────────────────────────────────

-- Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 100,
    full_description TEXT,
    tablets_count INTEGER,
    packs JSONB DEFAULT '[]'::jsonb,
    shipping_options JSONB DEFAULT '[]'::jsonb,
    how_to_use JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    effects_timing TEXT,
    last_updated TEXT,
    written_by TEXT,
    medically_reviewed_by TEXT,
    reviews JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT, -- Added for featured image support
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS (Simplified for Admin Panel)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────────────
-- STORAGE: Pharma Images Bucket
-- ─────────────────────────────────────────────────────────────────────────────

-- Create a bucket for pharma images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('pharma-images', 'pharma-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- 1. Allow public read access to images
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pharma-images');

-- 2. Allow authenticated (and anon for simplicity if RLS is off) to upload
-- Note: In a real app, you'd restrict this more, but we're keeping it simple as requested.
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'pharma-images');

CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'pharma-images');

CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'pharma-images');



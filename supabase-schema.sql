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

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'next/link'
import { ShoppingBag, FileText, ShoppingCart, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // For a dashboard overview, we can fetch counts. 
  // Tip: In production, pass { count: 'exact', head: true } to save payload size.
  const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: blogsCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true })
  const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  
  // Calculate total revenue from orders
  const { data: orders } = await supabase.from('orders').select('total_amount, status')
  const totalRevenue = orders?.filter(o => o.status !== 'cancelled').reduce((acc, order) => acc + Number(order.total_amount), 0) || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to the Believe Pharma administrative panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From successful & pending orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Catalog</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogsCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Put recent orders or quick actions here later if needed */}
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateOrderStatus } from '../actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case 'processing': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case 'shipped': return <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>
      case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>
      default: return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">Pending</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground mt-2">View details and update statuses for customer orders.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id.split('-')[0]}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.full_name}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="font-bold">${order.total_amount}</TableCell>
                      <TableCell>
                        {/* We use a form with a select inside. However, standard Select doesn't submit FormData easily without a hidden input. For a simple admin dashboard, we can just display the Select and use a Client Component or use native select. Let's use native select for Server Actions to keep it simple, or a simple form submit. */}
                        <form action={async (formData) => {
                          'use server'
                          await updateOrderStatus(order.id, formData.get('status') as string)
                        }} className="flex items-center gap-2">
                          <select 
                            name="status" 
                            defaultValue={order.status}
                            className="bg-transparent border border-border rounded text-sm p-1.5 focus:ring-1 focus:ring-primary"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button type="submit" className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90">
                            Save
                          </button>
                        </form>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details: {order.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Customer Info</h4>
                                  <p className="text-sm">{order.full_name}</p>
                                  <p className="text-sm">{order.email}</p>
                                  <p className="text-sm">{order.phone}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                                  <p className="text-sm">{order.address}</p>
                                  <p className="text-sm">{order.city}, {order.state} {order.zip_code}</p>
                                  <p className="text-sm">{order.country}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold mb-2">Order Items</h4>
                                <div className="border rounded-md divide-y">
                                  {order.order_items?.map((item: any) => (
                                    <div key={item.id} className="flex justify-between p-3 text-sm">
                                      <span>{item.product_name} x {item.quantity}</span>
                                      <span className="font-semibold">${item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                                <span className="font-semibold">Subtotal</span>
                                <span>${order.subtotal}</span>
                              </div>
                              <div className="flex justify-between items-center -mt-4 p-4 rounded-lg">
                                <span className="font-semibold text-red-500">Discount</span>
                                <span className="text-red-500">-${order.discount}</span>
                              </div>
                              <div className="flex justify-between items-center -mt-4 bg-primary/5 p-4 rounded-lg">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg text-primary">${order.total_amount}</span>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

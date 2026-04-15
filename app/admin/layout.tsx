import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, FileText, ShoppingCart, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/login/actions'
import { cookies } from 'next/headers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value === 'true'

  if (!isAdmin) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted font-medium text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted font-medium text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted font-medium text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            Products
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted font-medium text-muted-foreground hover:text-foreground">
            <FileText className="h-5 w-5" />
            Blogs
          </Link>
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="mb-4 text-sm text-muted-foreground truncate">
            Admin Session Active
          </div>
          <form action={logout}>
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border p-4 flex justify-between items-center">
          <Link href="/admin" className="font-bold text-lg text-primary">Admin Panel</Link>
          {/* Add mobile menu sheet if needed */}
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

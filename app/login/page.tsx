import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const sp = await searchParams
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Enter your email below to login.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="login-form" action={login} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" name="password" type="password" required />
                  </div>
                  {sp?.error && <div className="text-sm font-medium text-destructive">{sp.error}</div>}
                  {sp?.message && <div className="text-sm font-medium text-primary">{sp.message}</div>}
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" form="login-form">Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your email below to create your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="signup-form" action={signup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input id="signup-username" name="username" type="text" placeholder="johndoe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-mobile">Mobile Number</Label>
                    <Input id="signup-mobile" name="mobile" type="tel" placeholder="+1234567890" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" required />
                  </div>
                  {sp?.error && <div className="text-sm font-medium text-destructive">{sp.error}</div>}
                  {sp?.message && <div className="text-sm font-medium text-primary">{sp.message}</div>}
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" form="signup-form">Create account</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

'use client'

import { useActionState } from 'react'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Lock } from 'lucide-react'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-sm p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-white/40 text-sm mt-1">Enter your credentials to continue</p>
        </div>

        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/70 text-xs font-medium uppercase tracking-wider ml-1">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@example.com"
              className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary focus:border-primary placeholder:text-white/20"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/70 text-xs font-medium uppercase tracking-wider ml-1">Secret Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary focus:border-primary"
              required 
            />
          </div>

          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
              {state.error}
            </div>
          )}

          <Button 
            disabled={isPending}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base transition-all active:scale-[0.98] group flex items-center justify-center gap-2"
          >
            {isPending ? 'Authenticating...' : 'Sign In'}
            {!isPending && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <p className="mt-8 text-center text-white/20 text-[10px] uppercase tracking-[0.2em]">
          Powered by Believe Pharma Internal Systems
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Dashboard } from "@/components/dashboard/dashboard"

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <AuthPage />
    </AuthProvider>
  )
}

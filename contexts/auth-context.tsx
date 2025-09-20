"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type AuthState, authenticateUser, registerUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("kindercrew-user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch {
        localStorage.removeItem("kindercrew-user")
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authenticateUser(email, password)
      if (user) {
        localStorage.setItem("kindercrew-user", JSON.stringify(user))
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      }

      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    } catch {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await registerUser(email, password, name)
      if (user) {
        localStorage.setItem("kindercrew-user", JSON.stringify(user))
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      }

      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    } catch {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("kindercrew-user")
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User, UserRole } from "@/lib/types"
import { currentUser as defaultUser } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser)

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (email && password) {
      setUser(defaultUser)
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (name && email && password) {
      setUser({
        ...defaultUser,
        name,
        email,
        avatar: name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
        switchRole,
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

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { storage } from "@/lib/storage"
import { mockUsers } from "@/lib/data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id" | "rating" | "totalTrades" | "joinedAt">) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Inicializar datos mock si no existen
    const existingUsers = storage.getUsers()
    if (existingUsers.length === 0) {
      storage.saveUsers(mockUsers)
    }

    // Cargar usuario actual
    const currentUser = storage.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulación de autenticación
    const users = storage.getUsers()
    const foundUser = users.find((u) => u.email === email)

    if (foundUser) {
      setUser(foundUser)
      storage.setCurrentUser(foundUser)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: Omit<User, "id" | "rating" | "totalTrades" | "joinedAt">): Promise<boolean> => {
    setIsLoading(true)

    const users = storage.getUsers()
    const existingUser = users.find((u) => u.email === userData.email)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      rating: 5.0,
      totalTrades: 0,
      joinedAt: new Date(),
    }

    const updatedUsers = [...users, newUser]
    storage.saveUsers(updatedUsers)
    setUser(newUser)
    storage.setCurrentUser(newUser)
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    storage.setCurrentUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

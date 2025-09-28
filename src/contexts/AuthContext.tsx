import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { emailApi } from '../services/emailApi'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Try real API authentication first
      const authResult = await emailApi.login(email, password)

      if (authResult.token && authResult.user) {
        // Store auth data from real API
        localStorage.setItem('authToken', authResult.token)
        localStorage.setItem('userData', JSON.stringify(authResult.user))

        setUser(authResult.user)
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.log('Real API auth failed, falling back to demo credentials')

      // Fallback to demo credentials for testing
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser = {
          id: '1',
          email: email,
          name: 'Admin User'
        }

        // Store mock auth data
        localStorage.setItem('authToken', 'demo-jwt-token')
        localStorage.setItem('userData', JSON.stringify(mockUser))

        setUser(mockUser)
        setIsLoading(false)
        return true
      }
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type User = {
    name: {
        first: string
        last: string
    }
    email: string
    phone: string
    picture: {
        thumbnail: string
    }
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    login: () => Promise<boolean>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user')
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error('Authentication initialization error:', error)
            } finally {
                setLoading(false)
            }
        }

        initializeAuth()
    }, [])

    const login = async (): Promise<boolean> => {
        try {
            setLoading(true)
            const response = await fetch('https://randomuser.me/api/?results=1&nat=us')
            const data = await response.json()
            const randomUser = data.results[0]

            setUser(randomUser)
            setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(randomUser))
            return true
        } catch (error) {
            console.error('Login error:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
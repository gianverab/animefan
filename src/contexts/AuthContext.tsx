import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import { getCurrentUser } from '../services/auth'

interface AuthContextType {
    currentUser: User | null
    loading: boolean
    setCurrentUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    loading: true,
    setCurrentUser: () => {},
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            const user = await getCurrentUser()
            setCurrentUser(user)
            setLoading(false)
        }
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, loading, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

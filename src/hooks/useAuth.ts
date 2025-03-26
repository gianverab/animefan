import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { registerUser, loginUser, logoutUser } from '../services/auth'
import { User } from '../types'

export const useAuth = () => {
    const { currentUser, loading, setCurrentUser } = useContext(AuthContext)

    const login = async (
        email: string,
        password: string
    ): Promise<User | null> => {
        const user = await loginUser(email, password)
        if (user) {
            setCurrentUser(user)
        }
        return user
    }

    const register = async (
        email: string,
        password: string
    ): Promise<User | null> => {
        const user = await registerUser(email, password)
        if (user) {
            setCurrentUser(user)
        }
        return user
    }

    const logout = async (): Promise<void> => {
        await logoutUser()
        setCurrentUser(null)
    }

    return {
        currentUser,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
    }
}

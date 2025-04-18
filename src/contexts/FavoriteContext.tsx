import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
} from 'react'
import {
    getFavorites,
    addToFavorites,
    removeFromFavorites,
} from '../services/favorites'
import { AuthContext } from './AuthContext'

interface FavoritesContextType {
    favorites: number[]
    loading: boolean
    addFavorite: (animeId: number) => Promise<void>
    removeFavorite: (animeId: number) => Promise<void>
    isFavorite: (animeId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    loading: true,
    addFavorite: async () => {},
    removeFavorite: async () => {},
    isFavorite: () => false,
})

interface FavoritesProviderProps {
    children: ReactNode
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
    children,
}) => {
    const [favorites, setFavorites] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const loadFavorites = async () => {
            if (currentUser) {
                setLoading(true)
                const userFavorites = await getFavorites()
                setFavorites(userFavorites)
                setLoading(false)
            } else {
                setFavorites([])
                setLoading(false)
            }
        }

        loadFavorites()
    }, [currentUser])

    const addFavorite = async (animeId: number) => {
        const success = await addToFavorites(animeId)
        if (success) {
            setFavorites((prev) => [...prev, animeId])
        }
    }

    const removeFavorite = async (animeId: number) => {
        const success = await removeFromFavorites(animeId)
        if (success) {
            setFavorites((prev) => prev.filter((id) => id !== animeId))
        }
    }

    const isFavorite = (animeId: number): boolean => {
        return favorites.includes(animeId)
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                loading,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

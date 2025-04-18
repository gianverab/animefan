import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AnimeGrid from '../components/anime/AnimeGrid'
import Loading from '../components/common/Loading'
import { useAuth } from '../hooks/useAuth'
import { useFavorites } from '../hooks/useFavorites'
import { getAnimeById } from '../services/api'
import { Anime, AnimeResponse } from '../types'

const Favorites: React.FC = () => {
    const { isAuthenticated } = useAuth()
    const { favorites, loading: favoritesLoading } = useFavorites()
    const [animeList, setAnimeList] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFavoriteAnime = async () => {
            if (favoritesLoading) return

            if (favorites.length === 0) {
                setAnimeList([])
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const animePromises = favorites.map((id) => getAnimeById(id))
                const results = await Promise.all(animePromises)
                setAnimeList(
                    results
                        .filter(
                            (anime): anime is AnimeResponse => anime !== null
                        )
                        .map((animeResponse) => animeResponse.data)
                )
                setError(null)
            } catch (err) {
                setError('Failed to load favorite anime')
            } finally {
                setLoading(false)
            }
        }

        fetchFavoriteAnime()
    }, [favorites, favoritesLoading])

    if (!isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Favorites</h1>
                <p className="text-gray-400 mb-6">
                    Please sign in to view your favorites.
                </p>
                <Link to="/signin" className="btn-primary">
                    Sign In
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

            {loading || favoritesLoading ? (
                <Loading />
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : animeList.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-400 mb-6">
                        You haven't added any favorites yet.
                    </p>
                    <Link to="/" className="btn-primary">
                        Explore Anime
                    </Link>
                </div>
            ) : (
                <AnimeGrid anime={animeList} loading={false} error={null} />
            )}
        </div>
    )
}

export default Favorites

import React from 'react'
import { Link } from 'react-router-dom'
import { Anime } from '../../types'
import { useFavorites } from '../../hooks/useFavorites'
import { useAuth } from '../../hooks/useAuth'

interface AnimeCardProps {
    anime: Anime
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const { isAuthenticated } = useAuth()
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()

    const isFav = isFavorite(anime.mal_id)

    const handleFavoriteToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isFav) {
            await removeFavorite(anime.mal_id)
        } else {
            await addFavorite(anime.mal_id)
        }
    }

    return (
        <Link to={`/anime/${anime.mal_id}`} className="card group">
            <div className="relative">
                <img
                    src={
                        anime.images.jpg.large_image_url ||
                        anime.images.jpg.image_url
                    }
                    alt={anime.title}
                    className="w-full h-56 object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                        {anime.score ? `★ ${anime.score}` : 'N/A'}
                    </div>
                </div>
                {isAuthenticated && (
                    <button
                        onClick={handleFavoriteToggle}
                        className="absolute top-0 left-0 m-2 p-2 bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                                isFav ? 'text-red-500' : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-white font-semibold truncate">
                    {anime.title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                    <span>{anime.year || 'N/A'}</span>
                    <span>{anime.episodes || '?'} episodes</span>
                </div>
            </div>
        </Link>
    )
}

export default AnimeCard

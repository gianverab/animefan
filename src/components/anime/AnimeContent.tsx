import React from 'react'
import { Anime } from '../../types'
import { useFavorites } from '../../hooks/useFavorites'
import { useAuth } from '../../hooks/useAuth'

interface AnimeContentProps {
    anime: Anime
}

const AnimeContent: React.FC<AnimeContentProps> = ({ anime }) => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                    <img
                        src={
                            anime.images.jpg.large_image_url ||
                            anime.images.jpg.image_url
                        }
                        alt={anime.title}
                        className="w-full max-w-sm rounded-lg shadow-lg mx-auto"
                    />
                    {isAuthenticated && (
                        <button
                            onClick={handleFavoriteToggle}
                            className={`mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center ${
                                isFav
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : 'bg-primary hover:bg-secondary'
                            } transition-colors duration-200`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {isFav
                                ? 'Remove from Favorites'
                                : 'Add to Favorites'}
                        </button>
                    )}
                    <div className="mt-6 bg-card p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">
                            Information
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-gray-400">Score:</span>{' '}
                                {anime.score ? `★ ${anime.score}` : 'N/A'}
                            </li>
                            <li>
                                <span className="text-gray-400">Episodes:</span>{' '}
                                {anime.episodes || 'Unknown'}
                            </li>
                            <li>
                                <span className="text-gray-400">Status:</span>{' '}
                                {anime.status}
                            </li>
                            <li>
                                <span className="text-gray-400">Year:</span>{' '}
                                {anime.year || 'N/A'}
                            </li>
                            <li>
                                <span className="text-gray-400">Studios:</span>{' '}
                                {anime.studios
                                    .map((studio) => studio.name)
                                    .join(', ') || 'Unknown'}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                    <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                        <p className="text-gray-300 leading-relaxed">
                            {anime.synopsis}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {anime.genres.map((genre) => (
                                <span
                                    key={genre.mal_id}
                                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {anime.trailer && anime.trailer.youtube_id && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">
                                Trailer
                            </h2>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                                    title={`${anime.title} Trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    className="w-full h-64 rounded-lg"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AnimeContent

import React from 'react'
import { Link } from 'react-router-dom'
import { Anime } from '../types'

interface AnimeCardProps {
    anime: Anime
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
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

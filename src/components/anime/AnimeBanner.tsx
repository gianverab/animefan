import React from 'react'
import { Anime } from '../../types'
import { Link } from 'react-router-dom'

interface AnimeBannerProps {
    anime: Anime
}

const AnimeBanner: React.FC<AnimeBannerProps> = ({ anime }) => {
    return (
        <div className="relative h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={
                        anime.images.jpg.large_image_url
                            ? anime.images.jpg.large_image_url
                            : anime.images.jpg.image_url
                    }
                    alt={anime.title}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {anime.title}
                </h1>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-400 mr-2">
                        ★ {anime.score || 'N/A'}
                    </span>
                    <span className="text-gray-300 mx-2">•</span>
                    <span className="text-gray-300">{anime.year || 'N/A'}</span>
                    <span className="text-gray-300 mx-2">•</span>
                    <span className="text-gray-300">
                        {anime.episodes || '?'} episodes
                    </span>
                </div>
                <p className="text-gray-300 max-w-xl line-clamp-3">
                    {anime.synopsis}
                </p>
                <Link
                    to={`/anime/${anime.mal_id}`}
                    className="mt-4 inline-block btn-primary"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}

export default AnimeBanner

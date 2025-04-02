import React from 'react'
import AnimeGrid from '../components/AnimeGrid'
import { useTopAnimes, useUpcomingAnimes } from '../hooks/useAnimeData'
import AnimeBanner from '../components/AnimeBanner'

const Home: React.FC = () => {
    const {
        animes: topAnimes,
        loading: topLoading,
        error: topError,
    } = useTopAnimes(5)
    const {
        animes: upcomingAnimes,
        loading: upcomingLoading,
        error: upcomingError,
    } = useUpcomingAnimes(10)

    // Popular genres for the filter
    const popularGenres = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 4, name: 'Comedy' },
        { id: 8, name: 'Drama' },
        { id: 27, name: 'Shounen' },
        { id: 22, name: 'Romance' },
    ]

    return (
        <div>
            {/* Featured Anime Banner */}
            {!topLoading && topAnimes.length > 0 && (
                <AnimeBanner anime={topAnimes[0]} />
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Rated Anime */}
                <AnimeGrid
                    anime={topAnimes}
                    loading={topLoading}
                    error={topError}
                    title="Top Rated Anime"
                />

                {/* Upcoming Anime */}
                <AnimeGrid
                    anime={upcomingAnimes}
                    loading={upcomingLoading}
                    error={upcomingError}
                    title="Upcoming Anime"
                />

                {/* Browse by Genre */}
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4">Browse by Genre</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {popularGenres.map((genre) => (
                            <a
                                key={genre.id}
                                href={`/category/${genre.id}`}
                                className="block bg-card p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-200"
                            >
                                {genre.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

import React from 'react'
import AnimeGrid from '../components/AnimeGrid'
import { useTopAnime } from '../hooks/useAnimeData'

const Home: React.FC = () => {
    const {
        anime: topAnime,
        loading: topLoading,
        error: topError,
    } = useTopAnime()

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Top Rated Anime */}
                <AnimeGrid
                    anime={topAnime}
                    loading={topLoading}
                    error={topError}
                    title="Top Rated Anime"
                />
            </div>
        </div>
    )
}

export default Home

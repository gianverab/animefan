import React from 'react'
import { Anime } from '../../types'
import AnimeCard from './AnimeCard'
import Loading from '../common/Loading'

interface AnimeGridProps {
    anime: Anime[]
    loading: boolean
    error: string | null
    title?: string
}

const AnimeGrid: React.FC<AnimeGridProps> = ({
    anime,
    loading,
    error,
    title,
}) => {
    if (loading) return <Loading />

    if (error) return <div className="text-center text-red-500">{error}</div>

    if (anime.length === 0)
        return <div className="text-center">No anime found.</div>

    return (
        <div className="my-8">
            {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {anime.map((item) => (
                    <AnimeCard key={item.mal_id} anime={item} />
                ))}
            </div>
        </div>
    )
}

export default AnimeGrid

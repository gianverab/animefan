import React from 'react'
import { useParams } from 'react-router-dom'
import AnimeContent from '../components/AnimeContent'
import { useAnimeDetail } from '../hooks/useAnimeData'

const AnimeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const animeId = parseInt(id || '0')
    const { anime, loading, error } = useAnimeDetail(animeId)

    if (loading) return <div className="text-center">Loading...</div>

    if (error || !anime)
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Error loading anime details
                </h1>
                <p className="text-gray-400">Please try again later.</p>
            </div>
        )

    return (
        <>
            <AnimeContent anime={anime} />
        </>
    )
}

export default AnimeDetail

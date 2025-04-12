import React from 'react'
import { Anime } from '../../types'
import AnimeGrid from '../anime/AnimeGrid'

interface SearchResultsProps {
    results: Anime[]
    loading: boolean
    error: string | null
    query: string
}

const SearchResults: React.FC<SearchResultsProps> = ({
    results,
    loading,
    error,
    query,
}) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">
                Search Results for "{query}"
            </h1>

            <AnimeGrid anime={results} loading={loading} error={error} />
        </div>
    )
}

export default SearchResults

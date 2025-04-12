import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SearchResults from '../components/search/SearchResults'
import { useAnimeSearch } from '../hooks/useAnimeData'

const SearchPage: React.FC = () => {
    const location = useLocation()
    const queryParam = new URLSearchParams(location.search).get('q') || ''

    const { results, loading, error, setQuery } = useAnimeSearch()

    useEffect(() => {
        if (queryParam) {
            setQuery(queryParam)
        }
    }, [queryParam, setQuery])

    return (
        <SearchResults
            results={results}
            loading={loading}
            error={error}
            query={queryParam}
        />
    )
}

export default SearchPage

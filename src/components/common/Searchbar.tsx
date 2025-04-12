import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnimeSearch } from '../../hooks/useAnimeData'

const SearchBar: React.FC = () => {
    const { query, setQuery, results, loading } = useAnimeSearch()
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // Close the dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchRef])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setIsOpen(true)
    }

    const handleSelectAnime = (id: number) => {
        navigate(`/anime/${id}`)
        setQuery('')
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={searchRef}>
            <div className="flex items-center bg-gray-800 rounded-md">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search anime..."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                />
                {loading && (
                    <svg
                        className="animate-spin h-5 w-5 text-white mr-3"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-card rounded-md shadow-lg max-h-60 overflow-auto">
                    {results.map((anime) => (
                        <div
                            key={anime.mal_id}
                            className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSelectAnime(anime.mal_id)}
                        >
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                className="w-10 h-14 object-cover rounded"
                            />
                            <div className="ml-2">
                                <p className="text-sm font-medium">
                                    {anime.title}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {anime.year ? anime.year : 'N/A'} •{' '}
                                    {anime.episodes} eps
                                </p>
                            </div>
                        </div>
                    ))}
                    {results.length === 0 && (
                        <div className="p-2 text-gray-400">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default SearchBar

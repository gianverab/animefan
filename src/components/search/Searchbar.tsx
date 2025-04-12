import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
    onSearch?: () => void // Optional callback to handle any UI changes after search
    className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')

            // Call additional callback if provided (e.g., to close mobile menu)
            if (onSearch) {
                onSearch()
            }
        }
    }

    return (
        <form onSubmit={handleSearch} className={className}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
        </form>
    )
}

export default SearchBar

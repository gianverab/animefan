import { useState, useEffect } from 'react'
import { Anime } from '../types'
import {
    getTopAnimes,
    getAnimeById,
    getUpcomingAnimes,
    getSimilarAnimes,
    getAnimeByCategory,
    searchAnime,
} from '../services/api'

// Generate a random page between 1 and 10
function getSecureRandom(min: number, max: number): number {
    const range = max - min + 1
    const randomBuffer = new Uint32Array(1)
    window.crypto.getRandomValues(randomBuffer)
    return min + (randomBuffer[0] % range)
}
const randomPage = getSecureRandom(1, 10)

export const useTopAnimes = (page = randomPage, limit = 10) => {
    const [animes, setAnimes] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getTopAnimes(page, limit)
                setAnimes(data)
                setError(null)
            } catch (err) {
                setError('Error fetching top animes')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page, limit])

    return { animes, loading, error }
}

export const useUpcomingAnimes = (limit = 10) => {
    const [animes, setAnimes] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getUpcomingAnimes(limit)
                setAnimes(data)
                setError(null)
            } catch (err) {
                setError('Error fetching upcoming animes')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [limit])

    return { animes, loading, error }
}

export const useAnimeDetail = (id: number) => {
    const [anime, setAnime] = useState<Anime | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await getAnimeById(id)
                const data = response?.data
                setAnime(data)
                setError(null)
            } catch (err) {
                setError('Error fetching anime details')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    return { anime, loading, error }
}

export const useSimilarAnimes = (id: number) => {
    const [animes, setAnimes] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getSimilarAnimes(id)
                setAnimes(data)
                setError(null)
            } catch (err) {
                setError('Error fetching similar animes')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    return { animes, loading, error }
}

export const useAnimeByCategory = (category: string, limit = 20) => {
    const [animes, setAnimes] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getAnimeByCategory(category, limit)
                setAnimes(data)
                setError(null)
            } catch (err) {
                setError('Error fetching animes by category')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [category, limit])

    return { animes, loading, error }
}

export const useAnimeSearch = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Anime[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!query.trim()) {
                setResults([])
                return
            }

            try {
                setLoading(true)
                const data = await searchAnime(query)
                setResults(data)
                setError(null)
            } catch (err) {
                setError('Error searching anime')
            } finally {
                setLoading(false)
            }
        }

        const timeoutId = setTimeout(fetchData, 500)
        return () => clearTimeout(timeoutId)
    }, [query])

    return { query, setQuery, results, loading, error }
}

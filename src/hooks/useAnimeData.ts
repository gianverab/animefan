import { useState, useEffect } from 'react'
import { Anime } from '../types'
import { getTopAnimes, getAnimeById } from '../services/api'

export const useTopAnimes = (page = 1, limit = 10) => {
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
                setError('Error fetching top anime')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page, limit])

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

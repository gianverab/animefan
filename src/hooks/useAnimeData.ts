import { useState, useEffect } from 'react'
import { Anime } from '../types'
import { getTopAnime, getAnimeById } from '../services/api'

export const useTopAnime = (page = 1, limit = 10) => {
    const [anime, setAnime] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getTopAnime(page, limit)
                setAnime(data)
                setError(null)
            } catch (err) {
                setError('Error fetching top anime')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page, limit])

    return { anime, loading, error }
}

export const useAnimeDetail = (id: number) => {
    const [anime, setAnime] = useState<Anime | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getAnimeById(id)
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

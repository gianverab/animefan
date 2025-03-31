import { useState, useEffect } from 'react'
import { Anime } from '../types'
import { getTopAnimes, getAnimeById } from '../services/api'

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

import axios from 'axios'
import { Anime, AnimeResponse } from '../types'

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
})

// Delay function to avoid rate limiting on the Jikan API
api.interceptors.response.use(undefined, async (error) => {
    if (error.response && error.response.status === 429) {
        // Wait for 2 seconds and retray the request
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return api.request(error.config)
    }
    return Promise.reject(error)
})

export const getTopAnimes = async (
    page: number,
    limit: number
): Promise<Anime[]> => {
    try {
        const response = await api.get(`/top/anime?page=${page}&limit=${limit}`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching top anime:', error)
        return []
    }
}

export const getUpcomingAnimes = async (limit = 10): Promise<Anime[]> => {
    try {
        const response = await api.get(`/seasons/upcoming?limit=${limit}`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching upcoming anime:', error)
        return []
    }
}

export const getAnimeById = async (
    id: number
): Promise<AnimeResponse | null> => {
    const response = await api.get<AnimeResponse>(`/anime/${id}/full`)
    return response.data
}

export const getSimilarAnimes = async (id: number): Promise<Anime[]> => {
    try {
        const response = await api.get(`/anime/${id}/recommendations`)
        return response.data.data.map((item: any) => item.entry).slice(0, 6)
    } catch (error) {
        console.error('Error fetching similar anime:', error)
        return []
    }
}

export const getAnimeByCategory = async (
    category: string,
    limit = 20
): Promise<Anime[]> => {
    try {
        const response = await api.get(
            `/anime?genres=${category}&limit=${limit}`
        )
        return response.data.data
    } catch (error) {
        console.error('Error fetching anime by category:', error)
        return []
    }
}

export const searchAnime = async (query: string): Promise<Anime[]> => {
    if (!query.trim()) return []

    try {
        const response = await api.get(`/anime?q=${query}&limit=10`)
        return response.data.data
    } catch (error) {
        console.error('Error searching anime:', error)
        return []
    }
}

export default api

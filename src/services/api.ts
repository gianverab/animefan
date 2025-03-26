import axios from 'axios'
import { Anime, AnimeResponse } from '../types'

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
})

// Delay function to avoid rate limiting on the Jikan API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTopAnimes = async (page = 1, limit = 10): Promise<Anime[]> => {
    await delay(400) // Jikan API has a limit of 4 requests per second
    const response = await api.get(`/top/anime?page=${page}&limit=${limit}`)
    const animeData = response.data.data
    return animeData
}

export const getAnimeById = async (
    id: number
): Promise<AnimeResponse | null> => {
    await delay(400)
    const response = await api.get<AnimeResponse>(`/anime/${id}/full`)
    return response.data
}

export default api

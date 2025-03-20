import axios from 'axios'
import { Anime, PaginatedResponse } from '../types'

const baseURL = import.meta.env.VITE_API_BASE_URL
const api = axios.create({ baseURL })

// Delay function to avoid rate limiting on the Jikan API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTopAnime = async (
    page = 1,
    limit = 10
): Promise<PaginatedResponse<Anime>> => {
    await delay(400) // Jikan API has a limit of 4 requests per second
    const response = await api.get<PaginatedResponse<Anime>>(
        `/top/anime?page=${page}&limit=${limit}`
    )
    return response.data
}

export const getAnimeById = async (id: number): Promise<{ data: Anime }> => {
    await delay(400)
    const response = await api.get<{ data: Anime }>(`/anime/${id}/full`)
    return response.data
}

export default api

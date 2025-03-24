import axios from 'axios'
import { Anime } from '../types'

const api = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
})

// Delay function to avoid rate limiting on the Jikan API
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTopAnime = async (page = 1, limit = 10): Promise<Anime[]> => {
    await delay(400) // Jikan API has a limit of 4 requests per second
    const response = await api.get(`/top/anime?page=${page}&limit=${limit}`)
    const animeData = response.data.data
    return animeData
}

export const getAnimeById = async (id: number): Promise<Anime | null> => {
    await delay(400)
    const response = await api.get<Anime>(`/anime/${id}/full`)
    return response.data
}

export default api

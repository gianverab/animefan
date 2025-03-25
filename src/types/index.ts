export interface Genre {
    mal_id: number
    name: string
}

export interface Studio {
    mal_id: number
    name: string
}

export interface User {
    uid: string
    email: string | null
    displayName: string | null
}

export interface AnimeResponse {
    data: Anime
}
export interface Anime {
    mal_id: number
    title: string
    images: {
        jpg: {
            image_url: string
            large_image_url: string
        }
    }
    synopsis: string
    score: number
    year: number
    episodes: number
    genres: Genre[]
    studios: Studio[]
    trailer: {
        youtube_id: string
        url: string
    }
    status: string
    airing: boolean
}

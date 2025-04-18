import {
    doc,
    setDoc,
    getDoc,
    arrayUnion,
    arrayRemove,
    updateDoc,
} from 'firebase/firestore'
import { auth, db } from './firebaseConfig'

//const db = getFirestore();

export const addToFavorites = async (animeId: number): Promise<boolean> => {
    try {
        const user = auth.currentUser
        if (!user) return false

        const userRef = doc(db, 'favorites', user.uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            await updateDoc(userRef, {
                animeIds: arrayUnion(animeId),
            })
        } else {
            await setDoc(userRef, {
                animeIds: [animeId],
            })
        }

        return true
    } catch (error) {
        console.error('Error adding to favorites:', error)
        return false
    }
}

export const removeFromFavorites = async (
    animeId: number
): Promise<boolean> => {
    try {
        const user = auth.currentUser
        if (!user) return false

        const userRef = doc(db, 'favorites', user.uid)

        await updateDoc(userRef, {
            animeIds: arrayRemove(animeId),
        })

        return true
    } catch (error) {
        console.error('Error removing from favorites:', error)
        return false
    }
}

export const getFavorites = async (): Promise<number[]> => {
    try {
        const user = auth.currentUser
        if (!user) return []

        const userRef = doc(db, 'favorites', user.uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
            return docSnap.data().animeIds || []
        }

        return []
    } catch (error) {
        console.error('Error getting favorites:', error)
        return []
    }
}

export const isFavorite = async (animeId: number): Promise<boolean> => {
    try {
        const favorites = await getFavorites()
        return favorites.includes(animeId)
    } catch (error) {
        console.error('Error checking if favorite:', error)
        return false
    }
}

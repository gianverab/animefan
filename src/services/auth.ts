import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
} from 'firebase/auth'
import { auth } from './firebaseConfig'
import { User } from '../types'

export const registerUser = async (
    email: string,
    password: string
): Promise<User | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        return null
    }
}

export const loginUser = async (
    email: string,
    password: string
): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return null
    }
}

export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
    }
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user: FirebaseUser | null) => {
                unsubscribe()
                if (user) {
                    resolve({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    })
                } else {
                    resolve(null)
                }
            }
        )
    })
}

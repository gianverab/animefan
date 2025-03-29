import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/auth/AuthForm'

const SignIn: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const user = await login(email, password)
            if (user) {
                navigate('/')
            } else {
                setError('Failed to sign in. Please check your credentials.')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="bg-card p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <AuthForm
                    isSignUp={false}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
                <div className="mt-4 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-primary hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn

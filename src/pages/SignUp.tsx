import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/auth/AuthForm'

const SignUp: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const user = await register(email, password)
            if (user) {
                navigate('/')
            } else {
                setError(
                    'Failed to sign up. Please try with a different email.'
                )
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
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <AuthForm
                    isSignUp={true}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
                <div className="mt-4 text-center">
                    <p className="text-gray-400">
                        Already have an account{' '}
                        <Link
                            to="/signin"
                            className="text-primary hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp

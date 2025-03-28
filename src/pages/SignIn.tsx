import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SignIn: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (email: string, password: string) => {
        // Submit code goes here
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="bg-card p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                {/* AuthForm goes here */}
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

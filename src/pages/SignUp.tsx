import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SignUp: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (email: string, password: string) => {
        // Submit code goes here
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <div className="bg-card p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                {/* AuthForm goes here */}
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

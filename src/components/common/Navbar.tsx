import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Navbar: React.FC = () => {
    const { logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <nav className="bg-card shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-white">
                            AnimeFan
                        </Link>
                    </div>
                    {/* SearchBar goes here */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                            >
                                Home
                            </Link>
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/signin"
                                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                                    >
                                        Sign In
                                    </Link>
                                    <Link to="/signup" className="btn-primary">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout()
                                    setIsMenuOpen(false)
                                }}
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md w-full text-left"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
export default Navbar

import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-card mt-10 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-white">
                            AnimeFan
                        </h3>
                        <p className="text-sm text-gray-400">
                            Your ultimate anime discovery platform
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">About</span>
                            About
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Privacy</span>
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Terms</span>
                            Terms
                        </a>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} AnimeFan. All rights
                        reserved.
                    </p>
                    <p className="mt-1">Powered by Jikan API</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer

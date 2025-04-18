import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import Favorites from './pages/Favorites'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SearchPage from './pages/SearchPage'
import { AuthProvider } from './contexts/AuthContext'
import { FavoritesProvider } from './contexts/FavoriteContext'

function App() {
    return (
        <Router>
            <AuthProvider>
                <FavoritesProvider>
                    <div className="min-h-screen flex flex-col bg-background text-white">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/anime/:id"
                                    element={<AnimeDetail />}
                                />
                                <Route path="/signin" element={<SignIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route
                                    path="/search"
                                    element={<SearchPage />}
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </FavoritesProvider>
            </AuthProvider>
        </Router>
    )
}

export default App

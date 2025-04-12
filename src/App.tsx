import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SearchPage from './pages/SearchPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="bg-background min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/anime/:id" element={<AnimeDetail />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    )
}

export default App

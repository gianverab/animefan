import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
            </Routes>
        </Router>
    )
}

export default App

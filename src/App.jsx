import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import TravelGuide from './pages/TravelGuide'
import ResultsPage from './pages/ResultsPage'
import NYC from './pages/TravelGuide/NYC'
import Nav from './assets/Nav/Nav'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient' // Adjust the path if necessary
import { Footer } from './assets/Footer/Footer'
import NYCItineraries from './pages/TravelGuide/NYC/NycItineraries'
import NYCSee from './pages/TravelGuide/NYC/NycSee'
import NYCFood from './pages/TravelGuide/NYC/NycFood'
import LA from './pages/TravelGuide/LA'
import LAItineraries from './pages/TravelGuide/LA/LAItineraries'
import LASee from './pages/TravelGuide/LA/LASee'
import LAFood from './pages/TravelGuide/LA/LAFood.jsx'

import TopScroll from './TopScroll'
;<script async src="//www.instagram.com/embed.js"></script>

function App() {
    return (
        // <RouterProvider router={router}/>
        <BrowserRouter>
            <TopScroll />

            <div className="app-container">
                <Nav />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/travel-guide" element={<TravelGuide />} />
                        <Route path="/travel-guide/nyc" element={<NYC />} />
                        <Route
                            path="/travel-guide/nyc/itineraries"
                            element={<NYCItineraries />}
                        />
                        <Route
                            path="/travel-guide/nyc/see"
                            element={<NYCSee />}
                        />
                        <Route
                            path="/travel-guide/nyc/food"
                            element={<NYCFood />}
                        />
                        <Route path="/travel-guide/la" element={<LA />} />
                        <Route
                            path="/travel-guide/la/itineraries"
                            element={<LAItineraries />}
                        />
                        <Route
                            path="/travel-guide/la/see"
                            element={<LASee />}
                        />
                        <Route
                            path="/travel-guide/la/food"
                            element={<LAFood />}
                        />
                    </Routes>
                </main>
                <Footer className="footer" />
            </div>
        </BrowserRouter>
    )
}

export default App

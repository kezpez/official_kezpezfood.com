import React, { useEffect, useState } from 'react'
import { Button } from '../assets/Button/Button'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { LocationPin } from "../assets/Icons/LocationPin";
// import { ArrowRight } from "../assets/Button/ArrowRight";
// import { ArrowLeft } from "../assets/Button/ArrowLeft";
// import { Footer } from "../assets/Footer";
// import Nav from "../assets/Nav";// import { IconComponentNode } from "./IconComponentNode";
// import backgroundImage from '../assets/section-home.jpg'
import backgroundImage from '../assets/banner_photo_5.png'
import Reels from '../reels/reels' // adjust path if needed

import '../App.css'
import TravelGuide from '../pages/TravelGuide'
import profile from '../assets/Images/profile.jpg'
import la from '../assets/Images/la.jpg'
import { Link } from 'react-router-dom' // if you're using React Router
import { supabase } from '../supabaseClient' // Adjust the path if necessary

export default function HomePage() {
    const [cuisine, setCuisine] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()
    const [cuisines, setCuisines] = useState([])
    const cityDistrictMap = {
        LA: [
            'Koreatown',
            'Art District',
            'Thai Town',
            'West Hollywood',
            'Mid-Wilshire',
            'DTLA',
            'Pasadena',
            'Arcadia',
            'Gardena',
            'Sawtelle',
            'Little Tokyo',
            'Echo Park',
        ],
        NYC: [
            'Koreatown',
            'East Village',
            'Midtown',
            'West Village',
            'Nolita',
            'Lower East Side',
            'Nolita',
            'Chinatown',
            'Brooklyn',
            'Chelsea',
            'Upper East Side',
        ],
    }

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (cuisine) params.set('cuisine', cuisine)
        if (city) params.set('city', city)
        if (district) params.set('district', district)
        if (price) params.set('price', price)
        const qs = params.toString()
        navigate(`/results${qs ? `?${qs}` : ''}`)
    }

    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        const fetchRestaurant = async () => {
            console.log('Running fetch with filters:', {
                cuisine,
                city,
                district,
                price,
            })

            let query = supabase.from('restaurants').select('*')

            // apply only non-empty filters
            if (cuisine) query = query.eq('cuisine', cuisine)
            if (city) query = query.eq('city', city)
            if (district) query = query.eq('district', district)
            if (price) query = query.eq('price', price) // <= watch DB type/values

            const { data, error } = await query

            if (error) {
                console.error('Supabase error:', error)
                setRestaurant([]) // avoid leaving null
            } else {
                setRestaurant(data)
            }
        }

        fetchRestaurant()
    }, [cuisine, city, district, price])

    return (
        <div
            className="page"
            style={{
                width: '100vw',
            }}
        >
            <div
                className="section-home"
                style={{
                    backgroundImage: `url("${backgroundImage}")`,
                    backgroundSize: 'cover',
                    height: '100vh',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
            >
                <div className="container">
                    <div className="filter-title">
                        <div className="one-line-diff-text">
                            <div
                                className="outfit-font white"
                                style={{ fontSize: '40px' }}
                            >
                                WHAT ARE YOU CRAVING?
                            </div>
                            {/* <div
                                className="kelsi-font white"
                                style={{ fontSize: '41px' }}
                            >
                                CRAVING
                            </div> */}
                            {/* <div className="h1-white">?</div> */}
                        </div>
                        <p className="p2-white">
                            I’ll help you find where to eat at tonight!
                        </p>
                    </div>
                    <div className="filter">
                        <select
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                        >
                            <option value="">Select Cuisine</option>
                            <option value="American">American</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Italian">Italian</option>
                            <option value="Korean">Korean</option>
                            <option value="Cafe">Cafe</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Matcha">Matcha</option>

                            {/* {cuisines.map((c) => (
                                <option key={c.id} value={c.name}>
                                    {c.name}
                                </option>
                            ))} */}
                        </select>

                        <select
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value)
                                setDistrict('') // reset district when city changes
                            }}
                        >
                            <option value="">Select city</option>
                            <option value="LA">LA</option>
                            <option value="NYC">NYC</option>
                        </select>

                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                            <option value="">Select district</option>
                            {city &&
                                cityDistrictMap[city]?.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                        </select>
                        <select
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                            <option value="">Select price</option>
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                        </select>
                        <Button
                            className="button-pink-text"
                            text="Find Restaurant"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            </div>
            <div className="section-location">
                <div className="container">
                    <div className="small-container">
                        <div className="div-title">
                            <div className="h1-black">
                                WHERE ARE YOU EATING?
                            </div>
                            <p className="p2-black">
                                Click one of the city locations to view the
                                city's food recommendations
                            </p>
                        </div>
                        <div className="div-buttons">
                            <Button
                                className="button-instance-pink"
                                text="Los Angeles"
                                to="/travel-guide/la"
                            />
                            <Button
                                className="button-instance-pink"
                                text="New York City"
                                to="/travel-guide/nyc"
                            />
                        </div>
                    </div>
                </div>
                <div className="container-no-margin">
                    <div className="h3-black">DISCOVER</div>
                    <div className="p2-black">
                        Click the images to view my Insta reels!
                    </div>

                    <Reels />
                </div>

                {/* <div className="container-no-margin">
                    <div className="h3-black">DISCOVER</div>
                    <div className="container-reels">
                        <div className="reel-cover">
                            <div>
                                {restaurant && (
                                    <img
                                        className="img"
                                        src={
                                            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/konban_1.jpg'
                                        }
                                        alt="Konban"
                                    />
                                )}{' '}
                            </div>
                            <div className="div-caption">
                                <div className="h4-white">Konban</div>
                                <div className="p3-white">NYC</div>
                            </div>
                        </div>

                        <div className="reel-cover">
                            <div>
                                {restaurant && (
                                    <img
                                        className="img"
                                        src={
                                            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/la/kanomwaan.jpg'
                                        }
                                        alt="Kanomwaan"
                                    />
                                )}{' '}
                            </div>
                            <div className="div-caption">
                                <div className="h4-white">Kanomwaan</div>
                                <div className="p3-white">LA</div>
                            </div>
                        </div>

                        <div className="reel-cover">
                            <div>
                                {restaurant && (
                                    <img
                                        className="img"
                                        src={
                                            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/sorate_2.jpg'
                                        }
                                        alt="Sorate"
                                    />
                                )}{' '}
                            </div>
                            <div className="div-caption">
                                <div className="h4-white">Sorate</div>
                                <div className="p3-white">NYC</div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="section-travel-guide">
                <div className="travel-guide-vector"></div>
                <div className="container-guide">
                    <div className="div-title-center">
                        <div className="h2-black">
                            EXPLORE MY TRAVEL GUIDES!
                        </div>
                        <div className="p1-black">
                            These travel guides include detailed itineraries and
                            food recommendations.{' '}
                        </div>
                    </div>
                    <div className="container-guide-cards">
                        <div className="guide-card">
                            <Link to="/travel-guide/la">
                                <img src={la} alt="LA guide" />
                                <div className="div-title">
                                    <div className="h3-black">LOS ANGELES</div>
                                    <div className="p2-black">
                                        Best Korean restaurants, tacos to eat,
                                        and beaches to visit
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="guide-card">
                            <Link to="/travel-guide/nyc">
                                <img
                                    src="https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc.jpg"
                                    alt="NYC guide"
                                />
                                <div className="div-title">
                                    <div className="h3-black">NEW YORK</div>
                                    <div className="p2-black">
                                        Best pizza, stores to shop at, and
                                        endless food to eat
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="guide-card">
                            <img
                                src="https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/singapore.jpg"
                                alt="Singapore guide"
                            />
                            <div className="div-title">
                                <div className="h3-black">SINGAPORE</div>
                                <div className="p2-black">Coming soon...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-about-me">
                <div className="container-bio">
                    <div className="circular-image">
                        <img src={profile} alt="profile" />
                    </div>
                    <div className="div-title">
                        <div className="h3-black">Hi! I'm Kezia!</div>
                        <div className="p1-black">
                            I’m a huge foodie, love traveling, trying new
                            things, and exploring. I post on my food account
                            which is @kezpezfood. I created this website to
                            organize my posts and food recommendations.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

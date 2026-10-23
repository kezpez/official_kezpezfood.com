import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../supabaseClient' // Adjust the path if necessary
import la from '../assets/Images/la.jpg'
import '../App.css'
import GoogleMaps from '../google_maps/GoogleMaps'
import { googleMapsLink } from '../googleMapsLink'

export default function ResultsPage() {
    const [searchParams] = useSearchParams()
    // Get the filter values from the search parameters
    const cuisine = searchParams.get('cuisine')
    const district = searchParams.get('district')
    const city = searchParams.get('city')
    const price = searchParams.get('price')
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
    const mapRef = useRef(null)

    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const clean = (v) => (v ?? '').trim()

        const fetchRestaurants = async () => {
            setLoading(true)
            setErrorMsg('')
            console.log('Filters:', { cuisine, district, city, price })

            let query = supabase.from('restaurants').select('*')

            // ilike = case-insensitive. Cuisine uses %…% so "Korean BBQ" or
            // "Korean, Japanese" still match a "Korean" search.
            if (clean(cuisine))
                query = query.ilike('cuisine', `%${clean(cuisine)}%`)
            if (clean(district))
                query = query.ilike('district', clean(district))
            if (clean(city)) query = query.ilike('city', clean(city))
            if (clean(price)) query = query.eq('price', clean(price))

            const { data, error } = await query

            if (error) {
                console.error('Error fetching data:', error)
                setErrorMsg(error.message)
                setRestaurants([])
            } else {
                console.log('Supabase Data:', data)
                setRestaurants(data ?? [])
            }
            setLoading(false)
        }

        fetchRestaurants()
    }, [cuisine, district, city, price])

    const heading = [
        'Restaurants',
        cuisine && `for ${cuisine} food`,
        (district || city) &&
            `in ${[district, city].filter(Boolean).join(', ')}`,
    ]
        .filter(Boolean)
        .join(' ')

    function formatCityName(city) {
        return city ? city.toLowerCase() : 'default_city'
    }

    return (
        <div
            className="page"
            style={{
                width: '100vw',
            }}
        >
            <div className="section-results">
                <div className="container-results">
                    <div className="h2-black">{heading}</div>
                </div>
                <div className="section-map-sidebar">
                    <div className="results-list">
                        {loading ? (
                            <div className="p1-black">Loading…</div>
                        ) : errorMsg ? (
                            <div className="p1-black">
                                Couldn't load restaurants: {errorMsg}
                            </div>
                        ) : restaurants.length === 0 ? (
                            <div className="p1-black">
                                No restaurants found.
                            </div>
                        ) : (
                            restaurants.map((restaurant) => (
                                <div
                                    className="rest-card"
                                    onClick={() =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                    onMouseEnter={() =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant,
                                            12
                                        )
                                    } // optional zoom
                                >
                                    <div className="rest-card-content">
                                        <img
                                            className="rest-card-image"
                                            src={`https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/${restaurant.images}.jpg`}
                                            alt={`${restaurant.name}`}
                                            onError={(e) => {
                                                e.target.src = la // fallback image if the restaurant image is missing
                                            }}
                                        />
                                        <div className="rest-card-details">
                                            <div className="restaurant-name p1-black">
                                                {restaurant.name}
                                            </div>
                                            {/* <div className="p2-black">{restaurant.restaurant}</div> */}
                                            <div className="rest-card-info">
                                                <span>
                                                    📍 {restaurant.district},{' '}
                                                    {restaurant.city}
                                                </span>{' '}
                                                <span>
                                                    🍽️ {restaurant.cuisine}
                                                </span>
                                            </div>
                                            <div className="rest-card-tags">
                                                <span>🌊 Casual</span>{' '}
                                                <span>{restaurant.price}</span>
                                            </div>
                                            {googleMapsLink(restaurant) && (
                                                <a
                                                    className="rest-card-maps-link"
                                                    href={googleMapsLink(
                                                        restaurant
                                                    )}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    Open in Google Maps ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="map">
                        <GoogleMaps
                            ref={mapRef}
                            restaurants={restaurants}
                            apiKey={apiKey}
                        />
                    </div>
                    {/* <iframe
                            className="custom-map-iframe"
                            src="https://www.google.com/maps/d/u/0/embed?mid=1hucYSO0JWT5UZ8U6xB39tgHXz59dUXs&ehbc=2E312F"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="NYC Food Map"
                        /> */}
                </div>
            </div>
        </div>
    )
}

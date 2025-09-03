import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import background_image_la from '../../../assets/Images/la.jpg'
import Dropdown from '../../../assets/Dropdown/Dropdown'
import GoogleMaps from '../../../google_maps/GoogleMaps'
import { supabase } from '../../../supabaseClient'

export default function LAFood() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
    const mapRef = useRef(null)
    const [restaurants, setRestaurants] = useState([])
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Food')
    const tabRoutes = {
        Food: '/travel-guide/la/food',
        See: '/travel-guide/la/see', // you said you want this for See
        Itineraries: '/travel-guide/la/itineraries',
    }
    const sectionStyles = {
        backgroundImage: `url("${background_image_la}")`,
        backgroundSize: 'cover',
        height: '50vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
    useEffect(() => {
        const fetchRestaurants = async () => {
            const { data, error } = await supabase
                .from('restaurants')
                .select('*')
                .eq('city', 'la')

            if (error) {
                console.error(error)
            } else {
                console.log('Fetched restaurants:', data)
                setRestaurants(data)
            }
        }

        fetchRestaurants()
    }, [])
    const mapRestaurantToDropdownItem = (r) => ({
        title: r.name, // your Supabase column
        caption: r.rating, // whatever field makes sense
        image: r.images
            ? `https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/${r.images}.jpg`
            : null,
        lat: r.lat,
        lng: r.lng,
        ...r, // keep all other fields in case you need them
    })
    const tacos = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.cuisine === 'Tacos')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const la_ktown = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.district === 'Koreatown')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const la_matcha = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.cuisine === 'Matcha')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const little_tokyo = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.district === 'Little Tokyo')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const la_dessert = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.cuisine === 'Dessert')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    return (
        <div
            className="itinerary-page"
            style={{
                height: '2000px',
                width: '100vw',
                marginBottom: '200px',
            }}
        >
            <div className="page" style={{ height: '100vh', width: '100vw' }}>
                <div className="short-header-image" style={sectionStyles}>
                    <div className="div-title-center">
                        <div className="nyc-title">LOS ANGLES</div>
                        <div className="h4-white">My recommended LA eats!</div>
                    </div>
                </div>
                <div className="section-tabs">
                    {/* Tabs */}
                    <div className="tabs">
                        {['Food', 'See', 'Itineraries'].map((tab) => (
                            <button
                                key={tab}
                                className={`tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab(tab)
                                    navigate(tabRoutes[tab])
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Itinerary content */}
                    {activeTab === 'Food' && (
                        <>
                            <div className="trip-description">
                                <h2>Food to eat in LA!</h2>
                                <p>
                                    If it’s your first time in LA, here is
                                    everything you need to try! From my the best
                                    matchas, tacos, to Korean food, I got you!
                                </p>
                            </div>
                        </>
                    )}

                    {activeTab !== 'Food' && (
                        <div className="coming-soon">
                            <p>Content for {activeTab} coming soon!</p>
                        </div>
                    )}
                </div>
                <div className="section-map-sidebar">
                    <div className="map">
                        <GoogleMaps
                            ref={mapRef}
                            restaurants={restaurants}
                            apiKey={apiKey}
                        />
                    </div>
                    <div className="sidebar">
                        <div className="container">
                            <div className="div-title-2">
                                <div className="p2-black">LA</div>
                                <div className="h3-black">Best food in LA</div>
                            </div>
                            <div className="div-dropdown">
                                <Dropdown
                                    title="Where To Eat Tacos"
                                    columns={tacos}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Top Koreatown Restaurants"
                                    columns={la_ktown}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Favorite Matcha Cafes"
                                    columns={la_matcha}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Little Tokyo and Sawtelle Favs"
                                    columns={little_tokyo}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Sweet Treats"
                                    columns={la_dessert}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

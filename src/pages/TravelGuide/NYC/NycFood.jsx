import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import background_image_nyc from '../../../assets/Images/nyc-image.png'
import Dropdown from '../../../assets/Dropdown/Dropdown'
import GoogleMaps from '../../../google_maps/GoogleMaps'
import { supabase } from '../../../supabaseClient'

export default function NYCFood() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
    const mapRef = useRef(null)
    const [restaurants, setRestaurants] = useState([])
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Food')
    const tabRoutes = {
        Food: '/travel-guide/nyc/food',
        See: '/travel-guide/nyc/see', // you said you want this for See
        Itineraries: '/travel-guide/nyc/itineraries',
    }
    const sectionStyles = {
        backgroundImage: `url("${background_image_nyc}")`,
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
                .eq('city', 'nyc')

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
        food_type: r.food_type,
        lat: r.lat,
        lng: r.lng,
        ...r, // keep all other fields in case you need them
    })
    const pizza = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.food_type === 'pizza')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    // food_type: r.food_tyle,

                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const chinatown = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.district === 'Chinatown')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    // food_type: r.food_tyle,

                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const west_village = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.district === 'West Village')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    // food_type: r.food_tyle,

                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const bagels = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.food_type === 'bagels')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    // food_type: r.food_tyle,
                    image: r.images, // <-- whatever your Supabase column is called
                    lat: r.lat,
                    lng: r.lng,
                })),
        },
    ]
    const dessert = [
        {
            heading: '',
            items: restaurants
                .filter((r) => r.cuisine === 'Dessert')
                .map((r) => ({
                    name: r.name,
                    caption: r.rating,
                    // food_type: r.food_tyle,
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
                height: '1500px',
                width: '100vw',
                marginBottom: '200px',
            }}
        >
            <div className="page" style={{ height: '100vh', width: '100vw' }}>
                <div className="short-header-image" style={sectionStyles}>
                    <div className="div-title-center">
                        <div className="nyc-title">NYC</div>
                        <div className="h4-white">My recommended NYC eats!</div>
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
                                <h2>Food to eat in NYC!</h2>
                                <p>
                                    If it’s your first time in NYC, here is
                                    everything you need to try! From my favorite
                                    pizzas, chinatown street food, to fancy
                                    restaurants I got you!
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
                                <div className="p2-black">NYC</div>
                                <div className="h3-black">Best food in NYC</div>
                            </div>
                            <div className="div-dropdown">
                                <Dropdown
                                    title="Best Pizzas in NYC"
                                    columns={pizza}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Cheap Eats in Chinatown"
                                    columns={chinatown}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Best Bagels"
                                    columns={bagels}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="West Village Favs"
                                    columns={west_village}
                                    onItemClick={(restaurant) =>
                                        mapRef.current?.panToRestaurant(
                                            restaurant
                                        )
                                    }
                                />
                                <Dropdown
                                    title="Sweet Treats"
                                    columns={dessert}
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

// const pizza = [
//     {
//         // heading: 'MORNING',
//         items: [
//             {
//                 title: "L'industrie",
//                 caption:
//                     'Address: 254 S 2nd St (Brooklyn) \n104 Christopher St (West Village)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/lindustrie_1.jpg',
//             },
//             {
//                 title: 'Rubirosa',
//                 caption: 'Address: 235 Mulberry St (Nolita)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/rubirosa_1.jpg',
//             },
//             {
//                 title: 'Price Street Pizza',
//                 caption: 'Address: 27 Prince St (Nolita)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/prince_st_1.jpg',
//             },
//             {
//                 title: 'Grand Street Pizza',
//                 caption: 'Address: 384 Grand St (Lower East Side)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/grand_st_pizza_1.jpg',
//             },
//             {
//                 title: 'Lucia Pizza',
//                 caption: 'Address: 375 Canal St (Soho)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/lucia_pizza_1.jpg',
//             },
//         ],
//     },
// ]

// const chinatown = [
//     {
//         // heading: 'MORNING',
//         items: [
//             {
//                 title: 'Mei Lai Wah (Bakery)',
//                 caption: 'Address: 41 Mott St',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/mei_lai_1.jpg',
//             },
//             {
//                 title: "Tonii's Fresh Rice Noodle (street food)",
//                 caption: 'Address: 83 Bayard St',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/cheung_fun.jpg',
//             },
//             {
//                 title: 'Cheong Fun Cart (street food)',
//                 caption: 'Address: 159 Hester St',
//             },
//             {
//                 title: 'Chang Lai Fishballs Noodles (street food)',
//                 caption: 'Address: 55 Bayard St Store B',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/fishball_1.jpg',
//             },

//             {
//                 title: 'West New Malaysia',
//                 caption: 'Address: 69 Bayard St',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/west_new_malaysia_1.jpg',
//             },
//             {
//                 title: 'Nyonya',
//                 caption: 'Address: 199 Grand St',
//             },
//             {
//                 title: 'Uncle Lou 快樂人',
//                 caption: 'Address: 73 Mulberry St',
//             },
//             {
//                 title: 'House of Joy',
//                 caption: 'Address: 28 Pell St',
//             },
//             {
//                 title: 'Noodle Village',
//                 caption: 'Address: 70 Mott St',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/noodle_village_1.jpg',
//             },
//         ],
//     },
// ]

// const westVillage = [
//     {
//         // heading: 'MORNING',
//         items: [
//             {
//                 title: 'Raku',
//                 caption:
//                     'Address: 3 locations across NYC \n(West Village, East Village, Upper West Village',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/raku_1.jpg',
//             },
//         ],
//     },
// ]
// const bagels = [
//     {
//         // heading: 'MORNING',
//         items: [
//             {
//                 title: 'Pop up Bagel',
//                 caption: 'Address: Multiple locations across NYC',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/pop_up_1.jpg',
//             },
//             {
//                 title: "Leon's Bagels",
//                 caption: 'Address: 181 Mulberry St & 169 Thompson St',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/leons_1.jpg',
//             },
//             {
//                 title: 'Tompkins Square Bagels',
//                 caption: 'Address: 3 locations in the East Village',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/tompkins_1.jpg',
//             },
//             {
//                 title: 'Apollo Bagel',
//                 caption: 'Address: Multiple locations across NYC',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/apollo_bagel_1.jpg',
//             },
//             {
//                 title: 'Essa Bagel',
//                 caption: 'Address: Multiple locations across NYC',
//             },
//             {
//                 title: 'Brooklyn Bagel & Coffee Company',
//                 caption: 'Address: A few locations across NYC',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/brooklyn_bagel_1.jpg',
//             },
//             {
//                 title: 'Utopia Bagels',
//                 caption: 'Address: 120 E 34th St',
//             },
//         ],
//     },
// ]

// const dessert = [
//     {
//         // heading: 'MORNING',
//         items: [
//             {
//                 title: 'Magnolia Bakery',
//                 caption: 'Address: Multiple locations across NYC',
//             },
//             {
//                 title: 'Caffè Panna',
//                 caption:
//                     'Address: 77 Irving Pl (East Village),\n 16 Norman Ave (Brooklyn)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/caffe_panna_1.jpg',
//             },
//             {
//                 title: 'Ferrara Bakery & Cafe',
//                 caption: 'Address: 195 Grand St (Little Italy)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/ferrara_1.jpg',
//             },
//             {
//                 title: 'Levain Cookies',
//                 caption: 'Address: Multiple locations',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/levain_1.jpg',
//             },
//             {
//                 title: 'Cha-An',
//                 caption: 'Address: 230 E 9th St 2nd Fl (East Village)',
//             },
//             {
//                 title: 'The Little One',
//                 caption: 'Address: 150 E Broadway (LES)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/little_one_1.jpg',
//             },
//             {
//                 title: 'Van Leeuwen Ice Cream',
//                 caption: 'Address: Multiple locations',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/van_leeuwen_1.jpg',
//             },
//             {
//                 title: 'Mango Mango',
//                 caption: 'Address: Multiple locations (Chinatown, EV)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/mango_mango_1.jpg',
//             },
//             {
//                 title: 'Chinatown Ice Cream Factory',
//                 caption: 'Address: 65 Bayard St (Chinatown)',
//                 image: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/chinatown_ice_cream_1.jpg',
//             },
//         ],
//     },
// ]

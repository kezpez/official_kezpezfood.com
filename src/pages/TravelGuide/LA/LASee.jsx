import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background_image_la from '../../../assets/Images/la.jpg'

export default function LASee() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('See')
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
    const images = {
        getty_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/getty_1.jpg',
        santa_monica_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/santa_monica_1.jpg',
        griffith_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/griffith_1.jpg',
        broad_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/broad_1.jpg',
        lacma_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/lacma_1.jpg',
    }

    return (
        <div
            className="itinerary-page"
            style={{
                height: '4000px',
                width: '100vw',
                marginBottom: '200px',
            }}
        >
            <div className="page" style={{ width: '100vw' }}>
                <div className="short-header-image" style={sectionStyles}>
                    <div className="div-title-center">
                        <div className="nyc-title">LOS ANGELES</div>
                        <div className="h4-white">
                            What I recommend seeing in LA!
                        </div>
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
                    {activeTab === 'See' && (
                        <>
                            <div className="trip-description">
                                <h2>
                                    Here are my favorite places to see and visit
                                    in LA!
                                </h2>
                                <p>
                                    From museums, observatories, to shopping
                                    districts, I got you!
                                </p>
                            </div>
                        </>
                    )}

                    {activeTab !== 'See' && (
                        <div className="coming-soon">
                            <p>Content for {activeTab} coming soon!</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="section-itinerary">
                <div className="section-image-caption">
                    <div className="div-title-2">
                        <div className="h3-black">MUST SEE IN LA</div>
                    </div>
                    <div className="container-images">
                        {/* <a
                                                href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                                                target="_blank" //ensures link opens in a new tab
                                                rel="noopener noreferrer" //improves security when opening external links
                                                className="reel-cover-link"
                                                > */}
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.getty_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">The Getty</div>
                                <div className="p2-black">Brentwood</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.santa_monica_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    Santa Monica Pier
                                </div>
                                <div className="p2-black">Santa Monica</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.griffith_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    Griffith Observatory
                                </div>
                                <div className="p2-black">Griffith Park</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-image-caption">
                    <div className="div-title-2">
                        <div className="h3-black">FAVORITE LA MUSEUMS</div>
                    </div>
                    <div className="container-images">
                        {/* <a
                                                href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                                                target="_blank" //ensures link opens in a new tab
                                                rel="noopener noreferrer" //improves security when opening external links
                                                className="reel-cover-link"
                                                > */}
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.getty_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">The Getty</div>
                                <div className="p2-black">Brentwood</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.broad_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">The Broad</div>
                                <div className="p2-black">DTLA</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.lacma_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    Los Angeles County Museum of Art (LACMA)
                                </div>
                                <div className="p2-black">La Brea</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

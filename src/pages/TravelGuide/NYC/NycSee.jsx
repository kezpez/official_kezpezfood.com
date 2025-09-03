import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background_image_nyc from '../../../assets/Images/nyc-image.png'

export default function NYCSee() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('See')
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
    const images = {
        statue_liberty_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/statue_liberty_1.png',
        central_park_1:
            'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/central_park_1.jpg',
        met_1: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/met_1.jpg',
        moma_1: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/moma_1.jpg',
        mnh_1: 'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/sightings/mnh_1.jpg',
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
                    {activeTab === 'See' && (
                        <>
                            <div className="trip-description">
                                <h2>
                                    Here are my favorite places to see and visit
                                    in NYC!
                                </h2>
                                <p>
                                    From museums, observatories, to shopping
                                    districts, I got you! Content is coming
                                    soon!
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
                        <div className="h3-black">MUST SEE IN NYC</div>
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
                                    backgroundImage: `url(${images.central_park_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">Central Park</div>
                                <div className="p2-black">Uptown</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.statue_liberty_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    Statue of Liberty
                                </div>
                                <div className="p2-black">NYC</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.moma_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    The Metropolitan Museum of Art (MET){' '}
                                </div>
                                <div className="p2-black">Upper East Side</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-image-caption">
                    <div className="div-title-2">
                        <div className="h3-black">FAVORITE NYC MUSEUMS</div>
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
                                    backgroundImage: `url(${images.met_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    The Metropolitan Museum of Art (MET)
                                </div>
                                <div className="p2-black">Upper East Side</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.moma_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    Museum of Modern Art (MoMA)
                                </div>
                                <div className="p2-black">Midtown</div>
                            </div>
                        </div>
                        <div className="image-caption">
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url(${images.mnh_1})`,
                                }}
                            ></div>
                            <div className="div-caption">
                                <div className="h4-black">
                                    American Museum of Natural History
                                </div>
                                <div className="p2-black">Upper West Side</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

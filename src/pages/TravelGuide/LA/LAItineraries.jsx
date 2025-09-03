import { useState } from 'react'
import Dropdown from '../../../assets/Dropdown/Dropdown'
import { useNavigate } from 'react-router-dom'
import background_image_la from '../../../assets/Images/la.jpg'

export default function LAItineraries() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Itineraries')
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
    const day1Columns = [
        {
            heading: 'MORNING',
            items: [
                {
                    name: 'Coffee and Pastries',
                    caption:
                        'Stop by echo park or silverlake for coffee (my favorite cafe in that area is Stereoscope)',
                },
                {
                    name: 'Griffith Observatory',
                    caption:
                        'Park at the Greek theater parking lot then take the shuttle bus to the Griffith Observatory!',
                },
                {
                    name: 'Enjoy Views and Observatory',
                    caption:
                        'Enjoy the views and museum there. You can also see the Hollywood sign too! If u like hiking there is a hiking trail to the Hollywood sign',
                },
            ],
        },
        {
            heading: 'NOON',
            items: [
                {
                    name: 'Lunch in Thai Town',
                    caption:
                        'Luv2eat Thai Bistro, Amphai Northern Thai Food Club, Sanamluang Cafe Hollywood, Sapp Coffee Shop Thai Restaurant, Heng Heng Chicken Rice',
                },
                {
                    name: 'Walk along the Hollywood Walk of Fame',
                    caption:
                        'Take photos with the star of your favorite celebrity!',
                },
            ],
        },
        {
            heading: 'EVENING',
            items: [
                {
                    name: 'Dinner: KBBQ in K-town',
                    caption:
                        'Gangnam Station BBQ, Choesun Galbee, Quarters Korean BBQ, Meat Love, Seoul Soul BBQ, Road to Seoul',
                },
                {
                    name: 'Dessert: Koreatown',
                    caption: 'Oakobing, Melo Melo, SOMISOMI, Honeymee',
                },
                {
                    name: 'karaoke in K-town!',
                    caption: 'Gaam Karaoke, YD Karaoke Studio',
                },
                {
                    name: 'Late night tacos or pochas',
                    caption: 'There are taco trucks on every corner in k-town!',
                },
            ],
        },
    ]

    const day2Columns = [
        {
            heading: 'MORNING',
            items: [
                {
                    name: 'Classic LA brunch',
                    caption: 'Community Goods, Republique, Zinque',
                },
                {
                    name: 'Walk along the famous Rodeo Drive',
                    caption: 'Celebrity siting time',
                },
                {
                    name: 'Try the viral Erewhon Haliey Beiber smoothie',
                    caption:
                        'You have to see for yourself if the $20 smoothie is worth it',
                },
            ],
        },
        {
            heading: 'NOON',
            items: [
                {
                    name: 'The Getty',
                    caption: 'The most beautiful museum in LA',
                },
                {
                    name: 'Santa Monica',
                    caption: 'Visit the famous Santa Monica Pier',
                },
                {
                    name: 'Beach Picnic Time',
                    caption: 'Stop by Trader Joes for picnic food',
                },
            ],
        },
        {
            heading: 'EVENING',
            items: [
                {
                    name: 'Dinner: Sunset dinner overlooking the ocean',
                    caption: 'Élephante, Din Tai Fung',
                },
                {
                    name: 'Drive through the Venice Canals',
                    caption: 'Cute photos!',
                },
                {
                    name: 'Late night In-n-out or Tacos',
                    caption:
                        'Try LA`s most famous burgers or Brother`s Cousins ',
                },
            ],
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
                        <div className="nyc-title">LOS ANGELES</div>
                        <div className="h4-white">
                            My recommended LA itinerary!
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
                    {activeTab === 'Itineraries' && (
                        <>
                            <div className="trip-description">
                                <h2>2 day weekend trip to Los Angeles!</h2>
                                <p>
                                    If it’s your first time in LA, here is
                                    everything you need to do and eat in just 2
                                    days!
                                </p>
                            </div>
                        </>
                    )}

                    {activeTab !== 'Itineraries' && (
                        <div className="coming-soon">
                            <p>Content for {activeTab} coming soon!</p>
                        </div>
                    )}
                </div>
                <div className="section-dropdown">
                    <Dropdown
                        title="Day 1: Griffith Observatory, Hollywood, Thai Town, K-town"
                        columns={day1Columns}
                    />
                    <Dropdown
                        title="Day 2: West Hollywood, Getty, Santa Monica, and the Beach"
                        columns={day2Columns}
                    />
                    {/* <Dropdown title="Day 3: Sunday" columns={day3Columns} /> */}
                </div>
            </div>
        </div>
    )
}

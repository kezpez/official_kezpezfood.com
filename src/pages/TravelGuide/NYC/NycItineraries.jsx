import { useState } from 'react'
import Dropdown from '../../../assets/Dropdown/Dropdown'
import { useNavigate } from 'react-router-dom'
import background_image_nyc from '../../../assets/Images/nyc-image.png'

export default function NYCItineraries() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Itineraries')
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
    const day1Columns = [
        {
            heading: 'MORNING',
            items: [
                {
                    name: 'Breakfast: Bagels at Apollo Bagels',
                    caption:
                        'Apollo Bagel, Tompkins Bagels, Pop-up Bagels, Leon’s Bagels',
                },
                {
                    name: 'Coffee Break',
                    caption: 'La Cabra Bakery, Fellini Coffee Soho, 787 Coffee',
                },
                {
                    name: 'Statue of Liberty and Ellis Island',
                    caption:
                        'Visit the Ellis Island Museum and snap some photos at the Statue of Liberty',
                },
                {
                    name: '9/11 Memorial & World Trade Center',
                    caption:
                        'Visit the 9/11 Memorial museum\nSee the NYC skyline from One World Observatory\nShop at the Oculus',
                },
            ],
        },
        {
            heading: 'NOON',
            items: [
                {
                    name: 'Lunch: Chinatown food crawl',
                    caption: 'House of Joy, Golden Unicorn, Dim Sum Palace',
                },
                {
                    name: 'Shop in SoHo and NoHo',
                    caption: 'So many cute stores and boutiques',
                },
                {
                    name: 'Matcha Break',
                    caption:
                        'Sorate, 12 Matcha, Kettl, Matcha House, Isshiki Matcha',
                },
                {
                    name: 'Rockefeller Center',
                    caption:
                        'Visit the famous Rockefeller Center, Shop some more on Fifth Ave! (You can choose to shop either in Soho or on Fifth Ave depending on the length of your stay',
                },
            ],
        },
        {
            heading: 'EVENING',
            items: [
                {
                    name: 'Dinner: Variety of Cuisines',
                    caption: 'Tonchin',
                },
                {
                    name: 'Watch a Broadway Show!',
                    caption:
                        "Maybe Happy Ending, Outsiders, Wicked, Hell's Kitchen, Great Gatsby, Hadestown",
                },
                {
                    name: 'Times Square',
                    caption: 'It’s a must to view Time Square at night!',
                },
            ],
        },
    ]

    const day2Columns = [
        {
            heading: 'MORNING',
            items: [
                {
                    name: 'Breakfast: Chopped Cheese',
                    caption:
                        'Grab a chopped cheese or a sandwich from any deli!',
                },
                {
                    name: 'The MET',
                    caption:
                        'The MET is my favorite museum in NYC and has extensive art collections',
                },
                {
                    name: 'Stroll through Central Park',
                    caption:
                        'The Great Lawn, Belvedere Castle, Boathouse, Bethesda Terrace, Carousel',
                },
            ],
        },
        {
            heading: 'NOON',
            items: [
                {
                    name: 'Lunch: Pizza or Katz Deli',
                    caption:
                        "You can get lunch anywhere near the park, midtown, or in East Village: L'industrie, Lucia Pizza, Grand Street Pizza, Katz Deli, Pastrami Queen",
                },
                {
                    name: 'A trip to Dumbo',
                    caption:
                        'Take the ferry to Dumbo where you can see the famous Jane’s Carousel and the NYC skyline. The sunset view here is also gorgeous!',
                },
                {
                    name: 'Ferry to Williamsburg',
                    caption: 'Shop at the trendy boutiques!',
                },
            ],
        },
        {
            heading: 'EVENING',
            items: [
                {
                    name: 'Dinner: Variety',
                    caption:
                        'My favorite restaurants in Williamsburg/Dumbo: Misi, Birds of a Feather, Smorgasburg Food Fair',
                },
                {
                    name: 'Optional: Walk or bike the Brooklyn Bridge',
                    caption: 'Cute photos!',
                },
                {
                    name: 'Watch a comedy show or a ballet',
                    caption: 'There are so many cool performances in NYC',
                },
                {
                    name: 'Bar hopping in East Village',
                    caption:
                        'I dont know that many bars but here are some that are popular: Schmuck, Double Chicken Please',
                },
            ],
        },
    ]

    return (
        <div
            className="itinerary-page"
            style={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
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
                    {activeTab === 'Itineraries' && (
                        <>
                            <div className="trip-description">
                                <h2>2 day weekend trip to NYC!</h2>
                                <p>
                                    If it’s your first time in NYC, here is
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
                    <Dropdown title="Day 1: Saturday" columns={day1Columns} />
                    <Dropdown title="Day 2: Sunday" columns={day2Columns} />
                </div>
            </div>
        </div>
    )
}

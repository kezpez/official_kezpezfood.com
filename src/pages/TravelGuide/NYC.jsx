import background_image_nyc from '../../assets/Images/background_image_nyc.png'
import pink_pizza_icon from '../../assets/Icons/pink_pizza_icon.png'
import pink_building_icon from '../../assets/Icons/pink_building_icon.png'
import pink_calendar_icon from '../../assets/Icons/pink_calendar_icon.png'
import kettl from '../../assets/Images/kettl.jpg'
import { Button } from '../../assets/Button/Button'
import { Link } from 'react-router-dom'

export default function NYC() {
    const sectionStyles = {
        backgroundImage: `url("${background_image_nyc}")`,
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }

    const iconCaption = (icon, title, description, linkTo) => (
        <Link to={linkTo} className="div-icon-caption link-wrapper">
            <div className="circular-frame">
                <img className="icon" alt="icon" src={icon} />
            </div>
            <div className="h4-black">{title}</div>
            <p className="p3-black">{description}</p>
        </Link>
    )

    return (
        <div
            className="page"
            style={{
                height: '4500px',
                width: '100vw',
            }}
        >
            <div className="page" style={{ height: '100vh', width: '100vw' }}>
                <div className="section-head-nyc-guide" style={sectionStyles}>
                    <div className="container">
                        <div className="div-title">
                            <div className="big-title-white">NEW</div>
                            <div className="big-title-white">YORK CITY</div>
                            <p className="p2-white">
                                Welcome to the Big Apple, New York City! There
                                is so much to see and eat in the city that never
                                sleeps. I created itineraries, food lists, and
                                spots you must see to make your travels a bit
                                easier.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="section-city-rec">
                    <div className="div-city-rec">
                        <div className="h2-black">Just for you!</div>
                        <div className="div-for-you">
                            {iconCaption(
                                pink_pizza_icon,
                                'Where to eat',
                                'Trendy food spots to classic restaurants',
                                '/travel-guide/nyc/food'
                            )}
                            {iconCaption(
                                pink_building_icon,
                                'What to see',
                                "What's worth visiting and cool museums",
                                '/travel-guide/nyc/see'
                            )}
                            {iconCaption(
                                pink_calendar_icon,
                                'Itineraries',
                                'Curated itineraries for your 2-day weekend',
                                '/travel-guide/nyc/itineraries'
                            )}
                        </div>
                    </div>
                </div>
                <div className="section-tips">
                    <div className="container-hacks">
                        <div className="div-hacks">
                            <div className="h3-black">Hacks and Tips!</div>
                            <p className="p1-black">
                                1. You can use your credit card as a metro card→
                                sign into OMNY and connect your card
                                <br /> <br />
                                2. If you’re visiting, I would do plan my day by
                                location, for example do all the things in the
                                upper west side on one day because it’s
                                difficult to get from west to east or west to
                                Brooklyn (only certain trains can take u from
                                the west to east side, difficult to cross from
                                queens to Brooklyn)
                                <br /> <br />
                                3. Buses can be more convenient if you’re just
                                trying to go up the avenue
                                <br /> <br />
                                4. If you want to watch a broadway movie check
                                the box office for cheaper tickets or matinee
                                time
                            </p>
                        </div>
                    </div>
                    <div className="container-pop-visit">
                        <div className="div-title-2">
                            <div className="p2-black">WHERE TO GO</div>
                            <div className="h3-black">POPULAR Visits</div>
                        </div>
                        <div className="container-images">
                            {/* <a
                                    href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                                    target="_blank" //ensures link opens in a new tab
                                    rel="noopener noreferrer" //improves security when opening external links
                                    className="reel-cover-link"
                                    > */}
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url('https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/apollo_bagel_1.jpg')`,
                                }}
                            >
                                <div className="div-caption">
                                    <div className="h4-white">
                                        Apollo Bagels
                                    </div>
                                    <div className="text-wrapper">
                                        <div className="p3-white">NYC</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url('https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/nyc/grand_st_pizza_1.jpg')`,
                                }}
                            >
                                <div className="div-caption">
                                    <div className="h4-white">
                                        Grand Street Pizza
                                    </div>
                                    <div className="text-wrapper">
                                        <div className="p3-white">NYC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-map-sidebar">
                    <div className="map">
                        <iframe
                            className="custom-map-iframe"
                            src="https://www.google.com/maps/d/u/0/embed?mid=1hucYSO0JWT5UZ8U6xB39tgHXz59dUXs&ehbc=2E312F"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="NYC Food Map"
                        />
                    </div>
                    <div className="sidebar">
                        <div className="container">
                            <div className="div-title-2">
                                <div className="p2-black">NYC</div>
                                <div className="h3-black">NYC ITINERARY</div>
                            </div>

                            <div className="container-itinerary">
                                <div className="div-itinerary-card">
                                    <div className="it-card">
                                        <div className="h4-pink">DAY 1</div>

                                        <div className="div-text">
                                            <div className="p1-black">
                                                BREAKFAST:
                                            </div>
                                            <div className="p2-black">
                                                Apollo Bagels
                                            </div>
                                            <div className="p2-black">
                                                Visit the MET
                                            </div>
                                            <div className="p2-black">
                                                Central Park
                                            </div>
                                            <div className="p1-black">
                                                LUNCH:
                                            </div>
                                            <div className="p2-black">
                                                Shopping on Fifth Ave
                                            </div>
                                            <div className="p1-black">
                                                DINNER:
                                            </div>
                                            <div className="p2-black">
                                                Broadway Show
                                            </div>
                                            <div className="p2-black">
                                                Time Square at night
                                            </div>
                                            <div className="p2-black">
                                                Photobooth at booth by bryant
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="div-itinerary-card">
                                    <div className="it-card">
                                        <div className="h4-pink">DAY 2</div>

                                        <div className="div-text">
                                            <div className="p1-black">
                                                BREAKFAST:
                                            </div>
                                            <div className="p2-black">
                                                Apollo Bagels
                                            </div>
                                            <div className="p2-black">
                                                Walk by the WTC and 9/11
                                                Memorial
                                            </div>
                                            <div className="p2-black">
                                                Brooklyn Bridge and DUMBO
                                            </div>
                                            <div className="p1-black">
                                                LUNCH:
                                            </div>
                                            <div className="p2-black">
                                                Shopping on SoHo
                                            </div>
                                            <div className="p2-black">
                                                Shopping to West Village
                                            </div>
                                            <div className="p1-black">
                                                DINNER:
                                            </div>
                                            <div className="p2-black">
                                                Arthur's Tavern - Jazz Bar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="div-buttons">
                                    <Button
                                        className="button-instance-pink"
                                        text="View more itineraries"
                                        to="/travel-guide/nyc/itineraries"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Button
                            className="button-instance"
                            text="View more itineraries"
                        /> */}
                </div>
            </div>
        </div>
    )
}

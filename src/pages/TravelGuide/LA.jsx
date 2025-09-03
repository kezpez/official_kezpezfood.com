import background_image_la from '../../assets/Images/la.jpg'
import pink_pizza_icon from '../../assets/Icons/pink_pizza_icon.png'
import pink_building_icon from '../../assets/Icons/pink_building_icon.png'
import pink_calendar_icon from '../../assets/Icons/pink_calendar_icon.png'
import { Button } from '../../assets/Button/Button'
import { Link } from 'react-router-dom'

export default function LA() {
    const sectionStyles = {
        backgroundImage: `url("${background_image_la}")`,
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
                height: '3000px',
                width: '100vw',
            }}
        >
            <div className="page" style={{ height: '100vh', width: '100vw' }}>
                <div className="section-head-nyc-guide" style={sectionStyles}>
                    <div className="container">
                        <div className="div-title">
                            <div className="big-title-white">LOS</div>
                            <div className="big-title-white">ANGELES</div>
                            <p className="p2-white">
                                Welcome to the Los Angeles! Enjoy the beaches,
                                sun, food, and shops!
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
                                '/travel-guide/la/food'
                            )}
                            {iconCaption(
                                pink_building_icon,
                                'What to see',
                                "What's worth visiting and cool museums",
                                '/travel-guide/la/see'
                            )}
                            {iconCaption(
                                pink_calendar_icon,
                                'Itineraries',
                                'Curated itineraries for your 2-day weekend',
                                '/travel-guide/la/itineraries'
                            )}
                        </div>
                    </div>
                </div>
                <div className="section-tips">
                    <div className="container-hacks">
                        <div className="div-hacks">
                            <div className="h3-black">Hacks and Tips!</div>
                            <p className="p1-black">
                                1. LAX Tips: If you take an Uber/Lyft, you have
                                to take a shuttle from your terminal to a
                                separate area to get picked-up.
                                <br /> <br />
                                2. Depending on where you want to go, I would
                                rent a car because LA doesn’t have convenient
                                public transportation. Sometimes ride shares can
                                be cheaper but it depends on where you go.
                                <br /> <br />
                                3. LA is known for their traffic and it can get
                                really bad. So I would avoid driving from the
                                west to the east during rush hour. Keep in mind
                                that your traveling time might be an extra hour
                                during rush hour.
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
                                    backgroundImage: `url('https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/la/yeems_1.jpg')`,
                                }}
                            >
                                <div className="div-caption">
                                    <div className="h4-white">Yeems Coffee</div>
                                    <div className="text-wrapper">
                                        <div className="p3-white">NYC</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="image-cover"
                                style={{
                                    backgroundImage: `url('https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/la/snd_1.jpg')`,
                                }}
                            >
                                <div className="div-caption">
                                    <div className="h4-white">Sun Nong Dan</div>
                                    <div className="text-wrapper">
                                        <div className="p3-white">NYC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

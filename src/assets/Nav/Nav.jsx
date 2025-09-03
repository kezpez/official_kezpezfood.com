import { Link } from 'react-router-dom'
import { useState } from 'react'
import './NavStyle.css'
import React from 'react'

export default function Nav() {
    const [isActive, setIsActive] = useState(false)
    const [isTravelOpen, setIsTravelOpen] = useState(false)
    const [isFoodOpen, setIsFoodOpen] = useState(false)

    const toggleActiveClass = () => {
        setIsActive(!isActive)
        setIsTravelOpen(false)
        setIsFoodOpen(false)
    }

    const removeActive = () => {
        setIsActive(false)
        setIsTravelOpen(false)
        setIsFoodOpen(false)
    }

    const toggleTravelDropdown = () => {
        setIsTravelOpen(!isTravelOpen)
        setIsFoodOpen(false)
    }

    const toggleFoodDropdown = () => {
        setIsFoodOpen(!isFoodOpen)
        setIsTravelOpen(false)
    }

    return (
        <nav className="Nav">
            {/* Logo */}
            <Link className="logo" to="/" onClick={removeActive}>
                Kezpezfood
            </Link>

            {/* Menu */}
            <ul className={`nav-menu ${isActive ? 'active' : ''}`}>
                <li onClick={removeActive}>
                    <Link to="/">Home</Link>
                </li>

                {/* Dropdown for Travel Guides */}
                <li className="dropdown" onClick={toggleFoodDropdown}>
                    <span
                        className={`dropdown-label ${isFoodOpen ? 'open' : ''}`}
                    >
                        Food Guide
                    </span>
                    {isFoodOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={removeActive}>
                                <Link to="/travel-guide/nyc/food">
                                    NYC Food
                                </Link>
                            </li>
                            <li onClick={removeActive}>
                                <Link to="/travel-guide/la/food">LA Food</Link>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="dropdown" onClick={toggleTravelDropdown}>
                    <span
                        className={`dropdown-label ${isTravelOpen ? 'open' : ''}`}
                    >
                        Travel Guide
                    </span>
                    {isTravelOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={removeActive}>
                                <Link to="/travel-guide/nyc/">NYC Travel</Link>
                            </li>
                            <li onClick={removeActive}>
                                <Link to="/travel-guide/la/">LA Travel</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
            {/* Hamburger Menu */}
            <div
                className={`hamburger ${isActive ? 'open' : ''}`}
                onClick={toggleActiveClass}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    )
}

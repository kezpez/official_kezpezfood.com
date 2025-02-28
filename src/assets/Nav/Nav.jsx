import { Link } from 'react-router-dom';
import { useState } from 'react';
import './NavStyle.css';
import React from "react";


export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <nav className="Nav">
  {/* Logo */}
  <Link to="/">KEZPEZFOOD</Link>

  {/* Menu */}
  <ul>
    <li onClick={removeActive}>
      <Link to="/">Home</Link>
    </li>
    <li onClick={removeActive}>
      <Link to="/TravelGuide">Travel Guides</Link>
    </li>
    <li onClick={removeActive}>
      <Link to="/ResultsPage">Recs</Link>
    </li>
    <li onClick={removeActive}>
      <Link to="/Cities">Cities</Link>
    </li>
  </ul>

  {/* Hamburger Menu */}
  <div onClick={toggleActiveClass}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</nav>
  );
}

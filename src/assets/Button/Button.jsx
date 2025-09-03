import React from 'react'
import './ButtonStyle.css'
import { useNavigate } from 'react-router-dom'

export const Button = ({ className, text, to, onClick, ...props }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        if (onClick) {
            onClick(e) // run custom click logic
        }
        if (to) {
            navigate(to) // also navigate if `to` is passed
        }
    }

    return (
        <button className={className} onClick={handleClick} {...props}>
            {text}
        </button>
    )
}

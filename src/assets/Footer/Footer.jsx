/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'
import './Footer.css'

export const Footer = ({ className }) => {
    return (
        <div className={`footer ${className}`}>
            <div className="section-description">
                <div className="div-socials">
                    <img
                        className="img-3"
                        alt="Mdi instagram"
                        src="https://c.animaapp.com/CRW9z7Dl/img/mdi-instagram-1.svg"
                    />

                    <img
                        className="img-3"
                        alt="Iconoir tiktok solid"
                        src="https://c.animaapp.com/CRW9z7Dl/img/iconoir-tiktok-solid-1.svg"
                    />

                    <div className="text-wrapper-6">kezpezfood@gmail.com</div>
                </div>

                <div className="text-wrapper-6">
                    Copyright © 2025 Kezpezfood.com
                </div>
            </div>
        </div>
    )
}

import React from "react";
import { Button } from "../assets/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { LocationPin } from "../assets/Icons/LocationPin";
// import { ArrowRight } from "../assets/Button/ArrowRight";
// import { ArrowLeft } from "../assets/Button/ArrowLeft";
// import { Footer } from "../assets/Footer";
// import Nav from "../assets/Nav";// import { IconComponentNode } from "./IconComponentNode";
import backgroundImage from "../assets/section-home.jpg";
import kanomwaan from "../assets/Images/kanomwaan.jpg";
import kettl from "../assets/Images/kettl.jpg";
import republique from "../assets/Images/republique.jpg";
import "../App.css";
import TravelGuide from "../pages/TravelGuide";
import { supabase } from "../supabaseClient";  // Import from supabaseClient.js


export default function HomePage(){
    const[cuisine, setCuisine] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/ResultsPage?cuisine=${cuisine}`);
    };
    return (
        <div className="page"
        style={{ 
            height: "100vh",
            width: "100vw",
        }}
        > 
        <div className="section-home"
        style={{ backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    }}
        >
            <div className="container">
                <div className="div-title">
                    <div className="H1-white">WHAT ARE YOU CRAVING?</div>

                    <p className="p2-white">I’ll help you find where to eat at tonight!</p>
                </div>
                <div className="filter">
                        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                            <option value="">Select Cuisine</option>
                            <option value="Taiwanese">Taiwanese</option>
                            <option value="Cafe">Cafe</option>
                            <option value="Korean">Korean</option>
                        </select>
                        <Button className="button-instance-pink" text="Find Restaurant" onClick={handleSearch}/>
            </div>
            </div>
        </div>
        <div className="section-location">
            <div className="container">
                    <div className="small-container">
                        <div className="div-title">
                            <div className="H1-black">WHERE ARE YOU EATING?</div>
                            <p className="p2-black">
                                Click one of the city locations to view the city's food recommendations
                            </p>
                        </div>
                        <div className="div-buttons">
                            <Button className="button-instance-pink" text="Los Angeles"/>
                            <Button className="button-instance-pink" text="New York City" />
                        </div>
                </div>
            </div>
            <div className="container-no-margin">
                <div className="H3-black">DISCOVER</div>
                <div className="container-reels">
                {/* <a
                    href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                    target="_blank" //ensures link opens in a new tab
                    rel="noopener noreferrer" //improves security when opening external links
                    className="reel-cover-link"
                    > */}
                    <div className="reel-cover"                     
                    style={{ backgroundImage: `url(${kettl})` }}
                    >
                        <div className="div-caption">
                            <div className="H4-white">Kettl</div>
                            <div className="text-wrapper">
                                <div className="p3-white">LA</div>
                            </div>
                        </div>
                    </div>
                    {/* </a> */}

                    {/* <a
                    href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                    target="_blank" //ensures link opens in a new tab
                    rel="noopener noreferrer" //improves security when opening external links
                    > */}
                    <div className="reel-cover"
                    style={{ backgroundImage: `url(${republique})` }}
                    >
                        <div className="div-caption">
                        <div className="H4-white">Republique</div>
                            <div className="text-wrapper">
                                <div className="p3-white">LA</div>
                            </div>
                        </div>
                    </div>
                    {/* </a> */}
                    
                    {/* <a
                    href="https://www.instagram.com/reel/DGcdEKYxNZX/?igsh=NTc4MTIwNjQ2YQ=="
                    target="_blank" //ensures link opens in a new tab
                    rel="noopener noreferrer" //improves security when opening external links
                    > */}
                    <div className="reel-cover"                    
                    style={{ backgroundImage: `url(${kanomwaan})` }}
                    >
                        <div className="div-caption">
                        <div className="H4-white">Fried Chicken</div>
                            <div className="text-wrapper">
                                <div className="p3-white">LA</div>
                            </div>
                        </div>
                    </div>
                    {/* </a> */}
                </div>

                {/* <div className="button-arrows">
                    <ArrowRight className="arrow-right-instance"/>
                    <Arrow-left className="arrow-left-instance"/>
                </div> */}

            </div>
        </div>
        </div>
        
   );
};
import React from "react";
import './ButtonStyle.css';
import vector from "./vector.svg";

export const ArrowRight = ()=> {
    return (
        <div className="Arrow-right">
            <img className="vector" alt="vector" src={vector}/>
        </div>
    );
}

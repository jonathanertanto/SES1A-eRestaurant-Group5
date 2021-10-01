import React from "react";
import '../style/reservation.css';

export const Title = _ => {
    return(
        <div className="title2">
            <h1 className="title-non-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span>RESERVATION</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}
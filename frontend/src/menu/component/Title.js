import React from "react";
import '../style/menu.css';

export const Title = _ => {
    return(
        <div className="title2">
            <h1 className="title-non-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span>MENU</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}
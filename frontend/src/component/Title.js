import React from "react";

export const Title = (title) => {
    return(
        <div className="title2">
            <h1 className="title-non-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span>{String(title).toUpperCase()}</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}
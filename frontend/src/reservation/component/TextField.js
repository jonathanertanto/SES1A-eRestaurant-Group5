import React from "react";
import '../style/reservation.css';

export const TextField = (title, data) => {
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3" style={{textAlign: "left"}} >
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="text" value={data} readOnly />
            </div>
            <hr/>
        </secion>
    );
}
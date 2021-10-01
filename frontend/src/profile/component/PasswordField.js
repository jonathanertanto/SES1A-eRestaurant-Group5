import React from "react";
import '../style/profile.css';

export const PasswordField = (title, data, setData) => {
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="password" onChange={event => setData(event.target.value)} value={data} />
            </div>
            <hr/>
        </secion>
    );
}
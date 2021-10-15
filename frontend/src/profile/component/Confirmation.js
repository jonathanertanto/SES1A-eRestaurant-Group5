import React from "react";
import '../style/profile.css';

export const Confirmation = (setOldPass, accountModification, closeForm) => {
    return(
        <div className="form-popup center form-container" id="myForm">
            <h2>Please enter your old password to continue the process!</h2>
            <div className="form-floating">
                <input type="password" className="form-control" onChange={event => setOldPass(event.target.value)} placeholder="Old Password" required />
                <label for="floatingInput">Old Password</label>
            </div>
            <div className="right-side-button">
                <button type="button" onClick={accountModification}>Next</button>
                <button type="button" onClick={closeForm} >Cancel</button>
            </div>
        </div>
    );
}
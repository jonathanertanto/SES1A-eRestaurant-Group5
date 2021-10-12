import React from "react";
import '../../style/reservation.css';

export const Confirmation = (props) => {
    return(
        <div className="form-popup center" id="myForm">
            <form className="form-container">
                <h2>Reservation Confirmation</h2>
                <div className="reservation confirmation-content">
                    {ReservationInformation("Table Number", props.selection.table.name)}
                    {ReservationInformation("Table Capacity", props.selection.table.capacity)}
                </div>
                <div className="reservation confirmation-content">
                    {ReservationInformation("Reservation Type", props.selection.type)}
                    {ReservationInformation("Reservation Date/Time", new Date(props.getDate()))}
                </div>
                <div className="reservation confirmation-content">
                    {ReservationInformation("Reservation Location", props.selection.location)}
                    {ReservationInformation("Reservation Party Size", props.selection.size)}
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Notes" onChange={event => props.setNote(event.target.value)} />
                    <label >Notes (optional)</label>
                </div>
                <div className="right-side-button">
                    <button type="button" onClick={props.reserve} >Book</button>
                    <button type="button" onClick={props.closeForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}

const ReservationInformation = (title, data) => {
    return(
        <div className="form-floating">
            <input type="text" className="form-control" value={data} readOnly = {true}/>
            <label >{title}</label>
        </div>
    )
}
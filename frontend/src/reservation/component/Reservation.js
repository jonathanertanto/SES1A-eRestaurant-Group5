import React from "react";
import '../style/reservation.css';
import {Invoice} from "./Invoice";

export const Reservation = (props) => {
    const cancelReservation = _ => {
        const date = new Date(String(props.table.date));
        if(date < new Date(props.getCurrentDate())){
            return alert("Reservation cancellation must be at least 1 hour before!");
        }
        const confirmation = window.confirm("Are you sure to cancel the reservation?");
        if(!confirmation){
            return console.log();
        }
        fetch("/api/cancelreservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reservation: props.booking._id,
                table: props.table._id,
                date: props.table.date
            })
        })
            .then((res) => {return res.json(); })
            .then((data) => {
                if(!data.status){
                    alert("Failed to cancel reservation!");
                }else{
                    window.location.reload();
                }
            });
    }

    return(
        <section className="reservation">
            {props.title()}
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">

                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {tableInformation(props.table)}
                                    {bookingInformation(props.booking)}
                                    <div className="column right-side-button">
                                        {/* <button className="btn-lg" >Edit</button> */}
                                        <button className="btn-lg" onClick={cancelReservation} >Cancel Reservation</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Invoice orders={props.orders} meals={props.meals} />

                    </div>
                </div>
            </div>
        </section>
    )
}

const tableInformation = (table) => {
    const items = [];
    items.push(normalField("Table Number", table.name));
    items.push(normalField("Table Capacity", table.capacity));
    items.push(normalField("Reservation Type", new Date(String(table.date)).getHours() >= 18? "Dinner":"Lunch"));
    items.push(normalField("Reservation Date/Time", new Date(String(table.date)) ));
    items.push(normalField("Reservation Location", table.location));
    return items;
}

const bookingInformation = (booking) => {
    const items = [];
    items.push(normalField("Reservation Party Size", booking.number_of_people));
    items.push(normalField("Notes", String(booking.notes) === "null" ? " " : booking.notes));
    return items;
}

const normalField = (title, data) => {
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
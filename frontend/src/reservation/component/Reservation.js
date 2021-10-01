import React from "react";
import '../style/reservation.css';
import {Title} from "./Title";
import {Invoice} from "./Invoice";
import {TextField} from "./TextField";

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
            {<Title />}
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
    items.push(TextField("Table Number", table.name));
    items.push(TextField("Table Capacity", table.capacity));
    items.push(TextField("Reservation Type", new Date(String(table.date)).getHours() >= 18? "Dinner":"Lunch"));
    items.push(TextField("Reservation Date/Time", new Date(String(table.date)) ));
    items.push(TextField("Reservation Location", table.location));
    return items;
}

const bookingInformation = (booking) => {
    const items = [];
    items.push(TextField("Reservation Party Size", booking.number_of_people));
    items.push(TextField("Notes", String(booking.notes) === "null" ? " " : booking.notes));
    return items;
}
import React from "react";
import '../../style/reservation.css';
import {Title} from "../../../component/Title.js";
import {Invoice} from "./Invoice";
import {TextField} from "../TextField";

export const Reservation = (reservation, table, getCurrentDate, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders) => {
    const cancelReservation = _ => {
        const date = new Date(String(table.date));
        if(date < new Date(getCurrentDate())){
            return alert("Reservation cancellation must be at least 1 hour before!");
        }
        const confirmation = window.confirm("Are you sure to cancel the reservation?");
        if(!confirmation){
            return;
        }
        fetch("/api/cancelreservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reservation: reservation._id,
                table: table._id,
                date: table.date
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
            {Title("Reservation")}
            <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">

                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                    {tableInformation(table)}
                                    {reservationInformation(reservation)}
                                    <div className="column right-side-button">
                                        {/* <button className="btn-lg" >Edit</button> */}
                                        <button className="btn-lg" onClick={cancelReservation} >Cancel Reservation</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {Invoice(subTotalPayment, discount, discountDetail, reservation, table, orders, meals, discountList, oldOrders)}
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

const reservationInformation = (reservation) => {
    const items = [];
    items.push(TextField("Reservation Party Size", reservation.number_of_people));
    items.push(TextField("Notes", String(reservation.notes) === "null" ? " " : reservation.notes));
    return items;
}
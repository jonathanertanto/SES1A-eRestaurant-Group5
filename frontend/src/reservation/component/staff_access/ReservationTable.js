import React from "react";
import '../../style/reservation.css';
import { Invoice } from "./Invoice";
import { CustomerDetail } from "./CustomerDetail";

export const ReservationTable = (reservations, staffSelection, setStaffSelection, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders) => {
    return(
        <section>
            {CustomerDetail(staffSelection.customer)}
            {Invoice(staffSelection.reservation, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders, setStaffSelection)}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className="col-1 text-center">ID</th>
                        <th scope="col" className="col-2 text-center">Table Number</th>
                        <th scope="col" className="col-1 text-center">Table Capacity</th>
                        <th scope="col" className="col-2 text-center">Date/Time</th>
                        <th scope="col" className="col-1 text-center">Party Size</th>
                        <th scope="col" className="col-2 text-center">Notes</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {reservationList(reservations, setStaffSelection)}
                </tbody>
            </table>
        </section>
    )
}

const reservationList = (reservations, setStaffSelection) => {
    const items = [];
    for(let i=0; i<reservations.length; ++i){
        const item = reservations[i];
        items.push(reservationItem(item.reservation, item.table, item.customer, setStaffSelection));
    }
    return items;
}

const reservationItem = (reservation, table, customer, setStaffSelection) => {
    const opencustomerDetail = _ => {
        const newSel = {
            customer: customer,
            reservation: reservation,
            table: table
        };
        setStaffSelection(newSel);
        document.getElementById("customerForm").style.display = "block";
    }
    const openInvoice = _ =>{
        const newSel = {
            customer: customer,
            reservation: reservation,
            table: table
        };
        setStaffSelection(newSel);
        document.getElementById("invoiceForm").style.display = "block";
    }

    const setComplete = (e) => {
        fetch("/api/setbookingcompleteness", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reservationID: String(reservation._id),
                    status: e.target.checked
                })
        })
            .then((res) => {return res.json();})
    }

    return (
        <tr>
            <td>{reservation._id}</td>
            <td>{table.name}</td>
            <td>{table.capacity}</td>
            <td>{new Date(String(table.date)).toString()}</td>
            <td>{reservation.number_of_people}</td>
            <td>{(String(reservation.notes) === "null" ? "" : reservation.notes)}</td>
            <td><input type="checkbox" id="completeStatus" name="completeStatus" value="true" defaultChecked={(reservation.completeness)} onChange={setComplete} /> Complete</td>
            <td className="text-right"><button onClick={opencustomerDetail}>Customer</button> </td>
            <td className="text-right"><button onClick={openInvoice}>Invoice</button> </td>
        </tr>
    )
}
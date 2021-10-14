import React from "react";
import '../../style/reservation.css';
import { invoiceInformation } from "../customer_access/Invoice";

export const Invoice = (reservation, table, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders, setStaffSelection) => {
    const closeDiscountForm = _ => {
        const newSel = {
            customer: "",
            reservation: "",
            table: ""
        };
        setStaffSelection(newSel);
        document.getElementById("invoiceForm").style.display = "none";
    }

    return (
        <div id="invoiceForm" className="form-popup center popup-info form-container">
            <h2>INVOICE</h2>
            <div className="d-flex flex-column align-items-center text-center">
                {invoiceInformation(reservation, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders)}
            </div>
            <div className="right-side-button">
                <button type="button" onClick={closeDiscountForm} >Close</button>
            </div>
        </div>
    )
}
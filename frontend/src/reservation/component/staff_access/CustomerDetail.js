import React from "react";
import '../../style/reservation.css';

export const CustomerDetail = (customer) =>{
    const closeDiscountForm = _ => {
        document.getElementById("customerForm").style.display = "none";
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(String(customer.dateOfBirth));
    const displayDOB = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    const items = [];
    items.push(textField("Username", customer.username));
    items.push(textField("Email", customer.email));
    items.push(textField("Name", customer.firstName + " " + customer.lastName));
    items.push(textField("Date of Birth", displayDOB) );
    items.push(textField("Contact Number", customer.contactNumber));

    return(
        <div id="customerForm" className="form-popup center">
             <form className="form-container">
                <h2>CUSTOMER INFORMATION</h2>
                {customerData(items)}
                <div className="right-side-button">
                    <button type="button" onClick={closeDiscountForm} >Close</button>
                </div>
             </form>
        </div>
    )
}

const customerData = (items) => {
    return(
        <div className="col-md-12">
            <div className="card mb-3">
                <div className="card-body">
                    {items}
                    <div className="column right-side-button">
                        {/* <button class="btn-lg" onClick={openEditValidation} >Edit</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const textField = (title, data) => {
    return(
        <div className="form-floating">
            <input type="text" className="form-control" value={data} readOnly = {true}/>
            <label >{title}</label>
        </div>
    )
}
import React from "react";
import '../style/reservation.css';
import ReactToPrint from 'react-to-print';
import { Discount } from "./Discount";

export const Invoice = (props) => {
    return(
        <div className="col-md-6 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        {invoiceInformation(props.orders, props.meals)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const invoiceInformation = (orders, meals) => {
    let componentRef;
    const invoiceItems = [];
    let totalPayment = 0, discount = 0, subTotalCost = 0;
    for(let i=0; i<meals.length; ++i){
        invoiceItems.push(mealItem(orders[i], meals[i]));
        subTotalCost += Number(meals[i].price) * Number(orders[i].quantity);
        totalPayment = subTotalCost - discount;
    }
    
    const applyDiscount = _ =>{

    }
    const openDiscountForm = _ => {
        document.getElementById("discountForm").style.display = "block";
    }
    const closeDiscountForm = _ => {
        document.getElementById("discountForm").style.display = "none";
    }
    
    return(
        <section className="invoice" >
            {Discount(applyDiscount, closeDiscountForm)}
            <div className="container mb-4">

                <div id="invoiceComp" ref={(response) => (componentRef = response)} className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="col-5 text-center">Meal Name</th>
                                <th scope="col" className="col-1 text-center">Quantity</th>
                                <th scope="col" className="col-3 text-center">Notes</th>
                                <th scope="col" className="col-1 text-center">Price</th>
                                <th className="col-1"> </th>
                                <th className="col-1"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems}
                            {subTotal(subTotalCost)}
                            {discountOffer(discount)}
                            {total(totalPayment)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <ReactToPrint
                        content={() => componentRef}
                        trigger={() => <button >Print to PDF</button>}
                    />
                    <button style={{marginLeft:10}} onClick={openDiscountForm} >Apply Discount</button>
                </div>
            </div>
        </section>
    );
}

const subTotal = (subTotalCost) => {
    return(
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Sub Total</strong></td>
            <td className="text-right"><strong>${Number.isFinite(subTotalCost)?subTotalCost:0}</strong></td>
        </tr>
    );
}
const discountOffer = (discount) =>{
    return(
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Discount</strong></td>
            <td className="text-right"><strong>${Number.isFinite(discount)?discount:0}</strong></td>
        </tr>
    );
}
const total = (totalPayment) =>{
    return(
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total</strong></td>
            <td className="text-right"><strong>${Number.isFinite(totalPayment)?totalPayment:0}</strong></td>
        </tr>
    );
}

const mealItem = (order, meal) => {
    const handleQtyChange = (e) => {
        order.quantity = e.target.value;
    }
    const handleNotesChange = (e) => {
        order.notes = e.target.value;
    }
    const updateData = _ => {
        if(!Number.isFinite(Number(order.quantity)) || Number(order.quantity)%1 !== 0 || Number(order.quantity) <= 0 ){
            return alert("Please fill in the quantity with a non decimal number larger than 0!");
        }
        fetch("/api/updateorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: order._id,
                quantity: order.quantity,
                notes: order.notes
            })
        })
            .then((res) => {return res.json(); })
            .then((data) => {
                alert(data.message);
                if(data.status){
                    window.location.reload();
                }
            });
    }
    const removeItem = _ => {
        if(!Number.isFinite(Number(order.quantity)) || Number(order.quantity)%1 !== 0 || Number(order.quantity) <= 0 ){
            return alert("Please fill in the quantity with a non decimal number larger than 0!");
        }
        fetch("/api/removeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: order._id,
                quantity: order.quantity
            })
        })
            .then((res) => {return res.json(); })
            .then((data) => {
                alert(data.message);
                if(data.status){
                    window.location.reload();
                }
            });
    }

    return(
        <tr>
            <td>{meal.name}</td>
            <td><input className="form-control text-center" type="text" placeholder={order.quantity} onChange={handleQtyChange}/></td>
            <td><input className="form-control text-center" type="text" placeholder={order.notes} onChange={handleNotesChange} /></td>
            <td className="text-right">${Number.isFinite(Number(order.quantity))? Number(meal.price) * Number(order.quantity):0}</td>
            <td className="text-right"><button onClick={updateData} >Edit</button> </td>
            <td className="text-right"><button className="btn btn-sm btn-danger" onClick={removeItem} ><i className="fa fa-trash"></i> </button> </td>
        </tr>
    )
}
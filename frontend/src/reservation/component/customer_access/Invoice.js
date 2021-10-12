import React from "react";
import '../../style/reservation.css';
import ReactToPrint from 'react-to-print';
import { Discount } from "./Discount";

export const Invoice = (subTotalPayment, discount, discountDetail, reservation, table, orders, meals, discountList, oldOrders) => {
    return(
        <div className="col-md-6 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        {invoiceInformation(reservation, table, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders, true, true)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const invoiceInformation = (reservation, table, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders, printPDF, applyDiscount) => {
    let componentRef;
    const invoiceItems = [];
    let totalPayment = 0;
    for(let i=0; i<meals.length; ++i){
        invoiceItems.push(mealItem(discountDetail, orders[i], meals[i], oldOrders, meals));
    }
    totalPayment = subTotalPayment - discount;

    const appliedDiscount = _ => {
        return (discountDetail !== "");
    }
    
    const openDiscountForm = _ => {
        if(appliedDiscount()){
            return alert("You can only use one discount offer per reservation!");
        }
        document.getElementById("discountForm").style.display = "block";
    }
    
    return(
        <section className="invoice" >
            {Discount(reservation, totalPayment, meals, discountList)}
            <div className="container mb-4">

                <div id="invoiceComp" ref={(response) => (componentRef = response)} className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="col-3 text-center">Meal Name</th>
                                <th scope="col" className="col-1 text-center">Quantity</th>
                                <th scope="col" className="col-3 text-center">Notes</th>
                                <th scope="col" className="col-1 text-center">Price</th>
                                <th scope="col" className="col-2 text-center">Total</th>
                                <th className="col-1"> </th>
                                <th className="col-1"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems}
                            {discountDetail===""? "" : discountItem(reservation, discountDetail, discount)}
                            {subTotal(subTotalPayment)}
                            {discountOffer(discount)}
                            {total(totalPayment)}
                        </tbody>
                    </table>
                </div>
                <div>
                    {printPDF &&
                        <ReactToPrint
                            content={() => componentRef}
                            trigger={() => <button >Print to PDF</button>}
                        />
                    }
                    {applyDiscount && <button style={{marginLeft:10}} onClick={openDiscountForm} >Apply Discount</button>}
                </div>
            </div>
        </section>
    );
}

const subTotal = (subTotalPayment) => {
    return(
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Sub Total</strong></td>
            <td className="text-right"><strong>${Number.isFinite(subTotalPayment)?subTotalPayment:0}</strong></td>
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
            <td></td>
            <td><strong>Total</strong></td>
            <td className="text-right"><strong>${Number.isFinite(totalPayment)?totalPayment:0}</strong></td>
        </tr>
    );
}

const mealItem = (discountDetail, order, meal, orders, meals) => {
    const handleQtyChange = (e) => {
        order.quantity = e.target.value;
    }
    const handleNotesChange = (e) => {
        order.notes = e.target.value;
    }
    const updateData = _ => {
        if(orders.length <= 0 || !order || discountDetail === "" || meals.length <= 0 || !meal){
            return;
        }

        if(!Number.isFinite(Number(order.quantity)) || Number(order.quantity)%1 !== 0 || Number(order.quantity) < 0 ){
            return alert("Please fill in the quantity with a postive non decimal number!");
        }

        if(Number(order.quantity) === 0){
            order.quantity = Number(orders[findOrderIndex()].quantity);
            return removeItem();
        }

        if(discountDetail !== "" && !validateDiscMinTrans("update") && !(window.confirm("The applied discount offer will be removed!\r\nAre you sure to modify the order's quantity?"))){
            return window.location.reload();;
        }

        fetch("/api/updateorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: order._id,
                quantity: order.quantity,
                notes: order.notes,
                discountID: (discountDetail === "" ? "" : String(discountDetail._id)),
                min_transaction: validateDiscMinTrans("update")
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
        if(!order || meals === "" || !meal){
            return;
        }

        if(!Number.isFinite(Number(order.quantity)) || Number(order.quantity)%1 !== 0 || Number(order.quantity) <= 0 ){
            return alert("Please fill in the quantity with a non decimal number larger than 0!");
        }

        if(discountDetail !== "" && (!validateDiscMinTrans("delete") || (String(discountDetail.mealType).toUpperCase() !== "A" && !hasMealType("delete")) ) 
                && !(window.confirm("The applied discount offer will be removed!\r\nAre you sure to remove the order?"))){
            return window.location.reload();;
        }

        fetch("/api/removeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: String(order._id),
                quantity: Number(order.quantity),
                discountID: (discountDetail === "" ? "" : String(discountDetail._id)),
                min_transaction: validateDiscMinTrans("delete"),
                hasMealType: hasMealType("delete")
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
    const validateDiscMinTrans = (type) => {
        try{
            if(discountDetail === ""){
                return false;
            }
            let value = 0;
            for(let i = 0; i < orders.length; ++i){
                if(String(orders[i]._id) === String(order._id)){
                    if(String(type).toUpperCase() === "UPDATE" ){
                        value += ( Number(order.quantity) * Number(meals[i].price) );
                    }else{
                        value += ( (Number(orders[i].quantity) - Number(order.quantity)) * Number(meals[i].price) );
                    }
                }else{
                    value += (Number(orders[i].quantity) * Number(meals[i].price));
                }
            }
            return (value >= Number(discountDetail.min_transaction));
        }catch(error){
            alert(error);
        }
    }
    const findOrderIndex = _ => {
        try{
            for(let i = 0; i < orders.length; ++i){
                if(String(orders[i]._id) === String(order._id)){
                    return i;
                }
            }
            return -1;
        }catch(error){
            alert(error);
        }
    }
    const hasMealType = (type) => {
        try{
            if(discountDetail === ""){
                return false;
            }
            for(let i = 0; i < orders.length; ++i){
                if(String(orders[i]._id) === String(order._id)){
                    let qty;
                    if(String(type).toUpperCase() === "UPDATE" ){
                        qty = Number(order.quantity);
                    }else{
                        qty = (Number(orders[i].quantity) - Number(order.quantity));
                    }
                    if(String(meals[i].type).toUpperCase() === String(discountDetail.mealType).toUpperCase() && qty > 0){
                        return true;
                    }
                }else{
                    if(String(meals[i].type).toUpperCase() === String(discountDetail.mealType).toUpperCase()){
                        return true;
                    }
                }
            }
            return false;
        }catch(err){
            alert(err);
        }
    }

    return(
        <tr>
            <td>{meal.name}</td>
            <td><input className="form-control text-center" type="text" placeholder={order.quantity} onChange={handleQtyChange}/></td>
            <td><input className="form-control text-center" type="text" placeholder={order.notes} onChange={handleNotesChange} /></td>
            <td className="text-right">${meal.price}</td>
            <td className="text-right">${Number.isFinite(Number(order.quantity))? Number(meal.price) * Number(order.quantity):0}</td>
            <td className="text-right"><button onClick={updateData} >Edit</button> </td>
            <td className="text-right"><button className="btn btn-sm btn-danger" onClick={removeItem} ><i className="fa fa-trash"></i> </button> </td>
        </tr>
    )
}
const discountItem = (reservation, discount, value) => {
    const removeItem = _ => {
        try{
            // Check if discount variable exists
            if(!discount){
                return;
            }

            // Asking for confirmation
            if(!(window.confirm("Are you sure to cancel the reservation?"))){
                return;
            }

            fetch("/api/canceldiscount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reservationID: reservation._id
                })
            })
                .then((res) => {return res.json(); })
                .then((data) => {
                    alert(data.message);
                    if(data.status){
                        window.location.reload();
                    }
                });
        }catch(err){
            alert(err);
        }
    }
    return(
        <tr>
            <td>{discount.name}</td>
            <td>1</td>
            <td>{discount.description}</td>
            <td>-{(String(discount.type)==="N"&&"$")+discount.nominal+(String(discount.type)==="P"?"%":"")}</td>
            <td>-${value}</td>
            <td></td>
            <td className="text-right"><button className="btn btn-sm btn-danger" onClick={removeItem} ><i className="fa fa-trash"></i> </button> </td>
        </tr>
    )
}
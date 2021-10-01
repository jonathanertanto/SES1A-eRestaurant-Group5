import React from "react";
import '../style/reservation.css';
import ReactToPrint from 'react-to-print';

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
    const invoiceItems = [];
    let totalCost = 0;
    for(let i=0; i<meals.length; ++i){
        invoiceItems.push(invoiceItem(orders[i], meals[i]));
        totalCost += Number(meals[i].price) * Number(orders[i].quantity);
    }
    let componentRef;

    return(
        <section className="invoice" >
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><strong>Total</strong></td>
                                <td className="text-right"><strong>${Number.isFinite(totalCost)?totalCost:0}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <ReactToPrint
                    content={() => componentRef}
                    trigger={() => <button >Print to PDF</button>}
                />
            </div>
        </section>
    );
}
const invoiceItem = (order, meal) => {
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
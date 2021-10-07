import React, {useEffect, useState} from "react";
import { getUserID } from "../../App";
import '../style/reservation.css';

export const Discount = (totalPayment, meals) => {
    const [discounts, setDiscounts] = useState("");
    const [reservation, setReservation] = useState("I");
    const [table, setTable] = useState("I");
    useEffect(() => {
        const getData = async _ =>{
            const res = await fetch("/api/getreservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: getUserID()
                })
            });
            const data = await res.json();
            setReservation(data.booking);
            setTable(data.table);
        };
        getData();
    }, []);

    const closeDiscountForm = _ => {
        document.getElementById("discountForm").style.display = "none";
    }
    // Get and filter available discount offers to fit the user's reservation and orders
    useEffect(()=>{
        const getData = async _ => {
            const res = await fetch("/api/getdiscounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: getUserID()
                })
            });
            const data = await res.json();
            if(!data.status){
                return setDiscounts("");
            }
            setDiscounts(data.discounts.filter(data => 
                (new Date(String(data.end_date)).getTime() > new Date(String(table.date)).getTime()) &&
                (String(data.menuType)==="A" ? true : (new Date(String(table.date)).getHours() >= 18? "Dinner":"Lunch") === (String(data.menuType)==="L"?"Lunch":"Dinner") )
            ));
        }
        getData();
    }, [table, meals]);
    return(
        <div id="discountForm" className="form-popup center">
            <form className="form-container">
                {list(discounts, reservation, totalPayment, meals)}
                <div className="right-side-button">
                    <button type="button" onClick={closeDiscountForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}

const list = (discounts, reservation, totalPayment, meals) => {
    const items = [];
    for(let i=0; i<discounts.length; ++i){
        items.push(item(discounts[i], reservation, totalPayment, meals));
    }

    return (
        <section>
            <div className="container mb-4">
                <h2>DISCOUNT OFFERS</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="col-2 text-center">Name</th>
                                <th scope="col" className="col-4 text-center">Description</th>
                                <th scope="col" className="col-1 text-center">Meal Type</th>
                                <th scope="col" className="col-1 text-center">Nominal</th>
                                <th scope="col" className="col-1 text-center">Min. Transaction</th>
                                <th scope="col" className="col-2 text-center">Valid Until</th>
                                <th scope="col" className="col-1"> </th>
                            </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

const item = (discount, reservation, totalPayment, meals) => {
    const applyDiscount = _ =>{
        try{
            // Check if the reservation, meals, and discount variables are empty or not
            if(reservation === "I" || reservation === "" || meals === "I" || !discount || !Number.isFinite(totalPayment)){
                return;
            }

            // Check if the reservation has an order
            if(meals==="" && String(discount.meal)==="" && String(discount.mealType)==="A"){
                return alert("Please make an order first!");
            }

            // Check if the orders has the required meal type
            if(String(discount.meal)==="" && String(discount.mealType)!=="A" && !hasMealType()){
                return alert(`Please order a ${(String(discount.mealType).toUpperCase() === "F" ? "food" : "drink" )} first before applying this offer!`);
            }

            // Check and the total payment and the minimum transaction of the offer
            if(Number(totalPayment) < Number(discount.min_transaction)){
                return alert("Please order more meals or choose different offer!\r\nYour orders do not meet the minimum transaction of the discount offer!");
            }
            const status = meals === "" ? true : !hasMeal();

            fetch("/api/applydiscount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reservationID: String(reservation._id),
                    discountID: String(discount._id),
                    mealID: String(discount.meal),
                    status: status
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
    }// eslint-disable-next-line
    const hasMeal = _ => {
        for(let i=0; i<meals.length; ++i){
            if(String(meals[i]._id) === String(discount.meal)){
                return true;
            }
        }
        return false;
    }
    const hasMealType = _ => {
        for(let i=0; i<meals.length; ++i){
            if(String(meals[i].type).toUpperCase() === String(discount.mealType).toUpperCase()){
                return true;
            }
        }
        return false;
    }

    return(
        <tr>
            <td>{discount.name}</td>
            <td>{discount.description}</td>
            <td>{String(discount.mealType).toUpperCase() === "A" ? "All" : String(discount.mealType).toUpperCase() === "F"? "Food" : "Drink" }</td>
            <td>{(String(discount.type)==="N"&&"$")+discount.nominal+(String(discount.type)==="P"?"%":"")}</td>
            <td>${discount.min_transaction}</td>
            <td>{new Date(String(discount.end_date)).toString()}</td>
            <td className="text-right"><button onClick={applyDiscount}>Apply</button> </td>
        </tr>
    );
}

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
    // Get Current Date and time rounded up (no minutes and seconds)
    const getCurrentDate = _ => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const time = date.getMinutes > 0? date.getHours() : (date.getHours() + 1);
        const datetime = time < 24? (month+" "+day+" "+year+" "+time+":00:00") : (month+" "+(day+1)+" "+year+" "+(time-24)+":00:00");
        return datetime;
    }
    // Get and filter available discount offers to fit the user's reservation and orders
    useEffect(()=>{
        const hasMeal = (meal) => {
            for(let i=0; i<meals.length; ++i){
                if(String(meals[i]._id) === String(meal)){
                    return true;
                }
            }
            return false;
        }
        const hasMealType = (type) => {
            for(let i=0; i<meals.length; ++i){
                if(String(meals[i].type).toUpperCase() === String(type).toUpperCase()){
                    return true;
                }
            }
            return false;
        }
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
            setDiscounts(data.discounts.filter(data => 
                (new Date(String(data.end_date)).getTime() > new Date(getCurrentDate()).getTime()) && 
                (Number(totalPayment) >= Number(data.min_transaction)) &&
                (String(data.meal)!=="" ? hasMeal(data.meal) : true) &&
                (String(data.menuType)==="A" ? true : (new Date(String(table.date)).getHours() >= 18? "Dinner":"Lunch") === (String(data.menuType)==="L"?"Lunch":"Dinner") ) &&
                (String(data.mealType)==="A" ? true : hasMealType(data.mealType))
            ));
        }
        getData();
    }, [table, totalPayment, meals]);
    return(
        <div id="discountForm" className="form-popup center">
            <form className="form-container">
                {list(discounts, reservation)}
                <div className="right-side-button">
                    <button type="button" onClick={closeDiscountForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}

const list = (discounts, reservation) => {
    const items = [];
    for(let i=0; i<discounts.length; ++i){
        items.push(item(discounts[i], reservation));
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
                                <th scope="col" className="col-3 text-center">Valid Until</th>
                                <th scope="col" className="col-1 text-center">Min. Transaction</th>
                                <th className="col-1">Nominal</th>
                                <th className="col-1"> </th>
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

const item = (discount, reservation) => {
    const applyDiscount = _ =>{
        fetch("/api/applydiscount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reservationID: reservation._id,
                discountID: discount._id
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
            <td>{discount.name}</td>
            <td>{discount.description}</td>
            <td>{new Date(String(discount.end_date)).toString()}</td>
            <td>${discount.min_transaction}</td>
            <td>{(String(discount.type)==="N"&&"$")+discount.nominal+(String(discount.type)==="P"?"%":"")}</td>
            <td className="text-right"><button onClick={applyDiscount}>Apply</button> </td>
        </tr>
    )
}

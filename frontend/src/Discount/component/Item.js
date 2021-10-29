import React from "react";
import { getUserID } from "../../App";
import '../style/discount.css';

export const Item = (discounts, reservation, table, meals, subTotalPayment, menu) =>{
    const formatDate = (date) =>{
        const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const datetime = new Date(String(date));
        const day = datetime.getUTCDate();
        const month = months[datetime.getUTCMonth()];
        const year = datetime.getUTCFullYear();
        return day + " " + month + " " + year;
    }
    const applyNow = (discount) => {
        if(!getUserID()){
            return window.location.href = "/login";
        }
        applyDiscount(discount);
    }
    const applyDiscount = (discount) =>{
        try{
            // Check if the reservation, meals, and discount variables are empty or not
            if(reservation === "I" || meals === "I" || !discount || !Number.isFinite(subTotalPayment)){
                return;
            }

            if(reservation === ""){
                return alert("Please book a table first!");
            }

            // Check if the reservation has an order
            if(meals==="" && String(discount.meal)==="" && String(discount.mealType)==="A"){
                return alert("Please make an order first!");
            }

            // Check if the reservation already has discount applied to it
            if(reservation.discount.length > 0){
                alert("You can only use one discount offer per reservation!");
                return window.location.href = "/reservation";
            }

            // Check if the discount offer still can be applied with the set end-period of the offer
            let reservationDate = new Date(String(table.date));
            reservationDate = new Date(reservationDate.getUTCFullYear(), reservationDate.getUTCMonth(), reservationDate.getUTCDate());
            if(new Date(String(discount.end_date)).getTime() < reservationDate.getTime()){
                return alert("Please choose a discount offer that will still be active for your reservation time");
            }

            // Check the menu type
            if(String(discount.menuType).toUpperCase()!=="A" && (new Date(String(table.date)).getUTCHours() >= 18? "Dinner":"Lunch") !== (String(discount.menuType).toUpperCase()==="L"?"Lunch":"Dinner") ){
                return alert(`Please select a discount offer that suits with your reservation menu type: ${new Date(String(table.date)).getUTCHours() >= 18? "Dinner":"Lunch"}`);
            }

            // Check if the orders has the required meal type
            if(String(discount.meal)==="" && String(discount.mealType)!=="A" && !hasMealType(discount)){
                return alert(`Please order a ${(String(discount.mealType).toUpperCase() === "F" ? "food" : "drink" )} first before applying this offer!`);
            }

            // Check and the total payment and the minimum transaction of the offer
            if(Number(subTotalPayment) < Number(discount.min_transaction)){
                return alert("Please order more meals or choose different offer!\r\nYour orders do not meet the minimum transaction of the discount offer!");
            }
            const status = meals === "" ? true : !hasMeal(discount);

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
                        return window.location.href = "/reservation";
                    }
                });
        }catch(err){
            alert(err);
        }
    }
    const hasMeal = (discount) => {
        for(let i=0; i<meals.length; ++i){
            if(String(meals[i]._id) === String(discount.meal)){
                return true;
            }
        }
        return false;
    }
    const hasMealType = (discount) => {
        for(let i=0; i<meals.length; ++i){
            if(String(meals[i].type).toUpperCase() === String(discount.mealType).toUpperCase()){
                return true;
            }
        }
        return false;
    }
    const findMeal = (discount) => {
        try{
            for(let i=0; i<menu.length; ++i){
                if(String(menu[i]._id) === String(discount.meal)){
                    return menu[i];
                }
            }
            return null;
        }catch(err){
            alert(err);
        }
    }
    return(
        <section>
            <div className="discounts discount-list">
                {discounts.map((discount, index) => (
                    <div key={index} className="discount-item">
                        <div className="discount-selection-container">
                            <img src={discount.image} className="discount-item img" alt={discount.name}/>
                            <div className="discount-selection">
                                <button type="button" onClick={_=>{applyNow(discount)}}>Apply Now</button>
                            </div>
                        </div>
                        <div className="name">{discount.name}</div>
                        <div className="description">{discount.description}</div>
                        <div style={{padding: 10}}>
                            <div className="detail"><b >Menu Type : </b>{String(discount.menuType).toUpperCase() === "A" ? "All" : (String(discount.menuType).toUpperCase()==="L"?"Lunch":"Dinner")}</div>
                            <div className="detail"><b >Meal Type : </b>{String(discount.mealType).toUpperCase() === "A" ? "All" : (String(discount.mealType).toUpperCase()==="F"?"Food":"Drink")}</div>
                            <div className="detail"><b >Meal Name : </b>{String(discount.meal) !== "" ? findMeal(discount).name : "-"}</div>
                            <div className="detail"><b >Nominal : </b>{(String(discount.type)==="N"&&"$")+discount.nominal+(String(discount.type)==="P"?"%":"")}</div>
                            <div className="detail"><b >Minimum Transaction : </b>${discount.min_transaction}</div>
                            <div className="detail"><b >Period : </b>{formatDate(String(discount.start_date)) + " - " + formatDate(String(discount.end_date))}</div>
                        </div>
                        <div className="btn">
                            <button onClick={_=>{applyNow(discount)}} type="button">Apply Now</button>
                            {/* <button>View Detail</button> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
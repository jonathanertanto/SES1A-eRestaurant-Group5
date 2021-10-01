import React, {useEffect, useState} from "react";
import { getUserID } from "../../App";
import '../style/reservation.css';

export const Discount = (applyDiscount, closeDiscountForm) => {
    const [discounts, setDiscounts] = useState("");
    useEffect(()=>{
        const getData = async _ => {
            const res = await fetch("/api/gettestingdiscount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: getUserID()
                })
            });
            const data = await res.json();
            setDiscounts(data.discounts);
        }
        getData();
    }, []);
    return(
        <div id="discountForm" className="form-popup center">
            <form className="form-container">
                {list(applyDiscount, discounts)}
                <div className="right-side-button">
                    <button type="button" onClick={closeDiscountForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}

const list = (applyDiscount, discounts) => {
    const items = [];
    for(let i=0; i<discounts.length; ++i){
        items.push(item(discounts[i]));
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
                                <th scope="col" className="col-4 text-center">Valid Until</th>
                                <th scope="col" className="col-2 text-center">Min. Transaction</th>
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

const item = (discount) => {
    const date = new Date(String(discount.end_date)).toString();
    return(
        <tr>
            <td>{discount.name}</td>
            <td>{discount.description}</td>
            <td>{date}</td>
            <td>${discount.min_transaction}</td>
            <td className="text-right"><button >Apply</button> </td>
        </tr>
    )
}

import React, {useState, useEffect} from "react";
import { getUserID } from "../../App";
import {Title} from "../../component/Title.js";
import {Item} from "./Item";
import "../style/discount.css";

export const Discount = _ =>{
    const [discounts, setDiscounts] = useState("");
    const [reservation, setReservation] = useState("I");
    const [table, setTable] = useState("I");
    const [orders, setOrders] = useState("");
    const [meals, setMeals] = useState("");

    useEffect(()=>{
        const getData = async _ => {
            setDiscounts("");
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
                new Date(String(data.end_date)).getTime() > (new Date(getCurrentDate())).getTime()
            ));
        }
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
        getData();
    }, []);
    useEffect(() => {
        const getData = async _ =>{
            if(!getUserID()){
                setReservation("I");
            }
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
            setReservation(data.reservation);
            setTable(data.table);
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async _ =>{
            if(!getUserID()){
                setOrders("");
                setMeals("");
            }
            const res = await fetch("/api/getorders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reservation: reservation._id
                })
            });
            const data = await res.json();
            setOrders(data.orders);
            setMeals(data.meals);
        };
        getData();
    }, [reservation]);

    const [subTotalPayment, setSubTotalPayment] = useState(0);
    useEffect(() => {
        let value = 0;
        for(let i=0; i<meals.length; ++i){
            value += Number(orders[i].quantity) * Number(meals[i].price);
        }
        setSubTotalPayment(value);
    }, [orders, meals]);

    const [menu, setMenu] = useState("");
    useEffect(() => {
        const getData = async _ =>{
            try{
                const response = await fetch(`/api/getallmeals`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setMenu(data.menuItem);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    }, [])

    return(
        <section className="discount">
            {Title("Discount Offer")}
            {discounts!=="" && Item(discounts, reservation, table, meals, subTotalPayment, menu)}
        </section>
    )
}

import React, {useState, useEffect} from "react";
import {getUserID} from "../App";

let bookingUrl = "/login";

export const Homepage = _ =>{
    const [userType, setUserType] = useState("");
    useEffect(() => {
        const getData = async _ =>{
            if(!getUserID()){
                return setUserType("");
            }
            const res = await fetch(`/api/profile?userID=${getUserID()}`);
            const data = await res.json();
            if(data.status)
                setUserType(data.userType);
            else
                setUserType("");
        }
        getData();
    }, []);
    
    if(getUserID()){
        bookingUrl = String(userType).toUpperCase() === "C" ? "/reservation" : "/";
    }else{
        bookingUrl = "/login";
    }

    return(
        <section>
            {restaurantInfo(userType)}
            {aboutInfo()}
            {contactInfo()}
        </section>
    )
}
const restaurantInfo = (userType) =>{
    return(
        <section className="container-info">
            {restaurantTime()}
            {menuHyperLink(userType)}
        </section>
    );
}
const restaurantTime = _ =>{
    return(
        <div className="info-box left">
            <a href={bookingUrl}><img className="info-box" src="https://www.crownsydney.com.au/getmedia/ad5ae0e2-2872-4fbe-bf54-601b12baee97/210420-Crown-Sydney-Restaurant-Epicurean-0099-6496x4872.jpg" alt="Press to go to booking page"/></a>
            <div className="info-box-text center">
                <a href={bookingUrl}>Lunch = 11:00 - 17:00</a> <br/>
                <a href={bookingUrl}>Dinner = 18:00 - 23:00</a>
            </div>
        </div>
    )
}
const menuHyperLink = (userType) =>{
    return(
        <div className="info-box right">
            <a href="/menu"><img className="info-box" src="https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg" alt="Press to go to menu page"/></a>
            <div className="info-box-text center">
                <a href={(String(userType).toUpperCase() === "M" || String(userType).toUpperCase() === "E") ? "/" : "/menu"}>Dinning</a>
            </div>
        </div>
    )
}
const aboutInfo = _ =>{
    return(
        <section className="container-about">
            <h2>About</h2>
            <h1>Le Bistrot d'Andre</h1>
            <article>
                Experience a unique French fine dining at Le Bistrot d'Andre, with enlightened “open kitchens” serving you the finest flavours from some of the most exciting cuisines.
                Le Bistrot d'Andre is the all-in-one venue to celebrate moments and create memories.
            </article>
        </section>
    )
}
const contactInfo = _ =>{
    return(
        <footer>
            <div className="footer-widget">

            </div>
        </footer>
    )
}
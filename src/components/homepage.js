import React from "react";
import {isLoggedIn} from "../App";

let bookingUrl = "/login";

export function Homepage(){
    if(isLoggedIn())
        bookingUrl = "/booking";

    return(
        <section>
            {restaurantInfo()}
            {aboutInfo()}
            {contactInfo()}
        </section>
    )
}
function restaurantInfo(){
    return(
        <section className="container-info">
            {restaurantTime()}
            {menuHyperLink()}
        </section>
    );
}
function restaurantTime(){
    return(
        <div className="info-box left">
            <a href={bookingUrl}><img className="info-box" src="https://www.crownsydney.com.au/getmedia/ad5ae0e2-2872-4fbe-bf54-601b12baee97/210420-Crown-Sydney-Restaurant-Epicurean-0099-6496x4872.jpg" alt="Press to go to booking page"/></a>
            <div className="info-box-text center">
                <a href={bookingUrl}>Lunch = 12:00 - 15:00</a> <br/>
                <a href={bookingUrl}>Dinner = 18:00 - 23:00</a>
            </div>
        </div>
    )
}
function menuHyperLink(){
    return(
        <div className="info-box right">
            <a href="/menu"><img className="info-box" src="https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg" alt="Press to go to menu page"/></a>
            <div className="info-box-text center">
                <a href="/menu">Dinning</a>
            </div>
        </div>
    )
}
function aboutInfo(){
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
function contactInfo(){
    return(
        <footer>
            <div className="footer-widget">

            </div>
        </footer>
    )
}
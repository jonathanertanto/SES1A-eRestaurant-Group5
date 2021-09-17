import React from "react";
import {Outlet} from "react-router-dom";
import {Home, ListAlt, ExitToApp, HowToReg, Event, AccountCircle} from '@material-ui/icons/';
import { isLoggedIn, logOut } from "../App";

export function Navbar(props){
    let menu, menu2;
    if(!isLoggedIn()){
        menu = <a className={props.page==="login"? "active":""} href="/login"><ExitToApp />Log In</a>;
        menu2 = <a className={props.page==="signup"? "active":""} href="/signup"><HowToReg />Sign Up</a>
    }else{
        menu = <a className={props.page==="booking"? "active":""} href="/booking"><Event />Booking</a>
        menu2 = <a className={props.page==="profile"? "active":""} href="/" onClick={logOut} ><AccountCircle />Profile</a>
    }
    return (
        <main>
            <header>
                <div className={props.page==="homepage"? "topnav homepage":"topnav"}>
                    <a className={props.page==="homepage"? "active":""} href="/"><Home />Home</a>
                    <a className={props.page==="menu"? "active":""} href="/menu"><ListAlt />Menu</a>
                    {menu}
                    {menu2}
                </div>

                {props.page==="homepage" && homepageHeader()}
            </header>
            <Outlet />
        </main>
    );
}

function homepageHeader(){
    return (
        <div>
            {restaurantName()}
            {bookingBtn()}
        </div>
    )
}
function restaurantName(){
    return(
        <div className="title">
            <h1 className="title-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span className="letters letters-left">Le Bistrot</span>
                    <span className="letters ampersand"> </span>
                    <span className="letters letters-right">d'Andre</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}
function bookingBtn(){
    let bookingUrl = "/login";
    if(isLoggedIn())
        bookingUrl = "/booking";
    return(
        <div className="center booking-button">
            <a href={bookingUrl}>Book a Table</a>
        </div>
    )
}
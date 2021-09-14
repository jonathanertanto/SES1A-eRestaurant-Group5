import React from "react";
import {Outlet} from "react-router-dom";
import {Home, ListAlt, ExitToApp, HowToReg, Event, AccountCircle} from '@material-ui/icons/';
import { isLogedIn } from "../App";

export function Navbar(props){
    let menu, menu2;
    if(!isLogedIn()){
        menu = <a className={props.page==="login"? "active":""} href="#"><ExitToApp />Log In</a>;
        menu2 = <a className={props.page==="signup"? "active":""} href="#"><HowToReg />Sign Up</a>
    }else{
        menu = <a className={props.page==="booking"? "active":""} href="#"><Event />Booking</a>
        menu2 = <a className={props.page==="profile"? "active":""} href="#"><AccountCircle />Profile</a>
    }
    return (
        <main>
            <header>
                <div className={props.page==="homepage"? "topnav homepage":"topnav"}>
                    <a className={props.page==="homepage"? "active":""} href="/"><Home />Home</a>
                    <a className={props.page==="menu"? "active":""} href="#"><ListAlt />Menu</a>
                    {menu}
                    {menu2}
                </div>

                {props.page==="homepage" &&
                    <div>
                        {restaurantName()}
                        <div className="center booking">
                            <a href="#">Book a Table</a>
                        </div>
                    </div>
                }
            </header>
            <Outlet />
        </main>
    );
}

function restaurantName(){
    return(
        <div className="title">
            <h1 className="ml5">
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
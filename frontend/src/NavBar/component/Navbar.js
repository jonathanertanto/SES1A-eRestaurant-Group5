import React, {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {Home, ListAlt, ExitToApp, HowToReg, Event, AccountCircle, MeetingRoom, LocalOffer, ShowChart, PlaylistAdd} from '@material-ui/icons/';
import { getUserID, logOut } from "../../App";
import '../style/navbar.css';

export const Navbar = (props) => {
    const [userType, setUserType] = useState("I");
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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

    useEffect(() => {
        const handleResize = _ => {
          setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const maxWidth = 900;
    return (
        <main>
            <header className={props.page==="homepage"? "" : "content-navbar"} >
                <div className={props.page==="homepage"? "topnav homepage":"topnav"}>
                    <div className={windowDimensions.width < maxWidth && "topnav-dropdown"}>
                        {windowDimensions.width < maxWidth && <button className="topnav-dropbtn"><i className="fa fa-bars" style={{fontSize: 30}}></i></button>}
                        {userType !== "I" && 
                            <div className={windowDimensions.width < maxWidth && "topnav-dropdown-content"}>
                                <a className={props.page==="homepage"? "active":""} href="/"><Home />Home</a>
                                {(!isManager(userType) && !isEmployee(userType)) && <a className={props.page==="menu"? "active":""} href="/menu"><ListAlt />Menu</a>}
                                {getUserID() && <a className={props.page==="reservation"? "active":""} href="/reservation"><Event />Reservation</a>}
                                {(!isManager(userType) && !isEmployee(userType)) && <a className={props.page==="discount"? "active":""} href="/discount"><LocalOffer />Discount</a>}
                                {isManager(userType) && <a className={props.page==="financialfigure"? "active":""} href="/financialfigure"><ShowChart />Financial Figures</a>}
                                {!getUserID() && <a className={props.page==="login"? "active":""} href="/login"><ExitToApp />Log In</a>}
                                {getUserID()? accountMenu(windowDimensions, maxWidth, props.page, userType) : <a className={props.page==="signup"? "active":""} href="/signup"><HowToReg />Sign Up</a>}
                            </div>
                        }
                    </div>
                </div>
                {props.page==="homepage" && homepageHeader(userType)}
            </header>
            <Outlet />
        </main>
    );
}

const accountMenu = (windowDimensions, maxWidth, page, userType) => {
    return (
        <div className={windowDimensions.width >= maxWidth && "topnav-dropdown"}>
            {windowDimensions.width >= maxWidth && <button className={(page==="profile" || page === "accountlist") ? "topnav-dropbtn-active topnav-dropbtn":"topnav-dropbtn"} ><AccountCircle />Account</button>}
            <div className={windowDimensions.width >= maxWidth && "topnav-dropdown-content"}>
                <a className={page==="profile"?"active":""} href="/profile"><AccountCircle />Profile</a>
                {isManager(userType) && <a className={page==="accountlist"?"active":""} href="/accountlist"><PlaylistAdd />Account List</a>}
                <a href="/" onClick={logOut}><MeetingRoom />Log Out</a>
            </div>
        </div>
    )
}

const isManager = (userType) => {
    return String(userType).toUpperCase() === "M";
}
const isEmployee = (userType) => {
    return String(userType).toUpperCase() === "E";
}

const getWindowDimensions = _ => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

const homepageHeader = (userType) => {
    return (
        <div>
            {restaurantName()}
            {bookingBtn(userType)}
        </div>
    )
}
const restaurantName = _ => {
    return(
        <div className="title">
            <h1 className="title-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span className="letters letters-left">Le Bistrot</span>
                    <span className="letters ampersand"></span>
                    <span className="letters letters-right" style={{paddingLeft: 10}}> d'Andre</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}
const bookingBtn = (userType) => {
    let bookingUrl = "/login";
    if(getUserID())
        bookingUrl = "/reservation";
    return(
        <div className="center booking-button">
            <a href={bookingUrl}>{ (String(userType).toUpperCase() === "M" || String(userType).toUpperCase() === "E") ? "Reservation List" : (
                    String(userType).toUpperCase() === "I" ? "" : "Book a Table"
                )}
            </a>
        </div>
    )
}
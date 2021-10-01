import React, {useState, useEffect} from "react";
import '../style/profile.css';
import {getUserID, logOut} from "../../App";
import { Confirmation } from "./Confirmation";
import { NormalField } from "./NormalField";
import { PasswordField } from "./PasswordField";
import { DateField } from "./DateField";

export const Profile = _ => {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setUsername(data.username));
    }, []);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setEmail(data.email));
    }, []);
    const [password, setPassword] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setPassword(data.password));
    }, []);
    const [firstName, setFirstName] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setFirstName(data.firstName));
    }, []);
    const [lastName, setLastName] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setLastName(data.lastName));
    }, []);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setDateOfBirth(data.dateOfBirth));
    }, []);
    const [contactNumber, setContactNumber] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setContactNumber(data.contactNumber));
    }, []);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setUserType(data.userType));
    }, []);
    const [oldPass, setOldPass] = useState(null);
    useEffect(() => {}, [oldPass]);

    const items = [];
    items.push(NormalField("Username", username, setUsername));
    items.push(NormalField("Email", email, setEmail));
    items.push(PasswordField("Password", password, setPassword));
    items.push(NormalField("First Name", firstName, setFirstName));
    items.push(NormalField("Last Name", lastName, setLastName));
    items.push(DateField("Date of Birth", String(dateOfBirth).substring(0,10), setDateOfBirth));
    items.push(NormalField("Contact Number", contactNumber, setContactNumber));

    const [buttonClicked, setButtonClicked] = useState(null);
    useEffect(() => {}, [buttonClicked]);

    const openEditValidation = _ => {
        setButtonClicked("edit");
        openForm();
    }
    const openDeleteValidation = _ => {
        setButtonClicked("delete");
        openForm();
    }

    // Confirmation Pop Up Window
    const openForm = _ => {
        document.getElementById("myForm").style.display = "block";
    }
    const closeForm = _ => {
        document.getElementById("myForm").style.display = "none";
    }
    
    const accountModification = _ => {
        if(buttonClicked === "edit")
            editPersonalInformation();
        else
            deleteAccount();
    }
    const editPersonalInformation = _ => {
        if(!(username && email && firstName && dateOfBirth && contactNumber))
            return alert("Please fill in all of the non-optional data!");
        if(password.length < 8)
            return alert("Password should be at least 8 characters!");

        fetch(`/api/updateuser?userID=${getUserID()}&username=${username}&password=${password}&validationPass=${oldPass}&email=${email}&firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}&contactNumber=${contactNumber}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    closeForm();
                }
            });
    }
    const deleteAccount = _ => {
        fetch(`/api/deleteuser?userID=${getUserID()}&password=${oldPass}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    logOut();
                }
            });
    }

    // If unauthorised users try to access the web page
    if(!getUserID())
        return window.location.href="/login";
    
    return(
        <section>
            {Confirmation(setOldPass, accountModification, closeForm)}
            <section className="profile">
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            {profilePicture(firstName, lastName, userType)}
                            {userData(items, openEditValidation, openDeleteValidation)}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

const profilePicture = (firstName, lastName, userType) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://i.pinimg.com/564x/89/64/99/8964998576cfac440b3a14df748fc670.jpg" alt="Admin" className="rounded-circle profile-picture" width="200" height="200"/>
                        <div className="mt-3">
                            <h4>{firstName + " " + lastName}</h4>
                            <p class="text-secondary mb-1">Account: {userType==='C'? "Customer":"Admin/Staff"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const userData = (items, openEditValidation, openDeleteValidation) =>{
    return(
        <div className="col-md-8">
            <div className="card mb-3">
                <div className="card-body">
                    {items}
                    <div className="column right-side-button">
                        <button class="btn-lg" onClick={openEditValidation} >Edit</button>
                        <button class="btn-lg" onClick={openDeleteValidation} >Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React from "react";
import '../style/profile.css';
import {getUserID, logOut} from "../App";

export function Profile(){
    const [username, setUsername] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setUsername(data.username));
    }, []);
    const [email, setEmail] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setEmail(data.email));
    }, []);
    const [password, setPassword] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setPassword(data.password));
    }, []);
    const [firstName, setFirstName] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setFirstName(data.firstName));
    }, []);
    const [lastName, setLastName] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setLastName(data.lastName));
    }, []);
    const [dateOfBirth, setDateOfBirth] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setDateOfBirth(data.dateOfBirth));
    }, []);
    const [contactNumber, setContactNumber] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setContactNumber(data.contactNumber));
    }, []);
    const [userType, setUserType] = React.useState(null);
    React.useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setUserType(data.userType));
    }, []);
    const [oldPass, setOldPass] = React.useState(null);
    React.useEffect(() => {}, [oldPass]);

    const items = [];
    items.push(normalField("Username", username, setUsername));
    items.push(normalField("Email", email, setEmail));
    items.push(passwordField("Password", password, setPassword));
    items.push(normalField("First Name", firstName, setFirstName));
    items.push(normalField("Last Name", lastName, setLastName));
    items.push(dateField("Date of Birth", String(dateOfBirth).substring(0,10), setDateOfBirth));
    items.push(normalField("Contact Number", contactNumber, setContactNumber));

    const [buttonClicked, setButtonClicked] = React.useState(null);
    React.useEffect(() => {}, [buttonClicked]);
    function openEditValidation(){
        setButtonClicked("edit");
        openForm();
    }
    function openDeleteValidation(){
        setButtonClicked("delete");
        openForm();
    }
    function openForm(){
        document.getElementById("myForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    
    function accountModification(){
        if(buttonClicked === "edit")
            editPersonalInformation();
        else
            deleteAccount();
    }
    function editPersonalInformation(){
        if(!(username && email && firstName && dateOfBirth && contactNumber))
            return alert("Please fill in all of the non-optional data!");
        if(password.length < 8)
            return alert("Password should be at least 8 characters!");

        fetch(`/api/updateuserdata?userID=${getUserID()}&username=${username}&password=${password}&validationPass=${oldPass}&email=${email}&firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}&contactNumber=${contactNumber}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    closeForm();
                }
            });
    }
    function deleteAccount(){
        fetch(`/api/deleteuser?userID=${getUserID()}&password=${oldPass}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    logOut();
                }
            });
    }

    return(
        <section>
            <div className="form-popup center" id="myForm">
                <form className="form-container">
                    <h2>Please enter your old password to continue the process!</h2>
                    <input type="password" placeholder="Enter Old Password" onChange={event => setOldPass(event.target.value)} required />
                    <div className="right-side-button">
                        <button type="button" onClick={accountModification}>Next</button>
                        <button type="button" onClick={closeForm} >Cancel</button>
                    </div>
                </form>
            </div>
            <section className="profile">
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
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
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

function normalField(title, data, setData){
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="text" onChange={event => setData(event.target.value)} value={data}/>
            </div>
            <hr/>
        </secion>
    );
}
function passwordField(title, data, setData){
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="password" onChange={event => setData(event.target.value)} value={data} />
            </div>
            <hr/>
        </secion>
    );
}
function dateField(title, data, setData){
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="date" onChange={event => setData(event.target.value)} value={data} />
            </div>
            <hr/>
        </secion>
    );
}
import React from "react";
import '../style/profile.css';
import { getUserID } from "../App";

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

    const items = [];
    items.push(personalInformation("Username", username));
    items.push(personalInformation("Email", email));
    items.push(personalInformation("First Name", firstName));
    items.push(personalInformation("Last Name", lastName));
    items.push(personalInformation("Date of Birth", dateOfBirth));
    items.push(personalInformation("Contact Number", contactNumber));

    function editPersonalInformation(){
        fetch(`/api/updateuserdata?userID=${getUserID()}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                
            });
    }
    function deleteAccount(){
        fetch(`/api/deleteaccount?userID=${getUserID()}`)
            .then((res) => { return res.json(); } )
            .then((data) => { console.log(data); });
    }

    return(
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
                                    <div className="column">
                                        <button class="btn-lg" onChange={editPersonalInformation} >Edit</button>
                                        <button class="btn-lg" onChange={deleteAccount} >Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function personalInformation(title, data){
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="text" value={data} />
            </div>
            <hr/>
        </secion>
    );
}
function dateField(title, data){
    return(
        <secion>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <input className="col-sm-9 text-secondary" type="date" value={data} />
            </div>
            <hr/>
        </secion>
    );
}
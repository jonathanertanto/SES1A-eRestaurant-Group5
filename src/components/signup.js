import React, {useEffect, useState} from "react";
import {logIn} from "../App.js";


export function Signup(){
    const [username, setUsername] = useState(null);
    useEffect(() => {}, [username]);

    const [password, setPassword] = useState(null);
    useEffect(() => {}, [password]);

    const [email, setEmail] = useState(null);
    useEffect(() => {}, [email]);

    const [firstName, setFirstName] = useState(null);
    useEffect(() => {}, [firstName]);

    const [lastName, setLastName] = useState(null);
    useEffect(() => {}, [lastName]);

    const [dateOfBirth, setDateOfBirth] = useState(null);
    useEffect(() => {}, [dateOfBirth]);

    const [contactNumber, setContactNumber] = useState(null);
    useEffect(() => {}, [contactNumber]);

    function newCustomer(){
        if(!(username && password && email && username && firstName && dateOfBirth && contactNumber))
            return alert("Please fill in all of the non-optional data!");
        if(password.length < 8)
            return alert("Password should be at least 8 characters!");
        
        logIn();
        window.location.href='/';
    }

    return(
        <section className="form-signup">
            {title()}
            <section>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" onChange={event => setUsername(event.target.value)} placeholder="username"/>
                    <label for="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" onChange={event => setEmail(event.target.value)} placeholder="name@example.com"/>
                    <label for="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating left-field">
                    <input type="text" className="form-control" id="first_name" onChange={event => setFirstName(event.target.value)} placeholder="First Name"/>
                    <label for="first_name">First Name</label>
                </div>
                <div className="form-floating right-field">
                    <input type="text" className="form-control" id="last_name" onChange={event => setLastName(event.target.value)} placeholder="Last Name"/>
                    <label for="last_name">Last Name (optional)</label>
                </div>
                <div className="form-floating">
                    <input type="date" className="form-control" id="date_of_birth" onChange={event => setDateOfBirth(event.target.value)} placeholder="DD/MM/YYYY"/>
                    <label for="date_of_birth">Date of Birth</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="contact_number" onChange={event => setContactNumber(event.target.value)} placeholder="Contact Number"/>
                    <label for="contact_number">Contact Number</label>
                </div>
            </section>
            {rememberMe()}
            <button className="w-100 btn btn-lg btn-primary" onClick={newCustomer}>Sign Up</button>
            {loginLink()}
        </section>
    );
}
function title(){
    return(
        <section>
            <h1>Sign Up</h1>
            <h3>with</h3>
            <h2>Le Bistrot d'Andre</h2>
        </section>
    );
}
function rememberMe(){
    return(
        <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"/> Remember me
            </label>
        </div>
    );
}
function loginLink(){
    return(
        <a href="/login">Already have an account</a>
    );
}
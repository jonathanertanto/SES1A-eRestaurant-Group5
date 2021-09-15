import React from "react";
import {logIn} from "../App.js";

export function Signup(){
    return(
        <section className="form-signup">
            {title()}
            {dataFields()}
            {rememberMe()}
            {signupBtn()}
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
function dataFields(){
    return(
        <section>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="username"/>
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
                <label for="email">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>
            <div className="form-floating left-field">
                <input type="text" className="form-control" id="first_name" placeholder="First Name"/>
                <label for="first_name">First Name</label>
            </div>
            <div className="form-floating right-field">
                <input type="text" className="form-control" id="last_name" placeholder="Last Name"/>
                <label for="last_name">Last Name (optional)</label>
            </div>
            <div className="form-floating">
                <input type="date" className="form-control" id="date_of_birth" placeholder="DD/MM/YYYY"/>
                <label for="date_of_birth">Date of Birth</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="contact_number" placeholder="Contact Number"/>
                <label for="contact_number">Contact Number</label>
            </div>
        </section>
    )
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
function signupBtn(){
    return(
        <button className="w-100 btn btn-lg btn-primary" onClick={newCustomer} >Sign Up</button>
    );
}
function loginLink(){
    return(
        <a href="/login">Already have an account</a>
    );
}

function newCustomer(){
    logIn();
}
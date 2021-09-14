import React from "react";

export function Login(){
    return(
        <section className="form-signin">
            {title()}
            {dataFields()}            
            {rememberMe()}
            {loginBtn()}
            {signupLink()}
        </section>
    )
}
function title(){
    return(
        <section>
            <h1>Welcome to</h1>
            <h3>Le Bistrot d'Andre</h3>
        </section>
    )
}
function dataFields(){
    return(
        <section>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="username"/>
                <label for="floatingInput">Email Address/Username</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <   label for="floatingPassword">Password</label>
            </div>
        </section>
    )
}
function rememberMe(){
    return (
        <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"/> Remember me
            </label>
        </div>
    );
}
function loginBtn(){
    return (
        <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
    );
}
function signupLink(){
    return(
        <a href="/signup">Create new account</a>
    );
}
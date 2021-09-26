import React, {useEffect, useState} from "react";

export const Login = _ => {
    const [username, setUsername] = useState(null);
    useEffect(() => {}, [username]);

    const [password, setPassword] = useState(null);
    useEffect(() => {}, [password]);

    let rememberMe = false;
    const handleChange = (e) => {
        rememberMe = e.target.checked;
    }

    const signIn = _ =>{
        if(!(username && password)){
            return alert("Invalid username/email and/or password!");
        }
        
        fetch(`/api/login?username=${username}&email=${username}&password=${password}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                if(!data.status){
                    alert("Invalid username/email and/or password!");
                }else{
                    localStorage.setItem("rememberMe", rememberMe);
                    if(rememberMe){
                        localStorage.setItem("userID", data.userID);
                    }else{
                        sessionStorage.setItem("userID", data.userID);
                    }
                    window.location.href='/';
                }
            });
    }

    return(
        <section className="form-signin">
            {title()}
            <section>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" onChange={event => setUsername(event.target.value)} placeholder="username"/>
                    <label for="floatingInput">Email Address/Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                <   label for="floatingPassword">Password</label>
                </div>
            </section>  
            <div className="checkbox mb-3">
                <label> <input type="checkbox" value="remember-me" onChange={handleChange}/> Remember me </label>
            </div>
            <button className="w-100 btn-lg" onClick={signIn}>Login</button>
            {signupLink()}
        </section>
    );
}
const title = _ =>{
    return(
        <section>
            <h1>Welcome to</h1>
            <h3>Le Bistrot d'Andre</h3>
        </section>
    )
}
const signupLink = _ =>{
    return(
        <a href="/signup">Create new account</a>
    );
    
}
import React, {useEffect, useState} from "react";

export const Signup = _ => {
    const [username, setUsername] = useState(null);
    useEffect(() => {}, [username]);

    const [password, setPassword] = useState(null);
    useEffect(() => {}, [password]);

    const [email, setEmail] = useState(null);
    useEffect(() => {}, [email]);

    const [firstName, setFirstName] = useState(null);
    useEffect(() => {}, [firstName]);

    const [lastName, setLastName] = useState("");
    useEffect(() => {}, [lastName]);

    const [dateOfBirth, setDateOfBirth] = useState(null);
    useEffect(() => {}, [dateOfBirth]);

    const [contactNumber, setContactNumber] = useState(null);
    useEffect(() => {}, [contactNumber]);

    let rememberMe = false;
    const handleChange = (e) =>{
        rememberMe = e.target.checked;
    }
    
    const newCustomer = _ => {
        if(!(username && email && firstName && dateOfBirth && contactNumber))
            return alert("Please fill in all of the non-optional data!");
        if(password.length < 8)
            return alert("Password should be at least 8 characters!");
        
        fetch(`/api/signup?username=${username}&password=${password}&email=${email}&firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}&contactNumber=${contactNumber}&accountType=C`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                if(!data.status){
                    alert(data.message);
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
            <div className="checkbox mb-3">
                <input type="checkbox" value="remember-me" onChange={handleChange}/> Remember me
            </div>
            <button className="w-100 btn-lg" onClick={newCustomer}>Sign Up</button>
            {loginLink()}
        </section>
    );
}
const title = _ => {
    return(
        <section>
            <h1>Sign Up</h1>
            <h3>with</h3>
            <h2>Le Bistrot d'Andre</h2>
        </section>
    );
}
const loginLink = _ => {
    return(
        <a href="/login">Already have an account</a>
    );
}
import React, {useState} from "react";

export const CreateAccount = _ => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);

    const closeDiscountForm = _ => {
        document.getElementById("createAccountForm").style.display = "none";
    }

    const addAccount = _ => {
        if(!(username && email && firstName && dateOfBirth && contactNumber))
            return alert("Please fill in all of the non-optional data!");
        if(password.length < 8)
            return alert("Password should be at least 8 characters!");
        
        const accountType = document.getElementById("accountTypeSelection").value;

        fetch(`/api/signup?username=${username}&password=${password}&email=${email}&firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dateOfBirth}&contactNumber=${contactNumber}&accountType=${accountType}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    window.location.reload();
                }
            });
    }

    return(
        <section id="createAccountForm" className="form-popup center form-container">
            <h2>CREATE NEW ACCOUNT</h2>
            <div className="form-floating">
                <select id="accountTypeSelection" >
                    <optgroup label="Account Types">
                        <option value="M">Manager</option>
                        <option value="E">Employee</option>
                        <option value="C">Customer</option>
                    </optgroup>
                </select>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="Username" onChange={event => setUsername(event.target.value)} />
                <label >Username</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="Email" onChange={event => setEmail(event.target.value)} />
                <label >Email</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                <label >Password</label>
            </div>
            <div className="form-floating left-field">
                <input type="text" className="form-control" placeholder="First Name" onChange={event => setFirstName(event.target.value)} />
                <label >First Name</label>
            </div>
            <div className="form-floating right-field">
                <input type="text" className="form-control" placeholder="Last Name (optional)" onChange={event => setLastName(event.target.value)} />
                <label >Last Name (optional)</label>
            </div>
            <div className="form-floating">
                <input type="date" className="form-control" onChange={event => setDateOfBirth(event.target.value)} />
                <label >Date of Birth</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="Contact Number" onChange={event => setContactNumber(event.target.value)} />
                <label >Contact Number</label>
            </div>
            <div className="center-side-button">
                <button type="button" className="btn-lg" onClick={addAccount}>Create</button>
                <button type="button" className="btn-lg" onClick={closeDiscountForm} >Cancel</button>
            </div>
        </section>
    )
}
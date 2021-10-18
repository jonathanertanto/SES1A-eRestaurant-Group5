import React from "react";
import '../../style/AccountList.css';

export const AccountTable = (users, username) => {
    return(
        <section>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className="col-1 text-center">Type</th>
                        <th scope="col" className="col-2 text-center">Username</th>
                        <th scope="col" className="col-2 text-center">Email</th>
                        <th scope="col" className="col-1 text-center">First Name</th>
                        <th scope="col" className="col-1 text-center">Last Name</th>
                        <th scope="col" className="col-1 text-center">Date of Birth</th>
                        <th scope="col" className="col-2 text-center">Contact Number</th>
                        <th scope="col" className="col-1 text-center"></th>
                        <th scope="col" className="col-1 text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {list(users, username)}
                </tbody>
            </table>
        </section>
    )
}

const list = (users, username) => {
    const items = [];
    for(let i=0; i<users.length; ++i){
        const item = users[i];
        items.push(tableItem(item, username));
    }
    return items;
}

const tableItem = (user, username) => {
    let dob = new Date(String(user.dateOfBirth));
    dob = dob.getFullYear() + "-" + ((dob.getMonth()+1) < 10 ? "0" : "") + (dob.getMonth()+1) + "-" + (dob.getDate() < 10 ? "0" : "") + dob.getDate();
    
    const updateData = _ =>{
        try{
            const username = document.getElementById(`usernameInput${user._id}`).value;
            const email = document.getElementById(`emailInput${user._id}`).value;
            const firstName = document.getElementById(`firstNameInput${user._id}`).value;
            const lastName = document.getElementById(`lastNameInput${user._id}`).value;
            const dateOfBirth = document.getElementById(`dobInput${user._id}`).value;
            const contactNumber = document.getElementById(`contactNumberInput${user._id}`).value;

            if(!(username && email && firstName && dateOfBirth && contactNumber))
                return alert("Please fill in all of the non-optional data!");
                
            fetch("/api/updateuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: user._id,
                    username: username,
                    password: user.password,
                    validationPass: user.password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    contactNumber: contactNumber
                })
            })
                .then((res) => { return res.json(); } )
                .then((data) => {
                    alert(data.message);
                    if(data.status){
                        window.location.reload();
                    }
                });
        }catch(error){
            alert(error);
        }
    }
    
    const deleteAccount = _ =>{
        try{
            if(!window.confirm(`Are you sure to delete ${user.username}?`)){
                return;
            }
            fetch(`/api/deleteuser?userID=${user._id}&password=${user.password}`)
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                if(data.status){
                    window.location.reload();
                }
            });
        }catch(error){
            alert(error);
        }
    }

    return (
        <tr>
            <td>{(String(user.userType).toUpperCase() === "C" ? "Customer" : (String(user.userType).toUpperCase() === "M" ? "Manager" : "Employee"))}</td>
            <td><input id={`usernameInput${user._id}`} className="form-control text-center" type="text" defaultValue={user.username}/></td>
            <td><input id={`emailInput${user._id}`} className="form-control text-center" type="text" defaultValue={user.email}/></td>
            <td><input id={`firstNameInput${user._id}`} className="form-control text-center" type="text" defaultValue={user.firstName}/></td>
            <td><input id={`lastNameInput${user._id}`} className="form-control text-center" type="text" defaultValue={user.lastName}/></td>
            <td><input id={`dobInput${user._id}`} className="form-control text-center" type="date" defaultValue={dob}/></td>
            <td><input id={`contactNumberInput${user._id}`} lassName="form-control text-center" type="text" defaultValue={user.contactNumber}/></td>
            {((String(user.userType).toUpperCase() !== "M" || String(username).toLowerCase() === "admin") &&  String(user.username).toLowerCase() !== "admin") ?  <td><button onClick={updateData} >Edit</button> </td> : <td></td> }
            {((String(user.userType).toUpperCase() !== "M" || String(username).toLowerCase() === "admin") &&  String(user.username).toLowerCase() !== "admin") ?  <td><button className="btn btn-sm btn-danger" onClick={deleteAccount} ><i className="fa fa-trash"></i> </button> </td> : <td></td> }
        </tr>
    )
}

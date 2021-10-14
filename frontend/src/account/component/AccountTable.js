import React from "react";
import '../style/AccountList.css';

export const AccountTable = (users) => {
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
                    {list(users)}
                </tbody>
            </table>
        </section>
    )
}

const list = (users) => {
    const items = [];
    for(let i=0; i<users.length; ++i){
        const item = users[i];
        items.push(tableItem(item));
    }
    return items;
}

const tableItem = (user) => {
    let dob = new Date(String(user.dateOfBirth));
    dob = dob.getFullYear() + "-" + ((dob.getMonth()+1) < 10 ? "0" : "") + (dob.getMonth()+1) + "-" + (dob.getDate() < 10 ? "0" : "") + dob.getDate();
    return (
        <tr>
            <td><input className="form-control text-center" type="text" defaultValue={(String(user.userType).toUpperCase() === "C" ? "Customer" : (String(user.userType).toUpperCase() === "M" ? "Manager" : "Employee"))}/></td>
            <td><input className="form-control text-center" type="text" defaultValue={user.username}/></td>
            <td><input className="form-control text-center" type="text" defaultValue={user.email}/></td>
            <td><input className="form-control text-center" type="text" defaultValue={user.firstName}/></td>
            <td><input className="form-control text-center" type="text" defaultValue={user.lastName}/></td>
            <td><input className="form-control text-center" type="date" defaultValue={dob}/></td>
            <td><input className="form-control text-center" type="text" defaultValue={user.contactNumber}/></td>
            <td><button >Edit</button> </td>
            <td><button className="btn btn-sm btn-danger" ><i className="fa fa-trash"></i> </button> </td>
        </tr>
    )
}

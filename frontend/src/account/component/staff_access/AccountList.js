import React, { useEffect, useState } from "react";
import { Title } from "../../../component/Title";
import '../../style/AccountList.css';
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";
import { AccountTable } from "./AccountTable";
import { getUserID } from "../../../App";
import { CreateAccount } from "./CreateAccount";

export const AccountList = _ => {
    const [username, setUsername] = useState("");
    const [filter, setFilter] = useState({
        accountType: "All Account Types"
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`/api/profile?userID=${getUserID()}`)
            .then((res) => {return res.json()})
            .then((data) => setUsername(data.username));
    }, []);

    useEffect(() => {
        const getData = async _ => {
            setUsers([]);
            const res = await fetch("/api/getaccountlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    accountType: filter.accountType
                })
            });
            const data = await res.json();
            if(!data.status)
                setUsers([]);
            else
                setUsers(data.users);
        }
        getData();
    }, [filter])

    const openCreateAccountForm = _ => {
        document.getElementById("createAccountForm").style.display = "block";
    }

    return(
        <section className="account-list">
            {CreateAccount()}
            {Title("Account List")}
            <div className="container">
                <div style={{marginBottom: 20}}>
                    {filterDropdown(filter, setFilter)}
                </div>
                <div style={{overflow: "auto"}}>
                    {AccountTable(users, username)}
                </div>
                <div style={{textAlign: "right"}}>
                    <button className="btn-lg" onClick={openCreateAccountForm}>Create New Account</button>
                </div>
            </div>
        </section>
    )
}

const filterDropdown = (filter, setFilter) => {
    const size = 12;
    return(
        <Row noGutters className="menu-dropdown filter-dropdown">
            {accountTypeFilter(filter, setFilter, size)}
        </Row>
    )
}

const accountTypeFilter = (filter, setFilter, size) => {
    const accountTypes = ["All Account Types", "Manager", "Employee", "Customer"];
    const getAccountType = _ => {
        let newAccountType = [];
        accountTypes.forEach(type => {
            newAccountType.push(
                <DropdownItem key={type} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...filter,
                                accountType: type
                            };
                            setFilter(newSel);
                        }}
                        >
                    {type}
                </DropdownItem>
            );
        });
        return newAccountType;
    }
    return(
        <Col xs="12" sm={size}>
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.accountType}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getAccountType()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
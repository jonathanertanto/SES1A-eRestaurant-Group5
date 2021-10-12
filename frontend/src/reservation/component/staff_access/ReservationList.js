import React from "react";
import {Title} from "../../../component/Title.js";
import '../../style/reservation.css';
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";
import {ReservationTable} from './ReservationTable'

export const ReservationList = (filter, setFilter, reservationsList, staffSelection, setStaffSelection, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders) => {
    return (
        <section className="reservation">
            {Title("Reservation")}
            <div className="container">
                <div style={{marginBottom: 20}}>
                    {filterDropdown(filter, setFilter)}
                </div>
                <div style={{overflow: "auto"}}>
                    {ReservationTable(reservationsList, staffSelection, setStaffSelection, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders)}
                </div>
            </div>
        </section>
    )
}

const filterDropdown = (filter, setFilter) => {
    return(
        <Row noGutters className="menu-dropdown filter-dropdown">
            {locationfilter(filter, setFilter)}
            {reservationTypefilter(filter, setFilter)}
        </Row>
    )
}

const locationfilter = (filter, setFilter) => {
    const locations = ["All Locations", "2/1-25 Harbour St", "123 Victoria St, Potts Point", "241 Victoria St, Darlinghurst"];
    const getLocation = _ => {
        let newLocation = [];
        locations.forEach(location => {
            newLocation.push(
                <DropdownItem key={location} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...filter,
                                location: location
                            };
                            setFilter(newSel);
                        }}
                        >
                    {location}
                </DropdownItem>
            );
        });
        return newLocation;
    }
    return(
        <Col xs="12" sm="6">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.location}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getLocation()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}

const reservationTypefilter = (filter, setFilter) => {
    const types = ["All", "Lunch", "Dinner"];
    const getType = _ => {
        let newType = [];
        types.forEach(type => {
            newType.push(
                <DropdownItem key={type} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...filter,
                                type: type
                            };
                            setFilter(newSel);
                        }}
                        >
                    {type}
                </DropdownItem>
            )
        })
        return newType;
    };
    return(
        <Col xs="12" sm="6">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.type}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getType()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
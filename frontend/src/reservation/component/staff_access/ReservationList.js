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
    const size = 4;
    return(
        <Row noGutters className="menu-dropdown filter-dropdown">
            {locationfilter(filter, setFilter, size)}
            {reservationTypefilter(filter, setFilter, size)}
            {completenessFilter(filter, setFilter, size)}
        </Row>
    )
}

const locationfilter = (filter, setFilter, size) => {
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
        <Col xs="12" sm={size}>
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.location}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getLocation()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}

const reservationTypefilter = (filter, setFilter, size) => {
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
        <Col xs="12" sm={size}>
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.type}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getType()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
// eslint-disable-next-line
const completenessFilter = (filter, setFilter, size) => {
    const status = ["All Reservations", "Completed Reservations", "Uncompleted Reservations"];
    const getStatus = _ => {
        let newStatus = [];
        status.forEach(completeness => {
            newStatus.push(
                <DropdownItem key={completeness} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...filter,
                                completeness: completeness
                            };
                            setFilter(newSel);
                        }}
                        >
                    {completeness}
                </DropdownItem>
            )
        })
        return newStatus;
    };
    return(
        <Col xs="12" sm={size}>
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.completeness}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getStatus()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
import React, { useState, useEffect } from "react";
import {Title} from "../../component/Title.js";
import "../style/FinancialFigure.css";
import { LineChart } from "./LineChart.js";
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";

export const FinancialFigure = _ => {
    const [filter, setFilter] = useState({
        timeInterval: "Daily",
        location: "All Locations",
        startPeriod: new Date().getFullYear() + "-" + (new Date().getMonth() < 10 && "0") + new Date().getMonth() + "-" + new Date().getDate(),
        endPeriod: new Date()
    });

    const [data, setData] = useState([]);
    useEffect(() => {
        try{
            const getData = async _ =>{
                const res = await fetch("/api/getfinancialreport", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        timeInterval: filter.timeInterval,
                        location: filter.location,
                        startDate: filter.startPeriod,
                        endDate: filter.endPeriod
                    })
                })
                const data = await res.json();
                if(data.status){
                    const temp = {
                        period: data.periods,
                        revenue: data.revenue,
                        profit: data.profit
                    }
                    setData(temp);
                }
            }
            getData();
        }catch(error){
            alert(error);
        }
    }, [filter])

    return(
        <section className="FinancialFigure">
            {Title("Financial Figures")}
            <div className="container">
                <div style={{marginBottom: 20}}>
                    {filterDropdown(filter, setFilter)}
                </div>
                {LineChart(data)}
            </div>
        </section>
    )
}

const filterDropdown = (filter, setFilter) => {
    const size = 3;
    return(
        <Row noGutters className="menu-dropdown filter-dropdown">
            {startPeriodFilter(filter, setFilter, size)}
            {endPeriodFilter(filter, setFilter, size)}
            {timeIntervalFilter(filter, setFilter, size)}
            {locationFilter(filter, setFilter, size)}
        </Row>
    )
}

const startPeriodFilter = (filter, setFilter, size) => {
    return(
        <Col xs="12" sm={size}>
            <input type="date" required="required" className="booking-dropdown" defaultValue = {filter.startPeriod}
                onChange={e => {
                    if (!isNaN(new Date(new Date(e.target.value)))) {
                        let newSel = {
                            ...filter,
                            startPeriod: new Date(e.target.value)
                        };
                        setFilter(newSel);
                    } else {
                        console.log("Invalid date");
                        let newSel = {
                            ...filter,
                            startPeriod: new Date()
                        };
                        setFilter(newSel);
                    }
                }}
            ></input>
        </Col>
    )
}

const endPeriodFilter = (filter, setFilter, size) => {
    return(
        <Col xs="12" sm={size}>
            <input type="date" required="required" className="booking-dropdown" defaultValue = {filter.endPeriod}
                onChange={e => {
                    if (!isNaN(new Date(new Date(e.target.value)))) {
                        let newSel = {
                            ...filter,
                            endPeriod: new Date(e.target.value)
                        };
                        setFilter(newSel);
                    } else {
                        console.log("Invalid date");
                        let newSel = {
                            ...filter,
                            endPeriod: new Date()
                        };
                        setFilter(newSel);
                    }
                }}
            ></input>
        </Col>
    )
}

const timeIntervalFilter = (filter, setFilter, size) => {
    const timeIntervals = ["Daily", "Weekly", "Monthly", "Yearly"];
    const getTimeInterval = _ => {
        let newTimeIntervals = [];
        timeIntervals.forEach(timeInterval => {
            newTimeIntervals.push(
                <DropdownItem key={timeInterval} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...filter,
                                timeInterval: timeInterval
                            };
                            setFilter(newSel);
                        }}
                        >
                    {timeInterval}
                </DropdownItem>
            );
        });
        return newTimeIntervals;
    }
    return(
        <Col xs="12" sm={size}>
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">{filter.timeInterval}</DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu">{getTimeInterval()}</DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}

const locationFilter = (filter, setFilter, size) => {
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


import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";
import '../style/reservation.css';
import {Table} from "./table";
import {getUserID} from "../App.js";

export const Book = _ => {
    const [totalTables, setTotalTables] = useState([]);

    // User's selections
    const [selection, setSelection] = useState({
        type: "Lunch",
        table: {
            name: null,
            id: null
        },
        date: new Date(),
        time: null,
        location: null,
        size: 0
    });

    // User's booking details
    const [note, setNote] = useState(null);

    // List of potential locations
    const [locations] = useState(["2/1-25 Harbour St", "123 Victoria St, Potts Point", "241 Victoria St, Darlinghurst"]);
    
    // List of reservation times
    const [times, setTimes] = useState(["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
    useEffect(() => {
        if(selection.type === "Lunch"){
            setTimes(["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);
        }else{
            setTimes(["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]);
        }
    }, [times, selection.type])

    // Get date and time selected by user
    const getDate = _ => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = selection.date.getFullYear();
        const month = months[selection.date.getMonth()];
        const day = selection.date.getDate();
        return (month+" "+day+" "+year+" "+selection.time+":00");
    };

    // Get Current Date and time + 1 hour
    const getCurrentDate = _ => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const time = date.getMinutes > 0? date.getHours()+1 : (date.getHours() + 2);
        const datetime = time < 24? (month+" "+day+" "+year+" "+time+":00:00") : (month+" "+(day+1)+" "+year+" "+(time-24)+":00:00");
        return datetime;
    }

    // Validate user selection date
    const isSelectedDateValid = _ => {
        return (new Date(getDate())).getTime() >= (new Date(getCurrentDate())).getTime();
    }
    
    const getEmptyTables = _ => {
        let tables = totalTables.filter(table => table.isAvailable);
        return tables.length;
    };

    // Get Available Tables
    useEffect(() => {
        // Check availability of tables
        if (isSelectedDateValid() && selection.location && selection.size) {
            (async _ => {
                let datetime = getDate();
                let res = await fetch("/availability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: datetime
                })
                });
                res = await res.json();

                // Sort available tables ascending according to the capacity and filter them with the location and group size criteria
                let tables = res.tables.sort((a,b) => a.capacity > b.capacity ? 1 : (b.capacity > a.capacity) ? -1 : 0).filter(
                table =>
                    (selection.size > 0 ? table.capacity >= selection.size && table.capacity-selection.size <=3 : true) &&
                    table.location === selection.location && table.isAvailable
                );
                setTotalTables(tables);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selection.time, selection.date, selection.size, selection.location])   ;

    // Create new reservation
    const reserve = async _ => {
        await fetch("/reserve", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...selection,
                date: getDate(),
                notes: note,
                userID: getUserID()
            })
        });
        closeForm();
    };

    // Generating tables from available tables state
    const getTables = _ => {
        console.log("Getting tables");
        if (getEmptyTables() > 0) {
            let tables = [];
            totalTables.forEach(table => {
                if (table.isAvailable) {
                    tables.push(
                        <Table
                            key={table._id}
                            id={table._id}
                            chairs={table.capacity}
                            name={table.name}
                            empty
                            selectTable={selectTable}
                        />
                    );
                } else {
                    tables.push(
                        <Table
                            key={table._id}
                            id={table._id}
                            chairs={table.capacity}
                            name={table.name}
                            selectTable={selectTable}
                        />
                    );
                }
            });
            return tables;
        }
    };

    // Confirmation Window
    const bookTable = _ => {
        openForm();
    }
    const openForm = _ => {
        document.getElementById("myForm").style.display = "block";
    }
    const closeForm = _ => {
        document.getElementById("myForm").style.display = "none";
    }

    // Clicking on a table sets the selection state
    const selectTable = (table_name, table_id, table_chairs) => {
        setSelection({
            ...selection,
            table: {
                name: table_name,
                id: table_id,
                capacity: table_chairs
            }
        });
        bookTable();
    };

    if(!getUserID())
        return window.location.href="/login";

    return (
        <section className="reservation">
            {confirmationWindow(reserve, closeForm, selection, setNote)}
            {title()}
            {bookReservation(selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid)}
        </section>
    );
};

const title = _ => {
    return(
        <div className="title2">
            <h1 className="title-non-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span>RESERVATION</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
    );
}

const bookReservation = (selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid) => {
    return(
        <div id="reservation-stuff">
            {reservationInfoSelection(selection, setSelection, times, locations)}
            {tablesSelection(selection, isSelectedDateValid, getEmptyTables, getTables)}
        </div>
    );
}

// Reservation Information Selections
const reservationInfoSelection = (selection, setSelection, times, locations) => {
    return(
        <Row noGutters className="text-center align-items-center reservation">
            {menuTypeSelection(selection, setSelection)}
            {dateSelection(selection, setSelection)}
            {timeSelection(selection, setSelection, times)}
            {locationSelection(selection, setSelection, locations)}
            {partySizeSelection(selection, setSelection)}
        </Row>
    );
}
const menuTypeSelection = (selection, setSelection) => {
    const menuType = ["Lunch", "Dinner"];
    // Generate menu type selection dropdown
    const getMenuType = _ => {
        let newType = [];
        menuType.forEach(type => {
            newType.push(
                <DropdownItem key={type} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...selection,
                                type: type,
                                table: {
                                    ...selection.table
                                },
                                time: null
                            };
                            setSelection(newSel);
                        }}>
                    {type}
                </DropdownItem>
            );
        });
        return newType;
    };
    return (
        <Col xs="12" sm="2">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown"> {selection.type} </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu"> {getMenuType()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
const dateSelection = (selection, setSelection) => {
    return(
        <Col xs="12" sm="2">
            <input type="date" required="required" className="booking-dropdown" defaultValue={new Date().getFullYear() + "-" + (new Date().getMonth()>8?(new Date().getMonth()+1):("0" + (new Date().getMonth()+1))) + "-" + new Date().getDate()}
                onChange={e => {
                    if (!isNaN(new Date(new Date(e.target.value)))) {
                        let newSel = {
                            ...selection,
                            table: {
                            ...selection.table
                            },
                            date: new Date(e.target.value)
                        };
                        setSelection(newSel);
                    } else {
                        console.log("Invalid date");
                        let newSel = {
                            ...selection,
                            table: {
                            ...selection.table
                            },
                            date: new Date()
                        };
                        setSelection(newSel);
                    }
                }}
            ></input>
        </Col>
    );
}
const timeSelection = (selection, setSelection, times) => {
    // Generate time dropdown
    const getTimes = _ => {
        let newTimes = [];
        times.forEach(time => {
            newTimes.push(
                <DropdownItem
                    key={time}
                    className="booking-dropdown-item"
                    onClick={_ => {
                        let newSel = {
                        ...selection,
                        table: {
                            ...selection.table
                        },
                        time: time
                        };
                        setSelection(newSel);
                    }}
                >
                {time}
                </DropdownItem>
            );
        });
        return newTimes;
    };
    return(
        <Col xs="12" sm="2">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                    {selection.time === null ? "Select a Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu"> {getTimes()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    );
}
const locationSelection = (selection, setSelection, locations) => {
    // Generate locations dropdown
    const getLocations = _ => {
        let newLocations = [];
        locations.forEach(loc => {
            newLocations.push(
                <DropdownItem
                    key={loc}
                    className="booking-dropdown-item"
                    onClick={_ => {
                        let newSel = {
                        ...selection,
                        table: {
                            ...selection.table
                        },
                        location: loc
                        };
                        setSelection(newSel);
                    }}
                >
                {loc}
                </DropdownItem>
            );
        });
        return newLocations;
    };

    return (
        <Col xs="12" sm="3">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                    {selection.location === null? "Select a Location" : selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu"> {getLocations()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
const partySizeSelection = (selection, setSelection) => {
    // Generate party size dropdown
    const getSizes = _ => {
        let newSizes = [];

        for (let i = 1; i < 8; i++) {
            newSizes.push(
                <DropdownItem
                    key={i}
                    className="booking-dropdown-item"
                    onClick={e => {
                        let newSel = {
                        ...selection,
                        table: {
                            ...selection.table
                        },
                        size: i
                        };
                        setSelection(newSel);
                    }}
                >
                {i}
                </DropdownItem>
            );
        }
        return newSizes;
    };

    return (
        <Col xs="12" sm="3">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                    {selection.size === 0 ? "Select a Party Size" : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu"> {getSizes()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    );
}

// Tables Selections
const tablesSelection = (selection, isSelectedDateValid, getEmptyTables, getTables) => {
    return (
        <Row noGutters className="tables-display">
            <Col>
                {selection.date && selection.time && selection.location && selection.size ? (
                    isSelectedDateValid() ? (
                        availableTablesSelection(getEmptyTables, getTables)
                    ) : (
                        <p className="table-display-message">Reservation must be at least 1 hour before from the current date and time!</p>
                    )
                ) : (
                    <p className="table-display-message">Please select the date, time, location, and party size for your reservation!</p>
                )}
            </Col>
        </Row>
    )
}
const availableTablesSelection = (getEmptyTables, getTables) => {
    return (
        getEmptyTables() > 0 ? (
            <div>
                <p className="available-tables">{getEmptyTables()} Table(s) Available</p>
                <div className="table-key">
                <span className="empty-table"></span> &nbsp; Available
                &nbsp;&nbsp;
                <span className="full-table"></span> &nbsp; Unavailable
                &nbsp;&nbsp;
                </div>
                <Row noGutters>{getTables()}</Row>
            </div>
        ) : (
            <p className="table-display-message">No Available Tables!</p>
        )
    );
}

// Booking Confirmation
const confirmationWindow = (reserve, closeForm, selection, setNote) => {
    return(
        <div className="form-popup center" id="myForm">
            <form className="form-container">
                    <h2>Reservation Confirmation</h2>
                    <div className="reservation confirmation-content">
                        <div className="form-floating">
                            <input type="text" className="form-control" value={selection.table.name} readOnly = {true}/>
                            <label for="floatingInput">Table Number</label>
                        </div>
                        <div className="reservation form-floating">
                        <input type="text" className="form-control" value={selection.table.capacity} readOnly = {true}/>
                        <label for="floatingInput">Table Capacity</label>
                        </div>
                    </div>
                    <div className="reservation confirmation-content">
                        <div className="reservation form-floating">
                            <input type="text" className="form-control" value={selection.type} readOnly = {true}/>
                            <label for="floatingInput">Reservation Type</label>
                        </div>
                        <div className="reservation form-floating">
                            <input type="text" className="form-control" value={selection.date.getFullYear() + "-" + (selection.date.getMonth()>8?(selection.date.getMonth()+1):("0"+(selection.date.getMonth()+1))) + "-" + selection.date.getDate() + " / " + selection.time} readOnly = {true}/>
                            <label for="floatingInput">Reservation Date/Time</label>
                        </div>
                    </div>
                    <div className="reservation confirmation-content">
                        <div className="reservation form-floating">
                            <input type="text" className="form-control" value={selection.location} readOnly = {true}/>
                            <label for="floatingInput">Reservation Location</label>
                        </div>
                        <div className="reservation form-floating">
                            <input type="text" className="form-control" value={selection.size} readOnly = {true}/>
                            <label for="floatingInput">Reservation Party Size</label>
                        </div>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Notes" onChange={event => setNote(event.target.value)} />
                        <label for="floatingInput">Notes (optional)</label>
                    </div>
                    <div className="right-side-button">
                        <button type="button" onClick={reserve} >Book</button>
                        <button type="button" onClick={closeForm} >Cancel</button>
                    </div>
            </form>
        </div>
    );
}
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
import {Table} from "./customer_access/Table";
import {getUserID} from "../../App.js";
import {Title} from "../../component/Title.js";
import {Reservation} from "./customer_access/Reservation";
import {Confirmation} from "./customer_access/Confirmation";
import {ReservationList} from "./staff_access/ReservationList";

export const Book = _ => {
    const [userType, setUserType] = useState("");
    const [totalTables, setTotalTables] = useState([]);

    const [staffSelection, setStaffSelection] = useState({
        customer: "",
        reservation: "",
        table: ""
    });
    const [filter, setFilter] = useState({
        location: "All Locations",
        type: new Date().getHours() >= 18? "Dinner" : "Lunch",
        completeness: "All Reservations"
    });
    const [reservationsList, setReservationsList] = useState("");
    // Customer's selections
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

    // Customer's reservation details
    const [note, setNote] = useState(null);
    const [reservation, setReservation] = useState("I");
    const [table, setTable] = useState("I");
    const [orders, setOrders] = useState("");
    const [meals, setMeals] = useState("");

    // Customer's invoice details
    const [subTotalPayment, setSubtotalPayment] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountDetail, setDiscountDetail] = useState("");
    const [oldOrders, setOldOrders] = useState("");

    // Discount offer list
    const [discountList, setDiscountList] = useState("");

    // List of potential locations
    const locations = ["2/1-25 Harbour St", "123 Victoria St, Potts Point", "241 Victoria St, Darlinghurst"];
    
    // List of reservation times
    const [times, setTimes] = useState(["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]);

    // Get the user's account type
    useEffect(() => {
        const getData = async _ =>{
            if(!getUserID()){
                return setUserType("");
            }
            const res = await fetch(`/api/profile?userID=${getUserID()}`);
            const data = await res.json();
            if(data.status)
                setUserType(data.userType);
            else
                setUserType("");
        }
        getData();
    }, []);

    //-----RESERVATION ACCESS FOR CUSTOMER-----
        // Get a customer active reservation with the table information
        useEffect(() => {
            const getData = async _ =>{
                if(!userType || userType !== 'C'){
                    setReservation("I");
                    setTable("I");
                }
                const res = await fetch("/api/getreservation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userID: getUserID()
                    })
                });
                const data = await res.json();
                setReservation(data.reservation);
                setTable(data.table);
            };
            getData();
        }, [userType]);

        // Get customer's orders with the meals information
        useEffect(() => {
            const getData = async _ =>{
                setOrders("");
                setMeals("");
                if( (!userType || userType !== 'C') && staffSelection.customer === ""){
                    return
                }
                const res = await fetch("/api/getorders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reservation: ((userType !== 'C' && staffSelection.reservation !== "") ? staffSelection.reservation._id : reservation._id)
                    })
                });
                const data = await res.json();
                setOrders(data.orders);
                setMeals(data.meals);
            };
            getData();
        }, [reservation, userType, staffSelection]);

        // Set customer's total sub payment
        useEffect(() => {
            let value = 0;
            for(let i=0; i<meals.length; ++i){
                value += Number(orders[i].quantity) * Number(meals[i].price);
            }
            setSubtotalPayment(value);
        }, [orders, meals]);

        // Set customer's applied discount
        useEffect(() => {
            const getData = async _ =>{
                setDiscount(0);
                setDiscountDetail("");
                if( (staffSelection.reservation === "" && (reservation === "I" || reservation === "" || String(reservation.discount) === "")) || (staffSelection.reservation !== "" && ((String(staffSelection.reservation.discount) === ""))) || meals.length <= 0 || orders.length <=0){
                    return;
                }
                const res = await fetch("/api/calculatediscount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        discountID: (userType === "C" ? reservation.discount : staffSelection.reservation.discount),
                        transaction: subTotalPayment,
                        meals: meals,
                        orders: orders
                    })
                });
                const data = await res.json();
                if(data.status){
                    setDiscount(Number(data.value));
                    setDiscountDetail(data.item);
                }
            }
            getData();
        }, [userType, reservation, subTotalPayment, meals, orders, staffSelection]);

        // Set temporary variable to store previous customer's orders
        useEffect(() => {
            const getData = async _ =>{
                setOldOrders("");
                if((reservation === "I" || reservation === "" ) && staffSelection.reservation === ""){
                    return;
                }
                const res = await fetch("/api/getorders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reservation: (userType === 'C' ? reservation._id : staffSelection.reservation._id)
                    })
                });
                const data = await res.json();
                setOldOrders(data.orders);
            };
            getData();
        }, [userType, reservation, staffSelection]);

        // Get filtered discount offer list
        useEffect(()=>{
            const getData = async _ => {
                setDiscountList("");
                const res = await fetch("/api/getdiscounts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userID: (staffSelection.customer !== "" && String(userType).toUpperCase() !== "C") ? staffSelection.customer._id : getUserID()
                    })
                });
                const data = await res.json();
                if(!data.status){
                    return setDiscountList("");
                }
                let reservationDate = String(userType).toUpperCase() === "C" ? new Date(String(table.date)) : new Date(String(staffSelection.date));
                reservationDate = new Date(reservationDate.getUTCFullYear(), reservationDate.getUTCMonth(), reservationDate.getUTCDate());
                if(String(userType).toUpperCase() === "C"){
                    setDiscountList(data.discounts.filter(data => 
                        (new Date(String(data.end_date)).getTime() >= reservationDate.getTime()) &&
                        (String(data.menuType)==="A" ? true : (new Date(String(table.date)).getUTCHours() >= 18? "Dinner":"Lunch") === (String(data.menuType)==="L"?"Lunch":"Dinner") )
                    ));
                }else{
                    setDiscountList(data.discounts.filter(data => 
                        (new Date(String(data.end_date)).getTime() > reservationDate.getTime()) &&
                        (String(data.menuType)==="A" ? true : (new Date(String(staffSelection.table.date)).getUTCHours() >= 18? "Dinner":"Lunch") === (String(data.menuType)==="L"?"Lunch":"Dinner") )
                    ));
                }
            }
            getData();
        }, [staffSelection, table, meals, userType]);
    //-----END OF SECTION-----

    //-----RESERVATION CREATION FOR CUSTOMER-----
        // Set available times for booking
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

        // Get Available Tables
        const getEmptyTables = _ => {
            let tables = totalTables.filter(table => table.isAvailable);
            return tables.length;
        };
        useEffect(() => {
            // Check availability of tables
            if (isSelectedDateValid() && selection.location && selection.size) {
                (async _ => {
                    let datetime = getDate();
                    let res = await fetch("/api/availability", {
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

        // Create new reservation
        const reserve = async _ => {
            await fetch("/api/reserve", {
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
            window.location.reload();
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
    //-----END OF SECTION-----
        
    //-----RESERVATION LIST FOR STAFF
        // Filter reservation list
        useEffect(() => {
            const getData = async _ => {
                setReservationsList("");
                if(!userType || userType === 'C'){
                    return;
                }
                const res = await fetch("/api/getreservationlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        location: filter.location,
                        type: filter.type,
                        completeness: filter.completeness
                    })
                });
                const data = await res.json();
                if(data.reservations === ""){
                    return setReservationsList("");
                }
                setReservationsList(data.reservations.sort(
                    (a, b) => a.table.date < b.table.date ? 1 : (b.table.date < a.table.date) ? -1 : 0
                ));
            }
            getData();
        }, [filter, userType, staffSelection]);
    //-----END OF SECTION-----

    // If Unauthorised users try to open
    // if(!getUserID()){
    //     return window.location.href="/login";
    // }

    if(!getUserID() || !userType || String(userType) === ""){
        return (<section></section>);
    }
    
    if(String(userType).toUpperCase() === "C"){
        return customerView(reserve, closeForm, setNote, selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid, getDate, reservation, table, getCurrentDate, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders);
    }else{
        return ReservationList(filter, setFilter, reservationsList, staffSelection, setStaffSelection, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders);
    }
};

// Customer Access
const customerView = (reserve, closeForm, setNote, selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid, getDate, reservation, table, getCurrentDate, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders) => {
    return (
        <section className="reservation">
            {reservation? (
                reservation === "I"? (
                    <div></div>
                ) : (
                    Reservation(reservation, table, getCurrentDate, orders, meals, discountList, subTotalPayment, discount, discountDetail, oldOrders)
                )
            ):
                createNewBooking(reserve, closeForm, setNote, selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid, getDate)
            }
        </section>
    )
}

const createNewBooking = (reserve, closeForm, setNote, selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid, getDate) => {
    return(
        <section className="reservation">
            {<Confirmation reserve={reserve} closeForm={closeForm} selection={selection} setNote={setNote} getDate={getDate} />}
            {Title("Reservation")}
            {bookReservation(selection, setSelection, times, locations, getEmptyTables, getTables, isSelectedDateValid)}
        </section>
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
                <DropdownMenu className="booking-dropdown-menu"> {getMenuType()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
const dateSelection = (selection, setSelection) => {
    const month = new Date().getMonth()+1;
    const date = new Date().getFullYear() + "-" + (month < 10 && "0") + month + "-" + new Date().getDate();
    return(
        <Col xs="12" sm="2">
            <input type="date" required="required" className="booking-dropdown" defaultValue={date}
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
                <DropdownMenu className="booking-dropdown-menu"> {getTimes()} </DropdownMenu>
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
                <DropdownMenu className="booking-dropdown-menu"> {getLocations()} </DropdownMenu>
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
                <DropdownMenu className="booking-dropdown-menu"> {getSizes()} </DropdownMenu>
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
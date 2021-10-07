import React, {useState, useEffect} from "react";
import '../style/menu.css';
import {getUserID} from "../../App";
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";
import {Title} from "../../component/Title.js";
import {Meal} from "./Meal";
import {Order} from "./Order";

export const Menu = _ =>{
    // User's selection
    const [selection, setSelection] = useState({
        menuType: "",
        mealType: "All Types of Meal",
        meal: null,
        quantity: 1,
        notes: ""
    });

    // User's booking details
    const [reservation, setReservation] = useState("");
    const [table, setTable] = useState("");
    useEffect(() => {
        const getData = async _ =>{
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
            setReservation(data.booking);
            setTable(data.table);
            if(data.table === ""){
                return;
            }
            let newSelection = {
                menuType: (new Date(String(data.table.date)).getHours() >= 18? "Dinner":"Lunch"),
                mealType: "All Types of Meal",
                meal: null,
                quantity: 1,
                notes: ""
            }
            setSelection(newSelection);
        };
        if(getUserID())
            getData();
    }, []);

    useEffect(() => {
        if(table===""){
            return selection.menuType = "All Types of Menu"
        }
        if(new Date(String(table.date)).getHours() >= 18){
            selection.menuType = "Dinner";
        }else{
            selection.menuType = "Lunch";
        }
        // eslint-disable-next-line
    }, [table]);

    // Menu details
    const [foods, setFoods] = useState(null);
    const [drinks, setDrinks] = useState(null);
    
    useEffect(() => {
        const getData = async _ =>{
            try{
                //This line is just for demonstration purpose only. In real-life, it will not be implemented and the manager will need to add the meal items by themselve.
                const response = await fetch(`/api/gettestingmenu`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // This is the code that will be use during deployment
                // const response = await fetch(`/api/getallmeals`);
                const data = await response.json();
                let items = data.menuItem;
                if(selection.menuType !== "All Types of Menu"){
                    items = data.menuItem.filter(
                        item => item.menuType === "all"? true : selection.menuType.toLowerCase() === item.menuType
                    );
                }
                const foods = items.filter(
                    food => food.type === 'f'
                );
                const drinks = items.filter(
                    drink => drink.type === 'd'
                );
                setFoods(foods);
                setDrinks(drinks);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    }, [selection.menuType]);

    const getReservationMenuType = _ => {
        return new Date(String(table.date)).getHours() >= 18 ?  "Dinner" : "Lunch";
    }

    // Order Window
    const addOrder = (meal) => {
        if(!getUserID()){
            alert("Please log to an account first before accessing this feature!");
            return window.location.href='/login';
        }
        if(reservation === ""){
            return alert("You have no active reservation at the moment. Please book a table first before ordering a meal!");
        }
        if(!(getReservationMenuType().toLowerCase() === meal.menuType || meal.menuType === "all")){
            return alert("Please select the meal according to your reservation menu type!");
        }
        selection.meal = meal;
        openForm();
    }
    const openForm = _ => {
        document.getElementById("myForm").style.display = "block";
    }
    const orderMeal = async _ => {
        if(!Number.isFinite(Number(selection.quantity)) || Number(selection.quantity)%1 !== 0 || Number(selection.quantity) <= 0 ){
            return alert("Please fill in the quantity with a non decimal number larger than 0!");
        }
        const res = await fetch("/api/ordermeal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: selection.quantity,
                notes: selection.notes,
                meal: selection.meal._id,
                reservation: reservation._id
            })
        });
        const data = await res.json();
        if(!data.status){
            alert("Failed to order meal!");
        }else{
            alert("Successfully added meal order!");
            closeForm();
        }
    }
    const closeForm = _ => {
        document.getElementById("myForm").style.display = "none";
        let newSel = {
            ...selection,
            quantity: 1,
            notes: ""
        };
        setSelection(newSel);
    }
    
    return(
        <section className="menu">
            {Order(selection, setSelection, closeForm, orderMeal)}
            {Title("Menu")}
            {selectionDropdown(selection, setSelection)}
            {foods && (selection.mealType === "Foods" || selection.mealType === "All Types of Meal" ) ? (
                Meal("FOODS", foods, addOrder)
            ) : <div></div>}
            {drinks && (selection.mealType === "Drinks" || selection.mealType === "All Types of Meal" ) ? (
                Meal("DRINKS", drinks, addOrder)
            ) : <div></div>}
        </section>
    );
}

const selectionDropdown = (selection, setSelection) => {
    return (
        <Row noGutters className="menu-dropdown">
            {menuTypeSelection(selection, setSelection)}
            {mealTypeSelection(selection, setSelection)}
        </Row>
    );
}
const menuTypeSelection = (selection, setSelection) => {
    const menuTypes = ["All Types of Menu", "Lunch", "Dinner"];
    // Generate menu type selection dropdown
    const getMenuType = _ => {
        let newType = [];
        menuTypes.forEach(type => {
            newType.push(
                <DropdownItem key={type} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...selection,
                                menuType: type
                            };
                            setSelection(newSel);
                        }}
                        >
                    {type}
                </DropdownItem>
            );
        });
        return newType;
    };
    return (
        <Col xs="12" sm="6">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown"> {selection.menuType} </DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu"> {getMenuType()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
const mealTypeSelection = (selection, setSelection) => {
    const menuType = ["All Types of Meal", "Foods", "Drinks"];
    // Generate menu type selection dropdown
    const getMealType = _ => {
        let newType = [];
        menuType.forEach(type => {
            newType.push(
                <DropdownItem key={type} className="booking-dropdown-item" 
                        onClick={_=> {
                            let newSel = {
                                ...selection,
                                mealType: type
                            };
                            setSelection(newSel);
                        }}
                        >
                    {type}
                </DropdownItem>
            );
        });
        return newType;
    };
    return (
        <Col xs="12" sm="6">
            <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown"> {selection.mealType} </DropdownToggle>
                <DropdownMenu className="booking-dropdown-menu"> {getMealType()} </DropdownMenu>
            </UncontrolledDropdown>
        </Col>
    )
}
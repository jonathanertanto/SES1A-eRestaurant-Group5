import React, {useState, useEffect} from "react";
import {AddShoppingCart} from '@material-ui/icons/';
import '../style/menu.css';
import {getUserID} from "../App";
import {
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}from "reactstrap";

export const Menu = _ =>{
    // User's booking details
    const [booking, setBooking] = useState("I");
    const [table, setTable] = useState("I");
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
            setBooking(data.booking);
            setTable(data.table);
        };
        if(getUserID())
            getData();
    }, []);

    // User's selection
    const [selection, setSelection] = useState({
        menuType: "",
        mealType: "All Types of Meal",
    });

    useEffect(() => {
        if(table==="I" || table===""){
            return selection.menuType = "All Types of Menu"
        }
        if(new Date(String(table.date)).getHours() >= 18){
            selection.menuType = "Lunch";
        }else{
            selection.menuType = "Dinner";
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

    // Order Window
    const addOrder = (event) => {
        if(!getUserID()){
            return window.location.href='/login';
        }
        openForm(event.id);
    }
    const openForm = (itemID) => {
        document.getElementById("myForm").style.display = "block";
    }
    const closeForm = _ => {
        document.getElementById("myForm").style.display = "none";
    }
    
    return(
        <section className="menu">
            {orderWindow(closeForm)}
            {title()}
            {selectionDropdown(selection, setSelection)}
            {foods && (selection.mealType === "Foods" || selection.mealType === "All Types of Meal" ) ? (
                <section>
                    <h2>FOODS</h2>
                    <div className="foods menu-list">
                        {foods.map((meal, index) => (
                            <div key={index} className="menu-item">
                                <div className="meal-selection-container">
                                    <img src={meal.image} className="menu-item img" alt={meal.name}/>
                                    <div className="meal-selection">
                                        <button id={meal._id} onClick={addOrder} type="button" ><AddShoppingCart />Order</button>
                                    </div>
                                </div>
                                <div className="name">{meal.name}</div>
                                <div className="description">{meal.description}</div>
                                <div className="price">${meal.price}</div>
                            </div>
                        ))}
                    </div>
                </section>
            ):<div></div>}
            {drinks && (selection.mealType === "Drinks" || selection.mealType === "All Types of Meal" ) ? (
                <section>
                    <h2>DRINKS</h2>
                    <div className="drinks menu-list">
                        {drinks.map((meal, index) => (
                            <div key={index} className="menu-item">
                                <div className="meal-selection-container">
                                    <img src={meal.image} className="menu-item img" alt={meal.name}/>
                                    <div className="meal-selection">
                                        <button id={meal._id} onClick={addOrder} type="button" ><AddShoppingCart />Order</button>
                                    </div>
                                </div>
                                <div className="name">{meal.name}</div>
                                <div className="description">{meal.description}</div>
                                <div className="price">${meal.price}</div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : <div></div>}
        </section>
    );
}

const orderWindow = (closeForm) => {
    return(
        <div className="form-popup center" id="myForm">
            <form className="form-container">
                <h2>Please input the quantity and additional notes for the meal order!</h2>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Quantity" required />
                    <label for="floatingInput">Quantity</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Note" />
                    <label for="floatingInput">Note</label>
                </div>
                <div className="right-side-button">
                    <button type="button" >Next</button>
                    <button type="button" onClick={closeForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}
const title = _ => {
    return(
        <div className="title2">
            <h1 className="title-non-animation">
                <span className="text-wrapper">
                    <span className="line line1"></span>
                    <span>MENU</span>
                    <span className="line line2"></span>
                </span>
            </h1>
        </div>
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
import React, {useState, useEffect} from "react";
import {AddShoppingCart} from '@material-ui/icons/';
import '../style/menu.css';
import {getUserID} from "../App";

export function Menu(){
    const [menuItems, setMenuItems] = useState(null);
    useEffect(() => {
        getData();
        async function getData(){
            // This function is just for demonstration purpose only. In real-life, it will not be implemented and the manager will need to add the meal items by themselve.
                await fetch(`/api/deleteallmeal`);
                setMenu();
            // End of comment
            const response = await fetch(`/api/getallmeals`);
            const data = await response.json();
            setMenuItems(data.menuItem);
        }
    }, []);
    
    function addOrder(event){
        if(!getUserID()){
            return window.location.href='/login';
        }
        openForm(event.id);
    }
    function openForm(itemID){
        document.getElementById("myForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    
    return(
        <section className="menu">
            <div className="form-popup center" id="myForm">
                <form className="form-container">
                    <h2>Please input the quantity and additional notes for the meal order!</h2>
                    <input type="text" placeholder="Quantity" required />
                    <input type="text" placeholder="Note" required />
                    <div className="right-side-button">
                        <button type="button" >Next</button>
                        <button type="button" onClick={closeForm} >Cancel</button>
                    </div>
                </form>
            </div>
            {title()}
            {menuItems && (
                <div className="menuItems menu-list">
                    {menuItems.map((meal, index) => (
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
            )}
        </section>
    );
}
function title(){
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
// These two functions are just for demonstration purpose only. In real-life, they will not be implemented and the manager will need to add the meal items by themselve.
function setMenu(){
    const images = [
        "https://uppercutsteakhouse.com/wp-content/uploads/2019/09/menu-dry-agedc.jpg", "https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg",
        "https://i.pinimg.com/564x/d4/c9/31/d4c9317f618ef2eff5e74cd91240460b.jpg", "https://i.pinimg.com/564x/6c/6e/8d/6c6e8dabd1808b9b17c0f0425e812f60.jpg", 
        "https://i.pinimg.com/474x/96/44/81/964481b56cc24fb0b5cb26163d8c7d1e.jpg", "https://i.pinimg.com/564x/fa/19/22/fa1922802ace93daf1b828251071c4ed.jpg", 
        "https://i.pinimg.com/564x/2d/7d/6c/2d7d6ce126fc1e27234546ec516b4b3b.jpg", "https://i.pinimg.com/564x/90/0e/4b/900e4b973211894ab95539ad8319b061.jpg",
        "https://i.pinimg.com/564x/b9/33/1d/b9331d3bda91816550a2f92adbc99219.jpg", "https://i.pinimg.com/564x/f4/0d/5e/f40d5eb9df1742ab0eee40fc4bb86277.jpg"
    ];
    const names = ["Meal 1", "Meal 2", "Meal 3", "Meal 4", "Meal 5", "Drink 1", "Drink 2", "Drink 3", "Drink 4", "Drink 5"];
    const descriptions = ["Description 1", "Description 2", "Description 3", "Description 4", "Description 5", "Description 6", "Description 7",  "Description 8", "Description 9", "Description 10"];
    const prices = [25, 25, 20, 27, 23, 6, 6, 5.5, 6.5, 7];
    const costs = [8, 8, 6, 9, 7, 2.5, 2.5, 2, 3, 3, 3.5];
    const types = ["all", "all", "all", "all", "all", "all", "all", "all", "all", "all"];

    for(let i=0; i<10; ++i){
        addMealItem(images[i], names[i], descriptions[i], prices[i], costs[i], types[i]);
    }
}
async function addMealItem(img, nm, des, prc, cst, typ){
    const data = {
        image: img,
        name: nm,
        description: des,
        price: prc,
        cost: cst,
        type: typ
    }
    await fetch('/api/addmeal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((res) => { return res.json(); } )
        .then((data) => {});
}
// end of comment
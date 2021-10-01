import React from "react";
import {AddShoppingCart} from '@material-ui/icons/';
import '../style/menu.css';

export const Meal = (title, meals, addOrder) =>{
    return(
        <section>
            <h2>{title}</h2>
            <div className="meals menu-list">
                {meals.map((meal, index) => (
                    <div key={index} className="menu-item">
                        <div className="meal-selection-container">
                            <img src={meal.image} className="menu-item img" alt={meal.name}/>
                            <div className="meal-selection">
                                <button onClick={_=>{addOrder(meal)}} type="button" ><AddShoppingCart />Order</button>
                            </div>
                        </div>
                        <div className="name">{meal.name}</div>
                        <div className="description">{meal.description}</div>
                        <div className="price">${meal.price}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
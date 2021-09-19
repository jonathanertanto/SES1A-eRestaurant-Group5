import React, {useState, useEffect} from "react";
import '../style/menu.css';

export function Menu(){
    const [menuItems, setMenuItems] = useState(null);
    useEffect(() => {
        getData();
        async function getData(){
            // This function is just for demonstration purpose only. In real-life, it will not be implemented and the manager will need to add the meal items by themselve.
                const deletion = await fetch(`/api/deleteallmeal`);
                setMenu();
            // End of comment
            const response = await fetch(`/api/getallmeals`);
            const data = await response.json();
            setMenuItems(data.menuItem);
        }
    }, []);

    
    return(
        <section>
            {menuItems && (
                <div className="menuItems menu-list">
                    {menuItems.map((meal, index) => (
                        <div key={index} className="menu-item">
                            <img src={meal.image} alt="Menu 1, Description, Price"/>
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

// These two functions are just for demonstration purpose only. In real-life, they will not be implemented and the manager will need to add the meal items by themselve.
async function setMenu(){
    const images = [
        "https://uppercutsteakhouse.com/wp-content/uploads/2019/09/menu-dry-agedc.jpg", "https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg",
        "https://i.pinimg.com/564x/d4/c9/31/d4c9317f618ef2eff5e74cd91240460b.jpg", "https://i.pinimg.com/564x/6c/6e/8d/6c6e8dabd1808b9b17c0f0425e812f60.jpg", "https://i.pinimg.com/474x/96/44/81/964481b56cc24fb0b5cb26163d8c7d1e.jpg"
    ];
    const names = ["Meal 1", "Meal 2", "Meal 3", "Meal 4", "Meal 5"];
    const descriptions = ["Description 1", "Description 2", "Description 3", "Description 4", "Description 5"];
    const prices = [25, 25, 20, 27, 23];
    const costs = [8, 8, 6, 9, 7];
    const types = ["all", "all", "all", "all", "all"];

    for(let i=0; i<5; ++i){
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
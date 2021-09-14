import React from "react";
import '../style/menu.css';

export function Menu(){
    return(
        <section>
            {menuItem()}
        </section>
    );
}

//this function is just there to show you what design would looks like. Not the final code!
function menuItem(){
    return(
        <section className="menu-list">
            <div className="menu-item">
                <img src="https://uppercutsteakhouse.com/wp-content/uploads/2019/09/menu-dry-agedc.jpg" alt="Menu 1, Description, Price"/>
                <div className="name">Menu 1</div>
                <div className="description">Description</div>
                <div className="price">$xxx</div>
            </div>
            <div className="menu-item">
                <img src="https://i.pinimg.com/564x/77/c5/e7/77c5e7acb0f6e244bfeed141f19b8b71.jpg" alt="Menu 2, Description, Price"/>
                <div className="name">Menu 2</div>
                <div className="description">Description</div>
                <div className="price">$xxx</div>
            </div>
            <div className="menu-item">
                <img src="https://i.pinimg.com/564x/d4/c9/31/d4c9317f618ef2eff5e74cd91240460b.jpg" alt="Menu 3, Description, Price"/>
                <div className="name">Menu 3</div>
                <div className="description">Description</div>
                <div className="price">$xxx</div>
            </div>
            <div className="menu-item">
                <img src="https://i.pinimg.com/564x/6c/6e/8d/6c6e8dabd1808b9b17c0f0425e812f60.jpg" alt="Menu 4, Description, Price"/>
                <div className="name">Menu 4</div>
                <div className="description">Description</div>
                <div className="price">$xxx</div>
            </div>
            <div className="menu-item">
                <img src="https://i.pinimg.com/474x/96/44/81/964481b56cc24fb0b5cb26163d8c7d1e.jpg" alt="Menu 5, Description, Price"/>
                <div className="name">Menu 5</div>
                <div className="description">Description</div>
                <div className="price">$xxx</div>
            </div>
        </section>
    )
}
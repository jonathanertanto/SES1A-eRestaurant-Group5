import React from "react";
import '../style/menu.css';

export const Order = (selection, setSelection, closeForm, orderMeal) => {
    return(
        <div className="form-popup center" id="myForm">
            <form className="form-container">
                <h2>Please input the quantity and additional notes for the meal order!</h2>
                <div className="form-floating">
                    <input type="text" className="form-control" value={selection.quantity} placeholder="Quantity" required 
                        onChange={event => {
                            let newSel = {
                                ...selection,
                                quantity: event.target.value
                            };
                            setSelection(newSel);
                        }} 
                    />
                    <label for="floatingInput">Quantity</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" value={selection.notes} placeholder="Notes" 
                        onChange={event => {
                            let newSel = {
                                ...selection,
                                notes: event.target.value
                            };
                            setSelection(newSel);
                        }} 
                    />
                    <label for="floatingInput">Notes (optional)</label>
                </div>
                <div className="right-side-button">
                    <button type="button" onClick={orderMeal} >Order</button>
                    <button type="button" onClick={closeForm} >Cancel</button>
                </div>
            </form>
        </div>
    );
}
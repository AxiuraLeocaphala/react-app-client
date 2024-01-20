import React from "react";
import './button.css';

const Button = (props) => {
    return (
        <div className="btnEnable">
            <div className="btn-space">
                <button className="buttonAddToBasket">{props.price}</button>
            </div>
        </div>
    );
}

export default Button;
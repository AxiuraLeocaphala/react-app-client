import React, { useRef, useState } from 'react';
import {QueryAdd} from '../request/queryAdd';
import {QueryIncrease} from '../request/queryIncrease';
import {QueryReduce} from '../request/queryReduce';
import './button.css';

const Button = ({ product, locationCall, deleteCard, updateTotalPrice }) => { 
    const [quantity] = useState(product['Quantity'] || 0);
    const buttonSpaceRef = useRef(null); 
    
    const handleClickOnButtonMain = () => {
        QueryAdd(product, buttonSpaceRef.current, locationCall, deleteCard);
    };
    const handleClickOnButtonIncrease = () => {
        QueryIncrease(product, buttonSpaceRef.current, locationCall, updateTotalPrice)
    };
    const handleClickOnButtonReduce = () => {
        QueryReduce(product, buttonSpaceRef.current, locationCall, deleteCard, updateTotalPrice);
    };
    
    return (
        <div ref={buttonSpaceRef} className='buttonSpace'>
            { quantity === 0  ? (
                <button className='buttonAddToBusket' onClick={handleClickOnButtonMain}>
                    {product["ProductPrice"]} ₽
                </button>
            ) : (
                <>
                    <button className='buttonReduce' onClick={handleClickOnButtonReduce}>-</button>
                    <input className='quantity' type="text" readOnly value={product["Quantity"]}/>
                    <button className='buttonIncrease' onClick={handleClickOnButtonIncrease}>+</button>
                </>
            )}
        </div>
    );
}

export default Button;
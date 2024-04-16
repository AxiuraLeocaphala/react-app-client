import React, { useRef, useState } from 'react';
import { HookTelegram } from '../hooks/hookTelegram';
import {QueryAdd} from '../query/queryAdd';
import {QueryIncrease} from '../query/queryIncrease';
import {QueryReduce} from '../query/queryReduce';
import './button.css';

const Button = ({ product, placeCall, deleteCard }) => { 
    const [quantity] = useState(product['Количество'] || 0);
    const buttonSpaceRef = useRef(null); 
    
    const handleClickOnButtonMain = () => {
        QueryAdd(HookTelegram(), product, buttonSpaceRef.current, placeCall, deleteCard);
    };
    const handleClickOnButtonIncrease = () => {
        QueryIncrease(HookTelegram(), product, buttonSpaceRef.current)
    };
    const handleClickOnButtonReduce = () => {
        QueryReduce(HookTelegram(), product, buttonSpaceRef.current, placeCall, deleteCard);
    };
    
    return (
        <div ref={buttonSpaceRef} className='buttonSpace'>
            { quantity === 0  ? (
                <button className='buttonAddToBusket' onClick={handleClickOnButtonMain}>
                    {product["Стоимость"]} ₽
                </button>
            ) : (
                <>
                    <button className='buttonReduce' onClick={handleClickOnButtonReduce}>-</button>
                    <input className='quantity' type="text" readOnly value={product["Количество"]}/>
                    <button className='buttonIncrease' onClick={handleClickOnButtonIncrease}>+</button>
                </>
            )}
        </div>
    );
}

export default Button;
import React, { useRef, useState } from 'react';
import {HookTelegram} from './../hookTelegram/hookTelegram.jsx';
import {QueryAdd} from '../query/queryAdd';
import {QueryIncrease} from '../query/queryIncrease';
import {QueryReduce} from '../query/queryReduce';
import './button.css'
;
const Button = ({ product }) => {
    const [quantity] = useState(product["Количество в корзине"] || 0);
    const buttonSpaceRef = useRef(null);
    const handleClickOnButtonReduce = () => {
        QueryReduce(HookTelegram().chatId, product, buttonSpaceRef.current);
    }

    const handleClickOnButtonIncrease = () => {
        QueryIncrease(HookTelegram().chatId, product, buttonSpaceRef.current)
    }

    const handleClickOnButtonMain = () => {
        QueryAdd(HookTelegram().chatId, product, buttonSpaceRef.current);
    }
    
    return (
        <div 
            ref={buttonSpaceRef}
            className='buttonSpace'
        >
            { quantity === 0  ? (
                    <button className='buttonAddToBusket' onClick={handleClickOnButtonMain}>
                        {product["Стоимость"]} ₽
                    </button>
            ) : (
                <>
                    <button className='buttonReduce' onClick={handleClickOnButtonReduce}>-</button>
                    <input className='quantity' type="text" readOnly value={product["Количество в корзине"]} />
                    <button className='buttonIncrease' onClick={handleClickOnButtonIncrease}>+</button>
                </>
            )}
        </div>
        
    );
}

export default Button;
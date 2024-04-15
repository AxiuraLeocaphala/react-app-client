import React, { useCallback, useRef, useState } from 'react';
import { HookTelegram } from '../hooks/hookTelegram';
import {QueryAdd} from '../query/queryAdd';
import {QueryIncrease} from '../query/queryIncrease';
import {QueryReduce} from '../query/queryReduce';
import './button.css';
const Button = ({ product}) => { 
    const [quantity] = useState(product['Количество'] || 0);
    const buttonSpaceRef = useRef(null); 

    const handleClickOnButtonReduce = useCallback(() => {
        QueryReduce(HookTelegram(), product, buttonSpaceRef.current);
    }, [product]);
    const handleClickOnButtonIncrease = useCallback(() => {
        QueryIncrease(HookTelegram(), product, buttonSpaceRef.current)
    }, [product]);
    const handleClickOnButtonMain = useCallback(() => {
        QueryAdd(HookTelegram(), product, buttonSpaceRef.current);
    }, [product]);
    
    return (
        <div ref={buttonSpaceRef} className='buttonSpace'>
            { quantity === 0  ? (
                <button className='buttonAddToBusket' onClick={handleClickOnButtonMain}>
                    {product["Стоимость"]} ₽
                </button>
            ) : (
                <>
                    <button className='buttonReduce' onClick={handleClickOnButtonReduce}>-</button>
                    <input className='quantity' type="text" readOnly value={product["Количество"]} />
                    <button className='buttonIncrease' onClick={handleClickOnButtonIncrease}>+</button>
                </>
            )}
        </div>
    );
}

export default Button;
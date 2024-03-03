/*
    Компонент Button рендерит кнопку/группу кнопок со счетчиком для карточки продукта.
    При нажатии на кнопку выполняется post-запрос серверу на добавление, увеличение 
    количество товара в корзине, уменьшение количества товара в корзине.
*/

import React, { useRef, useState } from 'react';
import QueryAdd from '../query/queryAdd';
import QueryIncrease from '../query/queryIncrease';
import QueryReduce from '../query/queryReduce';
import './button.css';

const tg = window.Telegram.WebApp;
let chatId;
if (typeof tg.initDataUnsafe.id === "undefined") {
    chatId = 111111111;
} else {
    chatId = tg.initDataUnsafe.id;
}

const Button = ({ product }) => {
    const [quantity, setQuantity] = useState(product["Количество в корзине"] || 0);
    const buttonSpaceRef = useRef(null);

    const handleClickOnButtonReduce = () => {
        let quantity = buttonSpaceRef.current.querySelector('.quantity');
        QueryReduce(chatId, product["Название"])
            .then(response => {
                if (typeof response.data.quantity !== "undefined") {
                    product["Количество в корзине"] = response.data.quantity;
                    quantity.value = response.data.quantity;
                } else {
                    product["Количество в корзине"] = 0;
                    buttonSpaceRef.current.innerHTML = response.data.contentButtonSpace;
                    const buttonAddToBusket = buttonSpaceRef.current.querySelector('.buttonAddToBusket');
                    buttonAddToBusket.addEventListener('click', function() {
                        handleClickOnButtonMain();
                    })
                }
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на уменьшение количества товара: ', error);
            })
    }

    const handleClickOnButtonIncrease = () => {
        let quantity = buttonSpaceRef.current.querySelector('.quantity');
        QueryIncrease(chatId, product["Название"])
            .then(response => {
                product["Количество в корзине"] = response.data.quantity
                quantity.value = response.data.quantity;
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на увеличение количества товара: ', error);
            })
    }

    const handleClickOnButtonMain = () => {
        QueryAdd(chatId, product["Название"], 1, product["Стоимость"])
            .then(response => {
                buttonSpaceRef.current.innerHTML = response.data.contentButtonSpace;
                product["Количество в корзине"] = 1;
                buttonSpaceRef.current.querySelector('.buttonReduce').addEventListener('click', function() {
                    handleClickOnButtonReduce();
                }) ;
                buttonSpaceRef.current.querySelector('.buttonIncrease').addEventListener('click', function() {
                    handleClickOnButtonIncrease();
                });
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на добавление товара: ', error);
            })
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
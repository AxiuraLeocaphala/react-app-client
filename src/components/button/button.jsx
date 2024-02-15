/*
    Компонент Button рендерит кнопку/группу кнопок со счетчиком для карточки продукта.
    При нажатии на кнопку выполняется post-запрос серверу на добавление, увеличение 
    количество товара в корзине, уменьшение количества товара в корзине.
*/

import React from 'react';
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
    const buttonSpace = document.querySelector('.cardProduct[id="' + product['ID товара'] + '"] .buttonSpace');
    
    const handleClickOnButtonReduce = () => {
        let quantity = buttonSpace.querySelector('.quantity');
        QueryReduce(chatId, product["Название"])
            .then(response => {
                if (typeof response.data.quantity !== "undefined") {
                    quantity.value = response.data.quantity;
                } else {
                    buttonSpace.innerHTML = response.data.contentButtonSpace;
                    const buttonAddToBasket = buttonSpace.querySelector('.buttonAddToBasket');
                    buttonAddToBasket.addEventListener('click', function() {
                        handleClickOnButtonMain();
                    })
                }
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на уменьшение количества товара: ', error);
            })
    }

    const handleClickOnButtonIncrease = () => {
        let quantity = buttonSpace.querySelector('.quantity');
        QueryIncrease(chatId, product["Название"])
            .then(response => {
                quantity.value = response.data.quantity;
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на увеличение количества товара: ', error);
            })
    }

    const handleClickOnButtonMain = () => {
        QueryAdd(chatId, product["Название"], 1, product["Стоимость"])
            .then(response => {
                buttonSpace.innerHTML = response.data.contentButtonSpace;

                const buttonReduce = buttonSpace.querySelector('.buttonReduce');
                const buttonIncrease = buttonSpace.querySelector('.buttonIncrease');

                buttonReduce.addEventListener('click', function() {
                    handleClickOnButtonReduce();
                }) 
                buttonIncrease.addEventListener('click', function() {
                    handleClickOnButtonIncrease();
                })
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса на добавление товара: ', error);
            })
    }

    return (
        <>
            {typeof product["Количество в корзине"] === "undefined" ? (
                <div className='buttonSpace'>
                    <button className='buttonAddToBasket' onClick={handleClickOnButtonMain}>
                        {product["Стоимость"]} ₽
                    </button>
                </div>
            ) : (

                <div className='buttonSpace'>
                    <button className='buttonReduce' onClick={handleClickOnButtonReduce}>-</button>
                    <input className='quantity' type="text" readOnly value={product["Количество в корзине"]} />
                    <button className='buttonIncrease' onClick={handleClickOnButtonIncrease}>+</button>
                </div>
            )}
        </>
        
    );
}

export default Button;
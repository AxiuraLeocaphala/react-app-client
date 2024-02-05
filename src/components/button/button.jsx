import React from "react";
import axios from 'axios';
import './button.css';

const tg = window.Telegram.WebApp;

const Button = ({price}) => {

    // Запрос серверу на добавление товара в корзину
    const handleClick = () => {
        axios.post('http://127.0.0.1:3001/data/addToBusket', {
            price: price,
            chatId : tg.initDataUnsafe.user.id
        })
        .then(responce => {
            // Обработка ответа от сервера
        }) 
        .catch(error => {
            // Обработка ошибки
        })
    }
    return (
        <div className="buttonSpace">
            <button className="buttonAddToBasket" onClick={handleClick}>
                {price}
            </button>
        </div>
    );
}

export default Button;
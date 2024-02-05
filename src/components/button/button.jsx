import React from "react";
import QueryInsert from "../query/queryInsert";
import './button.css';

const tg = window.Telegram.WebApp;

const Button = ({ product }) => {
    const handleClick = () => {
        if (typeof tg.initDataUnsafe.user !== 'undefined') {
            QueryInsert(tg.initDataUnsafe.user.id, product['Название'], 1, product['Стоимость'])
                .then(response => {
                    // Обработка ответа от сервера
                })
                .catch(error => {
                    // Обработка ошибки
                });
        } else {
            QueryInsert(651509930, product['Название'], 1, product['Стоимость'])
                .then(response => {
                    // Обработка ответа от сервера
                })
                .catch(error => {
                    // Обработка ошибки
                });
            
        }
    }

    return (
        <div className="buttonSpace">
            <button className="buttonAddToBasket" onClick={handleClick}>
                {product['Стоимость']}
            </button>
        </div>
    );
}

export default Button;
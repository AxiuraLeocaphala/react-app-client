import React from "react";
import QueryInsert from "./../query/queryInsert";
import QueryAdd from './../query/queryAdd';
import QueryReduce from './../query/queryReduce';
import './button.css';

const tg = window.Telegram.WebApp;

const Button = ({ product }) => {

    const handleClickOnButton = () => {
        const buttonSpace = document.querySelector('.cardProduct[id="' + product['ID товара'] + '"] .buttonSpace');
        if(typeof tg.initDataUnsafe.user !== 'undefined') {    
            QueryInsert(tg.initDataUnsafe.user.id, product['Название'], 1, product['Стоимость'])
                .then(response => {
                    buttonSpace.innerHTML = response.data.buttonSpace;
                    const buttonRemove = buttonSpace.querySelector('.buttonRemove');
                    const quantity = buttonSpace.querySelector('.quantity');
                    const buttonAdd = buttonSpace.querySelector('.buttonAdd');

                    buttonRemove.addEventListener('click', function() {
                        QueryReduce(tg.initDataUnsafe.user.id, product['Название'])
                            .then(response => {
                                if (typeof response.data.status === 'undefined') {
                                    quantity.value = response.data.quantity;
                                } else {
                                    buttonSpace.innerHTML = response.data.buttonSpace;
                                    const contentButtonSpace = buttonSpace.querySelector('.buttonAddToBasket');
                                    contentButtonSpace.addEventListener('click',function() {
                                        handleClickOnButton();
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    buttonAdd.addEventListener('click', function() {
                        QueryAdd(tg.initDataUnsafe.user.id, product['Название'])
                            .then(response => {
                                quantity.value = response.data.quantity;
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            QueryInsert(111111111, product['Название'], 1, product['Стоимость'])
                .then(response => {
                    buttonSpace.innerHTML = response.data.buttonSpace;
                    const buttonRemove = buttonSpace.querySelector('.buttonRemove');
                    const quantity = buttonSpace.querySelector('.quantity');
                    const buttonAdd = buttonSpace.querySelector('.buttonAdd');

                    buttonRemove.addEventListener('click', function() {
                        QueryReduce(111111111, product['Название'])
                            .then(response => {
                                if (typeof response.data.status === 'undefined') {
                                    quantity.value = response.data.quantity;
                                } else {
                                    buttonSpace.innerHTML = response.data.buttonSpace;
                                    const contentButtonSpace = buttonSpace.querySelector('.buttonAddToBasket');
                                    contentButtonSpace.addEventListener('click',function() {
                                        handleClickOnButton();
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    buttonAdd.addEventListener('click', function() {
                        QueryAdd(111111111, product['Название'])
                            .then(response => {
                                quantity.value = response.data.quantity;
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    
    return (
        <>
            {typeof product["Количество в корзине"] === 'undefined' ? (
                <div className="buttonSpace">
                    <button className="buttonAddToBasket" onClick={handleClickOnButton}>
                        {product['Стоимость']}
                    </button>
                </div>
            ) : (
                <>
                    <div className="buttonSpace">
                        <button className="buttonRemove" onClick={handleClickOnButton}>-</button>
                        <input className="quantity" readOnly value={product["Количество в корзине"]} />
                        <button className="buttonAdd" onClick={handleClickOnButton}>+</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Button;
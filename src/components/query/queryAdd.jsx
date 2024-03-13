import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import axios from 'axios';

export function  QueryAdd (chatId, product, buttonSpace) {
    axios.post('http://127.0.0.1:3001/data/addToBusket', {
        chatId: chatId,
        productName: product["Название"],
        productQuantity: 1,
        productPrice: product["Стоимость"] 
    })
    .then(response => {
        buttonSpace.innerHTML = response.data.contentButtonSpace;
        product["Количество в корзине"] = 1;
        buttonSpace.querySelector('.buttonReduce').addEventListener('click', () =>{
            QueryReduce(chatId, product, buttonSpace)
        })
        buttonSpace.querySelector('.buttonIncrease').addEventListener('click', () => {
            QueryIncrease(chatId, product, buttonSpace);
        })
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на добавление товара: ', error);
    })
}
import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import axios from 'axios';

export function  QueryAdd (hookTelegram, product, buttonSpace, locationCall, deleteCard) {
    axios.post('http://127.0.0.1:3001/data/addToBusket', {
        userId: hookTelegram.userId,
        productId: product["ProductId"],
        productQuantity: 1
    })
    .then(response => {
        buttonSpace.innerHTML = response.data.contentButtonSpace;
        product["Quantity"] = 1;
        if (hookTelegram.tg.MainButton.text.replace(/\D/g, '') !== ''){
            hookTelegram.tg.MainButton.text = 
                `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
        } else {
            hookTelegram.tg.MainButton.text = `Корзина ${product["ProductPrice"]}`;
        }
        buttonSpace.querySelector('.buttonReduce').addEventListener('click', () =>{
            QueryReduce(hookTelegram, product, buttonSpace, locationCall, deleteCard)
        })
        buttonSpace.querySelector('.buttonIncrease').addEventListener('click', () => {
            QueryIncrease(hookTelegram, product, buttonSpace, locationCall);
        })
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на добавление товара: ', error);
    })
}
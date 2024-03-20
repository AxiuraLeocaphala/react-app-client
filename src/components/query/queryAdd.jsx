import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import axios from 'axios';

export function  QueryAdd (hookTelegram, product, buttonSpace) {
    axios.post('http://127.0.0.1:3001/data/addToBusket', {
        chatId: hookTelegram.chatId,
        productId: product["ID товара"],
        productQuantity: 1
    })
    .then(response => {
        buttonSpace.innerHTML = response.data.contentButtonSpace;
        product["Количество в корзине"] = 1;
        if (hookTelegram.tg.MainButton.text.replace(/\D/g, '') !== ''){
            hookTelegram.tg.MainButton.text = 
                `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) + product["Стоимость"]}`;
        } else {
            hookTelegram.tg.MainButton.text = `Корзина ${product["Стоимость"]}`;
        }
        buttonSpace.querySelector('.buttonReduce').addEventListener('click', () =>{
            QueryReduce(hookTelegram, product, buttonSpace)
        })
        buttonSpace.querySelector('.buttonIncrease').addEventListener('click', () => {
            QueryIncrease(hookTelegram, product, buttonSpace);
        })
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на добавление товара: ', error);
    })
}
import {QueryAdd} from './queryAdd.jsx';
import axios from 'axios';

export function  QueryReduce (hookTelegram, product, buttonSpace) {
    axios.post('http://127.0.0.1:3001/data/reduceNumber', {
        chatId: hookTelegram.chatId,
        productName: product["Название"]
    })
    .then(response => {
        if (typeof response.data.quantity !== "undefined"){
            product["Количество в корзине"] = response.data.quantity;
            hookTelegram.tg.MainButton.text = 
            `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) - product["Стоимость"]}`;
            buttonSpace.querySelector('.quantity').value = response.data.quantity;
        } else {
            product["Количество в корзине"] = 0;
            if (hookTelegram.tg.MainButton.text.replace(/\D/g, '') !== '' && 
            hookTelegram.tg.MainButton.text.replace(/\D/g, '') !== `${product["Стоимость"]}`){
                hookTelegram.tg.MainButton.text = 
                `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) - product["Стоимость"]}`;
            } else {
                hookTelegram.tg.MainButton.text = 'Корзина';
            }
            buttonSpace.innerHTML = response.data.contentButtonSpace;
            buttonSpace.querySelector('.buttonAddToBusket').addEventListener('click', () => {
                QueryAdd(hookTelegram, product, buttonSpace);
            })
        }
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на уменьшение количества товара: ', error);
    })
}
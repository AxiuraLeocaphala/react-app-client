import {QueryAdd} from './queryAdd.jsx';
import axios from 'axios';

export function  QueryReduce (hookTelegram, product, buttonSpace) {
    axios.post('http://127.0.0.1:3001/data/reduceNumber', {
        chatId: hookTelegram.chatId,
        productId: product["ID товара"]
    })
    .then(response => {
        const price = hookTelegram.tg.MainButton.text.replace(/\D/g, '');
        if (typeof response.data.quantity !== "undefined"){
            product["Количество"] = response.data.quantity;
            if (price) {
                hookTelegram.tg.MainButton.text = `Корзина ${parseInt(price) - product["Стоимость"]}`;
            }
            buttonSpace.querySelector('.quantity').value = response.data.quantity;
        } else {
            product["Количество"] = 0;
            if (price !== '' && price !== `${product["Стоимость"]}`){
                hookTelegram.tg.MainButton.text = `Корзина ${parseInt(price) - product["Стоимость"]}`;
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
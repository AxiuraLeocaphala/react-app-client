import {QueryAdd} from './queryAdd.jsx';
import axios from 'axios';

export function  QueryReduce (chatId, product, buttonSpace) {
    axios.post('http://127.0.0.1:3001/data/reduceNumber', {
        chatId: chatId,
        productName: product["Название"]
    })
    .then(response => {
        if (typeof response.data.quantity !== "undefined"){
            product["Количество в корзине"] = response.data.quantity;
            buttonSpace.querySelector('.quantity').value = response.data.quantity;
        } else {
            product["Количество в корзине"] = 0;
            buttonSpace.innerHTML = response.data.contentButtonSpace;
            buttonSpace.querySelector('.buttonAddToBusket').addEventListener('click', () => {
                QueryAdd(chatId, product, buttonSpace);
            })
        }
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на уменьшение количества товара: ', error);
    })
}
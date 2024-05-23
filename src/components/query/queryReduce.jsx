import {QueryAdd} from './queryAdd.jsx';
import axios from 'axios';

export function  QueryReduce (hookTelegram, product, buttonSpace, locationCall, deleteCard, updateTotalPrice) {
    axios.post('http://127.0.0.1:3001/data/reduceNumber', {
        userId: hookTelegram.userId,
        productId: product["ProductId"]
    })
    .then(response => {
        const price = hookTelegram.tg.MainButton.text.replace(/\D/g, '');
        if (typeof response.data.quantity !== "undefined"){
            product["Quantity"] = response.data.quantity;
            if (locationCall === 'menu'){       
                if (price) {
                    hookTelegram.tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                }
            } else if (locationCall === 'busket') {
                updateTotalPrice();
            } else {
                console.log("Error: undefined call location")
            }
            buttonSpace.querySelector('.quantity').value = response.data.quantity;
        } else {
            if (locationCall === 'menu') {
                product["Quantity"] = 0;
                if (price !== '' && price !== `${product["ProductPrice"]}`){
                    hookTelegram.tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                } else {
                    hookTelegram.tg.MainButton.text = 'Корзина';
                }
                buttonSpace.innerHTML = response.data.contentButtonSpace;
                buttonSpace.querySelector('.buttonAddToBusket').addEventListener('click', () => {
                    QueryAdd(hookTelegram, product, buttonSpace, locationCall);
                })
            } else if (locationCall === 'busket') {
                deleteCard();
                product["Quantity"] = 0;
                updateTotalPrice();
            } else {
                console.log("Error: undefined call location")
            }
        }
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на уменьшение количества товара: ', error);
    })
}
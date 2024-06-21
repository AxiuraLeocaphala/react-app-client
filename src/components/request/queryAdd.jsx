import { useTelegram } from '../hooks/useTelegram';
import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import axios from 'axios';
import QualifierErrors from './_qualifierErrors';

export function  QueryAdd (product, buttonSpace, locationCall, deleteCard) { 
    const { UserId, MainButton } = useTelegram.getTelegramData();
    axios.post('/product-api/data/addToBusket', {
        userId: UserId,
        productId: product["ProductId"]
    })
    .then(response => {
        buttonSpace.innerHTML = response.data.contentButtonSpace;
        product["Quantity"] = 1;
        if (MainButton.text.replace(/\D/g, '') !== ''){
            MainButton.text = 
                `Корзина ${parseInt(MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
        } else {
            MainButton.text = `Корзина ${product["ProductPrice"]}`;
        }
        buttonSpace.querySelector('.buttonReduce').addEventListener('click', () =>{
            QueryReduce(product, buttonSpace, locationCall, deleteCard)
        })
        buttonSpace.querySelector('.buttonIncrease').addEventListener('click', () => {
            QueryIncrease(product, buttonSpace, locationCall);
        })
    })
    .catch(error => QualifierErrors(error));
}
import { useTelegram } from '../hooks/useTelegram';
import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import instance from './setupAxios.jsx';
import QualifierErrors from './_qualifierErrors';

export function  QueryAdd (product, buttonSpace, locationCall, deleteCard) { 
    const { MainButton } = useTelegram.getTelegramData();
    instance.post('/data/addToBusket', {
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
import { tg } from '../hooks/useTelegram';
import {QueryReduce} from './queryReduce';
import {QueryIncrease} from './queryIncrease';
import instance from './setupAxios.jsx';
import QualifierErrors from './_qualifierErrors';

export function  QueryAdd (product, buttonSpace, locationCall, deleteCard) { 
    instance.post('/data/addToBusket', {
        productId: product["ProductId"]
    })
    .then(response => {
        buttonSpace.innerHTML = response.data.contentButtonSpace;
        product["Quantity"] = 1;
        if (tg.MainButton.text.replace(/\D/g, '') !== ''){
            tg.MainButton.text = 
                `Корзина ${parseInt(tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
        } else {
            tg.MainButton.text = `Корзина ${product["ProductPrice"]}`;
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
import { tg } from '../hooks/useTelegram';
import {RequestReduce} from './requestReduce';
import {RequestIncrease} from './requestIncrease';
import instance from './setupAxios.jsx';
import QualifierErrors from './_qualifierErrors';

export function  RequestAdd (product, buttonSpace, locationCall, deleteCard) { 
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
        buttonSpace.RequestSelector('.buttonReduce').addEventListener('click', () =>{
            RequestReduce(product, buttonSpace, locationCall, deleteCard)
        })
        buttonSpace.RequestSelector('.buttonIncrease').addEventListener('click', () => {
            RequestIncrease(product, buttonSpace, locationCall);
        })
    })
    .catch(error => QualifierErrors(error));
}
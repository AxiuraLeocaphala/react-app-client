import { tg } from '../hooks/useTelegram.js';
import {RequestAdd} from './requestAdd.jsx';
import instance from './setupAxios.jsx';
import QualifierErrors from './_qualifierErrors';

export function  RequestReduce (product, buttonSpace, locationCall, deleteCard, updateTotalPrice) {
    instance.post('/data/reduceNumber', {
        productId: product["ProductId"]
    })
    .then(response => {
        const price = tg.MainButton.text.replace(/\D/g, '');
        if (typeof response.data.quantity !== "undefined"){
            product["Quantity"] = response.data.quantity;
            if (locationCall === 'menu'){       
                if (price) {
                    tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                }
            } else if (locationCall === 'busket') {
                updateTotalPrice();
            } else {
                console.log("Error: undefined call location")
            }
            buttonSpace.RequestSelector('.quantity').value = response.data.quantity;
        } else {
            if (locationCall === 'menu') {
                product["Quantity"] = 0;
                if (price !== '' && price !== `${product["ProductPrice"]}`){
                    tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                } else {
                    tg.MainButton.text = 'Корзина';
                }
                buttonSpace.innerHTML = response.data.contentButtonSpace;
                buttonSpace.RequestSelector('.buttonAddToBusket').addEventListener('click', () => {
                    RequestAdd(product, buttonSpace, locationCall);
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
    .catch(error => QualifierErrors(error));
}
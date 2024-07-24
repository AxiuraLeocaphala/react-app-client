import { useTelegram } from '../hooks/useTelegram.jsx';
import {QueryAdd} from './queryAdd.jsx';
import instance from './axiosCreator.jsx';
import QualifierErrors from './_qualifierErrors';

export function  QueryReduce (product, buttonSpace, locationCall, deleteCard, updateTotalPrice) {
    const { MainButton } = useTelegram.getTelegramData();
    instance.post('http://127.0.0.1:3001/data/reduceNumber', {
        productId: product["ProductId"]
    })
    .then(response => {
        const price = MainButton.text.replace(/\D/g, '');
        if (typeof response.data.quantity !== "undefined"){
            product["Quantity"] = response.data.quantity;
            if (locationCall === 'menu'){       
                if (price) {
                    MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
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
                    MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                } else {
                    MainButton.text = 'Корзина';
                }
                buttonSpace.innerHTML = response.data.contentButtonSpace;
                buttonSpace.querySelector('.buttonAddToBusket').addEventListener('click', () => {
                    QueryAdd(product, buttonSpace, locationCall);
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
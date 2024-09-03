import { tg } from '../hooks/useTelegram.js';
import instance from './setupAxios.jsx';
import QualifierErrors from './_qualifierErrors';

export function QueryIncrease (product, buttonSpace, locationCall, updateTotalPrice) {
    return instance.post('/data/increaseQuantity', {
        productId: product["ProductId"]
    })
    .then(response => {
        product["Quantity"] = response.data.quantity;
        if (locationCall === 'menu') {
            if (tg.MainButton.text.replace(/\D/g, '')) {
                tg.MainButton.text = `Корзина ${parseInt(tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
            }
        } else if (locationCall === 'busket'){
            updateTotalPrice();
        }else {
            console.log("Error: undefined call location")
        }
        buttonSpace.querySelector('.quantity').value = response.data.quantity;
    })
    .catch(error => QualifierErrors(error));
}
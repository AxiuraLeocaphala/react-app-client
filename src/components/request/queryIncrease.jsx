import { useTelegram } from '../hooks/useTelegram';
import axios from 'axios';
import QualifierErrors from './_qualifierErrors';

export function QueryIncrease (product, buttonSpace, locationCall, updateTotalPrice) {
    const { UserId, MainButton } = useTelegram.getTelegramData();
    return axios.post('http://127.0.0.1:3001/data/increaseQuantity', {
        userId: UserId,
        productId: product["ProductId"]
    })
    .then(response => {
        product["Quantity"] = response.data.quantity;
        if (locationCall === 'menu') {
            if (MainButton.text.replace(/\D/g, '')) {
                MainButton.text = `Корзина ${parseInt(MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
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
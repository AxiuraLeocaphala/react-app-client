import { useTelegram } from '../hooks/useTelegram';
import instance from './axiosCreator';
import QualifierErrors from './_qualifierErrors';

export function QueryIncrease (product, buttonSpace, locationCall, updateTotalPrice) {
    const { MainButton } = useTelegram.getTelegramData();
    return instance.post('data/increaseQuantity', {
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
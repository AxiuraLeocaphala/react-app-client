import { useTelegram } from '../hooks/useTelegram';
import axios from 'axios';

export function QueryIncrease (product, buttonSpace, locationCall, updateTotalPrice) {
    const { MainButton, UserId } = useTelegram();
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
    .catch(error => {
        console.log('Ошибка при отправке запроса на увеличение количества товара: ', error);
    })
}
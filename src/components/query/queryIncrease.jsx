import axios from 'axios';

export function QueryIncrease (hookTelegram, product, buttonSpace, locationCall, updateTotalPrice) {
    return axios.post('http://127.0.0.1:3001/data/increaseQuantity', {
        userId: hookTelegram.userId,
        productId: product["ProductId"]
    })
    .then(response => {
        product["Quantity"] = response.data.quantity;
        if (locationCall === 'menu') {
            if (hookTelegram.tg.MainButton.text.replace(/\D/g, '')) {
                hookTelegram.tg.MainButton.text = `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
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
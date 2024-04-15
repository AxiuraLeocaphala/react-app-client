import axios from 'axios';

export function QueryIncrease (hookTelegram, product, buttonSpace) {
    return axios.post('http://127.0.0.1:3001/data/increaseQuantity', {
        chatId: hookTelegram.chatId,
        productId: product["ID товара"]
    })
    .then(response => {
        product["Количество"] = response.data.quantity;
        if (hookTelegram.tg.MainButton.text.replace(/\D/g, '')) {
            hookTelegram.tg.MainButton.text = `Корзина ${parseInt(hookTelegram.tg.MainButton.text.replace(/\D/g, '')) + product["Стоимость"]}`;
        }
        buttonSpace.querySelector('.quantity').value = response.data.quantity;
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на увеличение количества товара: ', error);
    })
}
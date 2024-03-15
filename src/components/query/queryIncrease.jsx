import { HookTelegram } from '../hookTelegram/hookTelegram';
import axios from 'axios';

export function QueryIncrease (chatId, product, buttonSpace) {
    return axios.post('http://127.0.0.1:3001/data/increaseQuantity', {
        chatId: chatId,
        productName: product["Название"]
    })
    .then(response => {
        product["Количество в корзине"] = response.data.quantity;
        console.log(HookTelegram().tg.MainButton.text.replace(/\D/g, ''));
        HookTelegram().tg.MainButton.text = `Корзина ${parseInt(HookTelegram().tg.MainButton.text.replace(/\D/g, '')) + product["Стоимость"]}`;
        buttonSpace.querySelector('.quantity').value = response.data.quantity;
    })
    .catch(error => {
        console.log('Ошибка при отправке запроса на увеличение количества товара: ', error);
    })
}
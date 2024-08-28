import { countTotalPrice } from "./countTotalPrice.jsx";

const tg = window.Telegram.WebApp;
const MainButton = tg.MainButton;
const BackButton = tg.BackButton;

export const useTelegram = {

    getTelegramData() {
        return {
            tg,
            MainButton
        };
    },

    telegramMenuButton(data) {
        MainButton.show();
        const totalPrice = countTotalPrice(data);
        MainButton.text = `Корзина ${totalPrice === 0 ? ("") : (`${totalPrice} ₽`)}`;
    },

    telegramBusketButtons() {
        MainButton.show();
        MainButton.text = "Заказать";
        BackButton.show();
    },
}
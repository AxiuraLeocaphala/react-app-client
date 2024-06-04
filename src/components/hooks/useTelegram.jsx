import { countTotalPrice } from "./countTotalPrice.jsx";

const tg = window.Telegram.WebApp;
const UserId = tg.initDataUnsafe?.user?.id || 111111111;
const MainButton = tg.MainButton;

export const useTelegram = {
    getTelegramData() {
        return {
            tg, 
            UserId, 
            MainButton,
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
    },
}
import { countTotalPrice } from "./countTotalPrice.js";
import { useNavigate } from 'react-router-dom'

export const tg = window.Telegram.WebApp;

export function useTelegramOnMenu(data) {
    tg.MainButton.show();
    const totalPrice = countTotalPrice(data);
    tg.MainButton.text = `Корзина ${totalPrice === 0 ? ("") : (`${totalPrice} ₽`)}`;

    const navigate = useNavigate();
    tg.MainButton.onClick(() => {navigate("/busket")});
}

export function useTelegramOnBusket() {
    tg.MainButton.show();
    tg.MainButton.text = "Заказать";
    
    tg.BackButton.show();
    const navigate = useNavigate();
    tg.BackButton.onClick(() => {navigate("/")});
}
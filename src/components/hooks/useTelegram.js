import { countTotalPrice } from "./countTotalPrice.js";
import { useNavigate } from 'react-router-dom'
import { MakeOrder } from "../request/makeOrder.js";

export const tg = window.Telegram.WebApp;
tg.expand()

export function useTelegramOnMenu(data) {
    tg.MainButton.show();
    const totalPrice = countTotalPrice(data);
    tg.MainButton.text = `Корзина ${totalPrice === 0 ? ("") : (`${totalPrice} ₽`)}`;

    const navigate = useNavigate();
    tg.MainButton.onClick(() => navigate("/busket"));
}

export function useTelegramOnBusket() {
    tg.MainButton.show();
    tg.MainButton.text = "Продолжить";
    const navigate = useNavigate();
    tg.MainButton.onClick(() => navigate("/order"))

    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        navigate("/");
        tg.BackButton.hide();
    });
}

export function useTelegramOnOrder(paymentDispute, totalPrice) {
    const navigate = useNavigate();
    if (totalPrice > 0) {
        tg.MainButton.show();
        tg.MainButton.text = "Заказать";
        tg.MainButton.onClick(() => {
            MakeOrder(paymentDispute);
        })
    
        tg.BackButton.onClick(() => navigate('/busket'))
    }
}
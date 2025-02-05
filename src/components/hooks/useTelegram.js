import { countTotalPrice } from "./countTotalPrice.js";
import { useNavigate } from 'react-router-dom'
import { MakeOrder } from "../request/makeOrder.js";

export const tg = window.Telegram.WebApp;
tg.expand()

export function useTelegramOnMenu(data) {
    const navigate = useNavigate();
    tg.MainButton.show();
    const totalPrice = countTotalPrice(data);
    tg.MainButton.text = `Корзина ${totalPrice === 0 ? ("") : (`${totalPrice} ₽`)}`;
    tg.MainButton.onClick(() => navigate("/busket"));

    tg.BackButton.hide();
}

export function useTelegramOnBusket(productListBusket) {
    const navigate = useNavigate();
    console.log("use", productListBusket);
    if (productListBusket !== undefined) {
        tg.MainButton.show();
        tg.MainButton.text = "Продолжить";
        tg.MainButton.onClick(() => navigate("/order"))
    }

    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        navigate("/");
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
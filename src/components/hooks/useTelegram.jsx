import { redirect } from "react-router-dom";
import CountTotalPrice from "./countTotalPrice.jsx";

const tg = window.Telegram.WebApp;
const UserId = tg.initDataUnsafe?.user?.id || 111111111;
const MainButton = tg.MainButton;


export function useTelegram() {
    const TelegramMenuButton = (data) => {
        MainButton.show();
        const totalPrice = CountTotalPrice(data);
        MainButton.text = `Корзина ${totalPrice === 0 ? ("") : (`${totalPrice} ₽`)}`;
        MainButton.onClick(redirect("/busket"));
    } 
    const TelegramBusketButtons = () => {
        MainButton.show();
        MainButton.text = "Заказать";
        MainButton.onClick(redirect("/"));
    }

    return {
        tg,
        UserId,
        MainButton,
        TelegramMenuButton,
        TelegramBusketButtons,
    }
}
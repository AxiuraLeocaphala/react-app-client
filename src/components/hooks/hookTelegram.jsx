import CountTotalPrice from "./countTotalPrice";

const tg = window.Telegram.WebApp;

let chatId;
if (typeof tg.initDataUnsafe.id != "undefined") {
    chatId = tg.initDataUnsafe.id;
} else {
    chatId = 111111111;
}

export function HookTelegram () {
    return {
        tg,
        chatId
    }
}

export function ButtonsTelegramMenu (data) {
    tg.MainButton.show();
    tg.MainButton.text = `Корзина ${CountTotalPrice(data) === 0 ? ('') : (`${totalPrice} ₽`)}`;
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/busket');
    })
}

export function ButtonsTelegramBusket () {
    tg.MainButton.show();
    tg.MainButton.text = 'Заказать';
    tg.BackButton.show();
}
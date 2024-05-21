import CountTotalPrice from "./countTotalPrice";

const tg = window.Telegram.WebApp;

console.log(tg.WebAppUser.id);

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
    let totalPrice = CountTotalPrice(data);
    tg.MainButton.text = `Корзина ${totalPrice === 0 ? ('') : (`${totalPrice} ₽`)}`;
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/busket');
    })
}

export function ButtonsTelegramBusket () {
    tg.MainButton.show();
    tg.MainButton.text = 'Заказать';
    tg.BackButton.web_app_setup_back_button;
}
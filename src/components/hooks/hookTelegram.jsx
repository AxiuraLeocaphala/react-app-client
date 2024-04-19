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
    let totalPrice = CountTotalPrice(data);
    tg.MainButton.text = `Корзина ${totalPrice === 0 ? ('') : (`${totalPrice} ₽`)}`;
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/busket');
        tg.MainButton.hide();
    })
}

export function ButtonsTelegramBusket () {
    tg.MainButton.show();
    tg.MainButton.text = 'Заказать';
    /*
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/куда-то');
        tg.MainButton.hide();
    })*/
    const backButton = window.Telegram.WebApp.BackButton;
    backButton.show();
    backButton.onClick(() => {
        window.location.assign('http://localhost:3000');
        tg.BackButton.hide();
    })
}
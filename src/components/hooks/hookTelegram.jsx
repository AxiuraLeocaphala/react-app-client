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

export function ButtonTelegramMenu (data) {
    let totalPrice = 0;
    data.forEach((elem) => {
        if (elem["Количество"] !== undefined) {
            totalPrice += elem["Стоимость"]
        }
    })
    tg.MainButton.text = `Корзина ${totalPrice}`;
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/busket');
        tg.MainButton.hide();
    })
}

export function ButtonsTelegramBusket () {
    tg.MainButton.text = 'Заказать';
    /*
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/куда-то');
        tg.MainButton.hide();
    })*/
    tg.BackButton.onClick(() => {
        window.location.assign('http://localhost:3000');
        tg.BackButton.hide();
    })
}
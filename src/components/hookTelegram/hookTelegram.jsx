const tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.show();
tg.MainButton.text = 'Корзина';

let chatId;
if (typeof tg.initDataUnsafe.id != "undefined") {
    chatId = tg.initDataUnsafe.id;
} else {
    chatId = 11111111;
}

export function HookTelegram () {
    return {
        tg,
        chatId
    }
}
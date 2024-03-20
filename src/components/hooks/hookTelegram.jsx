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

export function buttonsTelegramMenu () {
    tg.MainButton.text = 'Корзина';
    tg.MainButton.onClick(() => {
        window.location.assign('http://localhost:3000/busket')
    })
}
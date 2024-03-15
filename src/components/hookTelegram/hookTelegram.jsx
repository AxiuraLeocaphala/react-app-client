import { useEffect } from "react";

const tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.show();

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
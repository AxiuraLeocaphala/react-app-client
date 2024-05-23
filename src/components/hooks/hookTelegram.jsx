import CountTotalPrice from "./countTotalPrice";

const tg = window.Telegram.WebApp;
let userId;

try {
    userId = tg.initDataUnsafe.user.id;
} catch{
    userId = 111111111;
}

export function HookTelegram () {
    return {
        tg,
        userId,
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
}
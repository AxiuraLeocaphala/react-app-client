import instance from "./setupAxios";
import { tg } from "../hooks/useTelegram";
import QualifierErrors from './_qualifierErrors';

export function RequestReduce(product, setComponentQuantity, locationCall, deleteCard, updateTotalPrice, setButtonAddVisible) {
    instance.post('/data/reduceNumber', {
        productId: product["ProductId"]
    })
    .then(response => {
        product["Quantity"] -= 1;
        const price = tg.MainButton.text.replace(/\D/g, '');
        if (typeof response.data.quantity !== "undefined") {
            if (locationCall === "menu") {
                if (price) {
                    tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                }
            } else if (locationCall === "busket") {
                updateTotalPrice();
            }
        } else {
            if (locationCall === "menu") {
                if (price !== '' && price !== `${product["ProductPrice"]}`){
                    tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                } else {
                    tg.MainButton.text = 'Корзина';
                }
                setButtonAddVisible(true);
            } else if (locationCall === "busket") {
                deleteCard();
                updateTotalPrice();
            }
        }
    })
    .catch(error => QualifierErrors(error))
}
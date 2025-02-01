import instance from "./setupAxios";
import { tg } from "../hooks/useTelegram";
import QualifierErrors from './_qualifierErrors';

export function RequestReduce(product, setQuantity, locationCall, deleteCard, updateTotalPrice, setButtonAddVisible) {
    instance.post('/data/reduceNumber', {
        productId: product["ProductId"]
    })
    .then(response => {
        setQuantity(prevState => prevState - 1);
        const price = tg.MainButton.text.replace(/\D/g, '');
        
        if (typeof response.data.quantity !== "undefined") {
            if (locationCall === "menu") {
                if (price) {
                    tg.MainButton.text = `Корзина ${parseInt(price) - product["ProductPrice"]} ₽`;
                }
            } else if (locationCall === "busket") {
                product["Quantity"] -= 1;
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
                product["Quantity"] = 0;
                deleteCard();
                updateTotalPrice();
            }
        }
    })
    .catch(error => QualifierErrors(error))
}
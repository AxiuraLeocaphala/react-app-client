import instance from "./setupAxios";
import { tg } from "../hooks/useTelegram";
import QualifierErrors from "./_qualifierErrors";

export function RequestIncrease(product, setComponentQuantity, locationCall, updateTotalPrice, setComponentVisibility) {
    instance.post('/data/increaseQuantity', {
        productId: product["ProductId"]
    })
    .then(response => {
        product["Quantity"] += 1;
        if (locationCall === "menu") {
            if (tg.MainButton.text.replace(/\D/g, '')) {
                tg.MainButton.text = `Корзина ${parseInt(tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
            }
        } else if (locationCall === "busket") {
            updateTotalPrice();
        }
    })
    .catch(error => {
        if (error.response.status === 422) {
            setComponentQuantity(error.response.data.quantity);
            setComponentVisibility();
        } else {
            QualifierErrors(error);
        }
    })
}
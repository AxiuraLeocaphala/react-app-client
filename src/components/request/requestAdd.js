import instance from './setupAxios';
import {tg} from '../hooks/useTelegram'
import QualifierErrors from './_qualifierErrors';

export function RequestAdd(product, setQuantity, setButtonAddVisible) {
    instance.post('/data/addToBusket', {
        productId: product["ProductId"]
    })
    .then(response => {
        setQuantity(1);
        if (tg.MainButton.text.replace(/\D/g, '') !== '') {
            tg.MainButton.text =
            `Корзина ${parseInt(tg.MainButton.text.replace(/\D/g, '')) + product["ProductPrice"]} ₽`;
        } else {
            tg.MainButton.text = `Корзина ${product["ProductPrice"]}`;
        }
        setButtonAddVisible(false);
    })
    .catch(error => QualifierErrors(error));
}
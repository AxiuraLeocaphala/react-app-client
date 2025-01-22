import instance from './setupAxios'
import {tg} from "./../hooks/useTelegram"
import QualifierErrors from './_qualifierErrors';

export async function MakeOrder(paymentMethod) {
    instance.post("/data/makeOrder", {
        paymentMethod: paymentMethod
    })
    .then(response => {
        tg.close();
    })
    .catch(error => {
        QualifierErrors(error)
    })
}
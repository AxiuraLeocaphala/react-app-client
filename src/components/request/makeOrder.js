import instance from './setupAxios'
import {tg} from "./../hooks/useTelegram"
import QualifierErrors from './_qualifierErrors';

export async function MakeOrder(paymentDispute) {
    instance.post("/data/makeOrder", {
        paymentDispute: paymentDispute
    })
    .then(response => {
        tg.close();
    })
    .catch(error => {
        QualifierErrors(error)
    })
}
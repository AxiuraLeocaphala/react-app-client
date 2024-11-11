import instance from './setupAxios'
import {tg} from "./../hooks/useTelegram"
import QualifierErrors from './_qualifierErrors';

export async function MakeOrder(paymentDispute) {
    instance.post("/data/makeOrder", {
        paymentDispute: paymentDispute
    })
    .then(response => {
        console.log(tg);
        tg.sendData(JSON.stringify({
            "orderId": response.data.orderId, 
            "codeReceive": response.data.codeReceive
        }))
    })
    .catch(error => QualifierErrors(error))
}
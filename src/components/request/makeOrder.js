import instance from './setupAxios.jsx'
import {tg} from "./../hooks/useTelegram.js"
import QualifierErrors from './_qualifierErrors.js';

export async function MakeOrder(paymentDispute) {
    instance.post("/data/makeOrder", {
        paymentDispute: paymentDispute
    })
    .then(response => {
        console.log(tg);
        tg.answerWebAppQuery(response.data.qi, {"orderId": response.data.orderId, "codeReceive": response.data.codeReceive})
        tg.close()
    })
    .catch(error => QualifierErrors(error))
}
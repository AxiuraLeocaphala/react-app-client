import instance from './setupAxios.jsx'
import QualifierErrors from './_qualifierErrors.js';

export async function MakeOrder(paymentDispute) {
    instance.post("/data/makeOrder", {
        paymentDispute: paymentDispute
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => QualifierErrors(error))
}
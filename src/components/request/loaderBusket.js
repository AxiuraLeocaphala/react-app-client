import QualifierErrors from "./_qualifierErrors";
import instance from "./setupAxios";

export async function LoaderBusket() {
    return instance.get(`/data/productInBusket`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
}
import QualifierErrors from "./_qualifierErrors";
import instance from "./setupAxios.jsx";

export async function LoaderMenu() {
    return instance.get(`/data/priceList`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
}
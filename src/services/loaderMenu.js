import QualifierErrors from "./../layout/_qualifierErrors";
import mAxios from "./../features/setupAxios";

export async function LoaderMenu() {
    return mAxios.get(`/data/priceList`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
}
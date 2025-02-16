import QualifierErrors from "./../layout/_qualifierErrors";
import mAxios from "./../features/setupAxios";

export async function LoaderOrder() {
    return mAxios.get("/data/order")
    .then(response => response)
    .catch(error => QualifierErrors(error))
} 
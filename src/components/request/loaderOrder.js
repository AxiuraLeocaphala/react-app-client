import QualifierErrors from "./_qualifierErrors";
import instance from "./setupAxios";

export async function LoaderOrder() {
    return instance.get("/data/order")
    .then(response => {
        return response;
    })
    .catch(error => QualifierErrors(error))
} 
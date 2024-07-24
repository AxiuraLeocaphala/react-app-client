import QualifierErrors from "./_qualifierErrors";
import instance from "./axiosCreator";

async function LoaderBusket() {
    return instance.get(`data/productInBusket`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
}

export default LoaderBusket;
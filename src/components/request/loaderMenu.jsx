import QualifierErrors from "./_qualifierErrors";
import instance from "./axiosCreator";

async function LoaderMenu() {
    return instance.get(`/data/price-list`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
} 

export default LoaderMenu;
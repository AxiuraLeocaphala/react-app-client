import axios from "axios";
import { useTelegram } from "../hooks/useTelegram";
import QualifierErrors from "./_qualifierErrors";

async function LoaderBusket() {
    const { UserId } = useTelegram.getTelegramData();
    return axios.get(`http://127.0.0.1:3001/data/price-list?userId=${UserId}`)
    .then(response => response)
    .catch(error => QualifierErrors(error));
} 

export default LoaderBusket;
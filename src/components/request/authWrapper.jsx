import axios from "axios";
import { useTelegram } from "../hooks/useTelegram";
import QualifierErrors from './_qualifierErrors.jsx';

async function AuthWrapper() {
    const { tg } = useTelegram.getTelegramData();
    const initData = tg.initData;
    return axios.post('http://127.0.0.1:3002/auth/check_init_data', {
        initData: initData
    })
    .then(response => {
        console.log(response.data.token)
        return response
    })
    .catch(error => QualifierErrors(error))
}

export default AuthWrapper;
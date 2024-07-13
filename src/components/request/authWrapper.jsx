import axios from "axios";
import { useTelegram } from "../hooks/useTelegram";
import QualifierErrors from './_qualifierErrors.jsx';

async function AuthWrapper() {
    const { tg } = useTelegram.getTelegramData();
    const initData = tg.initData;
    return axios.post('/user-api/auth/check_init_data', {
        initData: initData
    })
    .then(response => response)
    .catch(error => QualifierErrors(error))
}

export default AuthWrapper;
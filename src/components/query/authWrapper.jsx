import { useEffect } from "react";
import { useTelegram } from "./../hooks/useTelegram";
import axios from "axios";

const AuthWrapper = () => {
    const { tg } = useTelegram.getTelegramData();

    useEffect(() => {
        const initData = tg.initData;
        axios.post('http://127.0.0.1:3002/auth/check_init_data', {
            initData: initData, 
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    })
}

export default AuthWrapper;
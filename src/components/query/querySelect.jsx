import {useEffect} from 'react';
import axios from 'axios';
import {HookTelegram} from '../hookTelegram/hookTelegram.jsx';

export function QuerySelect (handleData) {
    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/price-list?chatId=${HookTelegram().chatId}`)
        .then(response => {
            handleData.onDataReceived(response.data);
        })
        .catch(error => {
            console.error('Ошибка при получении данных о категориях и товаров: ', error);
        })
    }, [handleData])
}
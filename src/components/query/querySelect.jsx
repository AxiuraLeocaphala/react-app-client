/*
    QuerySelect выполняет get-запрос серверу для получения категорий товаров и 
    информации о товарах: название, описание, стоимость. Получив ответы, QuerySelect
    передает их в компонент Main через пропсы. 
*/

import { useState, useEffect } from 'react';
import axios from 'axios';
import TruncateText from '../trancateText/trancateText.jsx';
import Main from './../main/main.jsx';

function QuerySelect () {
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const [response_1, response_2] = await Promise.all([
                    axios.get(`http://127.0.0.1:3001/data/food-categories`),
                    axios.get(`http://127.0.0.1:3001/data/price-list?chatId=${111111111}`)
                ]);

                setData_1(response_1.data);
                setData_2(response_2.data);
                setLoaded(true);

            } catch (error) {
                console.error('Ошибка при получении данных о категориях и товаров: ', error);
            }
        };

        fetchDataFromServer();
    }, []);


    return (
    <>
        {loaded && 
            <TruncateText data_2={data_2} />
        } {
            data_1.length > 0 && data_2.length > 0 && (
                <Main data_1={data_1} data_2={data_2}/>
            )
        }
    </>
    );
}

export default QuerySelect;
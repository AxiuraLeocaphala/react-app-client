import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/header.jsx';
import ProductList from './../productList/productList.jsx';
import Preloader from '../preloader/preloader.jsx';

function Query({ onRender }) {
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response_1 = await axios.get('http://127.0.0.1:3001/data/food-categories');
                setData_1(response_1.data);

                const response_2 = await axios.get('http://127.0.0.1:3001/data/price-list');
                setData_2(response_2.data);

                setLoading(false);
                
				if (typeof onRender === 'function') {
					onRender(); // Вызываем функцию обратного вызова, чтобы уведомить родительский компонент
				}
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        
        fetchDataFromServer();
  
    }, [onRender]);

    return ( 
        loading ? (<Preloader />) : (
            <>
                <ProductList data_1={data_1} data_2={data_2}/>
            </>
        )
    );
}

export default Query;
import { useState, useEffect } from 'react';
import axios from 'axios';
import Preloader from '../preloader/preloader.jsx';
import Main from '../main/main.jsx';

const QuerySelect = ({ onRender }) => {
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response_1 = await axios.get('http://192.168.1.3:3001/data/food-categories');
                setData_1(response_1.data);

                const response_2 = await axios.get('http://192.168.1.3:3001/data/price-list');
                setData_2(response_2.data);

                setLoading(false);

				if (typeof onRender === 'function') {
					onRender();
				}
                
            } catch (error) {
                console.error('Ошибка при получении данных:', error, error.response);
            }
        };
        
        fetchDataFromServer();
  
    }, [onRender]);


    return ( 
        <>
            {data_1.length > 0 && data_2.length > 0 && (
                loading ? (<Preloader />) : (<Main data_1={data_1} data_2={data_2}/>)
            )}
        </>
    );
}

export default QuerySelect;
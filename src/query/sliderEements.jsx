import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './../components/header/header.jsx';

function Query() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/data/food-categories');
                setData(response.data);
                console.log(data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        
        fetchDataFromServer();
  
    },  []);
    return ( 
        <Header data={data} />
    );
}

export default Query;
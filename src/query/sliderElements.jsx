import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header/header.jsx';
import Preloader from './../components/preloader/preloader.jsx';

function Query() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/data/food-categories');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setLoading(false);
            }
        };
        
        fetchDataFromServer();
  
    },  []);
    
    return ( 
        loading ? <Preloader /> : <Header data={data} />
    );
}

export default Query;
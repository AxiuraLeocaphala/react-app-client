import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { HookTelegram } from './components/hooks/hookTelegram.jsx';
import Preloader from './components/preloader/preloader.jsx'; 
import ProductList from './components/productList/productList.jsx';
import Header from './components/header/header.jsx';
import './App.css';

function Menu() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/price-list?chatId=${HookTelegram().chatId}`)
        .then(
            (response) => {
                setIsLoaded(true);
                setData(response.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);

    if (error){
        return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded){
        return <Preloader/>
    } else {
        return (
            <div className="WebApp">
                <>
                    <Header productCategory={data[0]}/>
                    <ProductList productCategory={data[0]} productInfo={data[1]}/>
                </>
            </div>
        );
    }
}

export default Menu;

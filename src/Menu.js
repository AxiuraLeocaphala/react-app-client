import React, {useState, useEffect, Suspense} from 'react';
import axios from 'axios';
import Preloader from './components/preloader/preloader.jsx';
import { HookTelegram } from './components/hooks/hookTelegram.jsx';
import ProductList from './components/productList/productList.jsx';
import Header from './components/header/header.jsx';
import './App.css';

function Menu() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPainted, setIsPainted] = useState(true);
    const [data, setData] = useState([]);

    const handleIsPainted = () => {
        setIsPainted(false);
    }

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
    } else if(!isLoaded){
        return <Preloader/>
    } else {
        return(
            <>
                {isPainted && (<Preloader/>)}
                <Header productCategory={data[0]} handleIsPainted={handleIsPainted}/>
                <ProductList  productCategory={data[0]} productInfo={data[1]}/>
            </>
        )
    }
}

export default Menu;

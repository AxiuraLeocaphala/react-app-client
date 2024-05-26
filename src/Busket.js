import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { useTelegram } from "./components/hooks/useTelegram.jsx";
import Preloader from './components/preloader/preloader.jsx';
import './App.css';

function Busket() {
    const [isLoadingProductList, setIsLoadingProductList] = useState(true);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const { tg, UserId, TelegramBusketButtons} = useTelegram();

    const handleLoading = () => {
        setIsLoadingProductList(false);
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/productInBusket?userId=${UserId}`)
        .then(
            (response) => {
                setIsLoadedData(true);
                setData(response.data);
            },
            (error) => {
                setError(error);
            }
        )
    }, [UserId]);

    useEffect(() => {
        if (!isLoadingProductList) {
            tg.ready();
            TelegramBusketButtons();
        }
    })

    if (error) {
        return <div>Возникла ошибка: {error.message}</div>
    } else if (!isLoadedData) {
        return <Preloader/>
    } else {
        return ( 
            <>
                {isLoadingProductList && (<Preloader/>)}
                <ProductListBusket productsInBusket={data} handleLoading={handleLoading}/>
            </>
        )
        
    }
}

export default Busket;
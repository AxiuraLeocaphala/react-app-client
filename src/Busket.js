import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { HookTelegram, ButtonsTelegramBusket } from "./components/hooks/hookTelegram.jsx";
import Preloader from './components/preloader/preloader.jsx';
import './App.css';

function Busket() {
    const [isLoadingProductList, setIsLoadingProductList] = useState(true);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const handleLoading = () => {
        setIsLoadingProductList(false);
        ButtonsTelegramBusket();
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/productInBusket?chatId=${HookTelegram().chatId}`)
        .then(
            (response) => {
                setIsLoadedData(true);
                setData(response.data);
            },
            (error) => {
                setError(error);
            }
        )
    }, []);

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
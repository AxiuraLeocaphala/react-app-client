import React, {useEffect} from "react";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { useTelegram } from "./components/hooks/useTelegram.jsx";
import { useLoaderData } from "react-router-dom";
import './App.css';

function Busket() {
    const { tg } = useTelegram.getTelegramData();
    const data = useLoaderData();
    const productListBusket = data.tastyCart.data;

    useEffect(() => {
        tg.ready();
        useTelegram.telegramBusketButtons();
    }, [tg]);
    
    return ( 
        <ProductListBusket productsInBusket={productListBusket}/>
    )
}

export default Busket;
import React, {useEffect} from "react";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { tg, useTelegramOnBusket } from "./components/hooks/useTelegram.js";
import { useLoaderData } from "react-router-dom";
import './App.css';

function Busket() {
    const tastyCart = useLoaderData();
    const productListBusket = tastyCart.data;

    useTelegramOnBusket();

    useEffect(() => {
        tg.ready();
    }, []);
    
    return ( 
        <ProductListBusket productsInBusket={productListBusket}/>
    )
}

export default Busket;
import React, { useEffect, useRef} from "react";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { tg, useTelegramOnBusket } from "./components/hooks/useTelegram.js";
import { useLoaderData } from "react-router-dom";
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Busket() {
    const timerRef = useRef(null);
    const tastyCart = useLoaderData();
    const productListBusket = tastyCart.data;

    useTelegramOnBusket();

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)        
        return () => {
            CancelRefreshTokens(timerRef);
        };
    }, []);
    
    return ( 
        <ProductListBusket productsInBusket={productListBusket}/>
    )
}

export default Busket;
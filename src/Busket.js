import React, { useEffect, useRef, memo} from "react";
import { useLoaderData } from "react-router-dom";
import ProductListBusket from './components/productList/productListBusket.jsx';
import { tg, useTelegramOnBusket } from "./components/hooks/useTelegram.js";
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Busket() {
    const timerRef = useRef(null);
    const tastyCart = useLoaderData();
    const productListBusket = tastyCart.data;
    const ProductListBusketMemo = memo(ProductListBusket);

    useTelegramOnBusket();

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)        
        return () => {
            CancelRefreshTokens(timerRef);
        };
    }, []);
    
    return ( 
        <ProductListBusketMemo productsInBusket={productListBusket}/>
    )
}

export default Busket;
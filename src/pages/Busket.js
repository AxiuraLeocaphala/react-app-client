import React, { useEffect, useRef, memo} from "react";
import { useLoaderData } from "react-router-dom";
import ProductListBusket from './../components/productListBusket.jsx';
import PopupMsg from './../components//popupMsg.jsx';
import { VisibilityProvider } from './../store/contextMsg.js';
import { tg, useTelegramOnBusket } from "./../hooks/useTelegram.js";
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./../services/authWrapper.js";
import './../styles/App.css';

function Busket() {
    const timerRef = useRef(null);
    const tastyCart = useLoaderData();
    const productListBusket = tastyCart.data[0];
    const isChange = tastyCart.data[1];
    const ProductListBusketMemo = memo(ProductListBusket);

    useTelegramOnBusket(productListBusket);

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)        
        return () => {
            CancelRefreshTokens(timerRef);
        };
    }, []);
    
    return ( 
        <VisibilityProvider>
            <PopupMsg/>
            <ProductListBusketMemo productsInBusket={productListBusket} isChange={isChange}/>
        </VisibilityProvider>
    )
}

export default Busket;
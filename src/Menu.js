import { useEffect, useRef, memo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { tg, useTelegramOnMenu } from './components/hooks/useTelegram.js';
import Header from './components/header/header.jsx';
import ProductList from './components/productList/productList.jsx';
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Menu() {
    const timerRef = useRef(null)
    const culinaryDetails = useLoaderData();
    const productCategories = culinaryDetails.data[0];
    const productInfo = culinaryDetails.data[1];
    const HeaderMemo = memo(Header);
    const ProductListMemo = memo(ProductList);

    useTelegramOnMenu(productInfo);

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)
        return () => {
            CancelRefreshTokens(timerRef);
        };
    }, []);
    
    return (
        <>
            <HeaderMemo productCategories={productCategories}/>
            <ProductListMemo  productCategories={productCategories} productInfo={productInfo}/>
        </>
    )
}

export default Menu;
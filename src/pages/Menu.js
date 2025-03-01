import { useEffect, useRef, memo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { tg, useTelegramOnMenu } from './../hooks/useTelegram.js';
import Header from './../components/header.jsx';
import ProductList from './../components/productList.jsx';
import PopupMsg from './../components/popupMsg.jsx';
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./../services/authWrapper.js";
import { VisibilityProvider } from './../store/contextMsg.js';
import './../styles/App.css';

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
            <VisibilityProvider>
                <PopupMsg/>
                <ProductListMemo  productCategories={productCategories} productInfo={productInfo}/>
            </VisibilityProvider>
        </>
    )
}

export default Menu;
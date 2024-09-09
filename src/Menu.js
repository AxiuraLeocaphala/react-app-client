import { useEffect} from 'react';
import { useLoaderData } from "react-router-dom";
import { tg, useTelegramOnMenu } from './components/hooks/useTelegram.js';
import Header from './components/header/header.jsx';
import ProductList from './components/productList/productList.jsx';
import { CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Menu() {
    const culinaryDetails = useLoaderData();
    const productCategories = culinaryDetails.data[0];
    const productInfo = culinaryDetails.data[1];

    useTelegramOnMenu(productInfo);

    useEffect(() => {
        tg.ready();
        return () => {
            console.log('CANCEL MENU');
            CancelRefreshTokens('menu')
        };
    }, []);
    
    return (
        <>
            <Header productCategories={productCategories}/>
            <ProductList  productCategories={productCategories} productInfo={productInfo}/>
        </>
    )
}

export default Menu;
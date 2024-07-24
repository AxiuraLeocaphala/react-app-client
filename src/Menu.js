import { useEffect} from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { useTelegram } from './components/hooks/useTelegram.jsx';
import Header from './components/header/header.jsx';
import ProductList from './components/productList/productList.jsx';
import './App.css';

function Menu() {
    const { tg, MainButton } = useTelegram.getTelegramData();
    const culinaryDetails = useLoaderData();
    const productCategories = culinaryDetails.data[0];
    const productInfo = culinaryDetails.data[1];

    // Протестировать плагин ESlint для использования хука внутри условия
    const navigate = useNavigate();
    MainButton.onClick(() => {navigate("/busket")});
    
    useEffect(() => {
        tg.ready();
        useTelegram.telegramMenuButton(productInfo);
    }, [productInfo, tg]);
    
    return (
        <>
            <Header productCategories={productCategories}/>
            <ProductList  productCategories={productCategories} productInfo={productInfo}/>
        </>
    )
}

export default Menu;
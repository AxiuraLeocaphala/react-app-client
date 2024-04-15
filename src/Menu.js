import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { HookTelegram, ButtonTelegramMenu } from './components/hooks/hookTelegram.jsx';
import ProductList from './components/productList/productList.jsx';
import Header from './components/header/header.jsx';
import Preloader from './components/preloader/preloader.jsx';
import './App.css';

function Menu() {
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [isLoadingHeader, setIsLoadingHeader] = useState(true);
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const handleLoadedHeader = () => {
        setIsLoadingHeader(false);
    }

    const handleLoadedMenu = () => {
        setIsLoadingMenu(false);
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/price-list?chatId=${HookTelegram().chatId}`)
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

    useEffect(() => {
        if (!(isLoadingHeader && isLoadingMenu)) {
            HookTelegram().tg.ready();
            ButtonTelegramMenu(data[1]);
            HookTelegram().tg.MainButton.show();

        }
    }, [isLoadingHeader, isLoadingMenu, data]);

    if (error){
        return <div>Возникла ошибка: {error.message}</div>
    } else if(!isLoadedData){
        return <Preloader/>
    } else {
        return (
            <>
                {(isLoadingHeader || isLoadingMenu) && (<Preloader/> )}
                <Header productCategories={data[0]} handleLoadedHeader={handleLoadedHeader}/>
                <ProductList  productCategories={data[0]} productInfo={data[1]} handleLoadedMenu={handleLoadedMenu}/>
            </>
        )
    }
}

export default Menu;
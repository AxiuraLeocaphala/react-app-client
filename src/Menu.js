import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTelegram } from './components/hooks/useTelegram.jsx';
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
    const { tg, UserId, MainButton, TelegramMenuButton } = useTelegram();

    MainButton.onClick(useNavigate("/busket"));

    const handleLoadedHeader = () => { setIsLoadingHeader(false) }
    const handleLoadedMenu = () => { setIsLoadingMenu(false) }


    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/data/price-list?userId=${UserId}`)
        .then(
            (response) => {
                setIsLoadedData(true);
                setData(response.data);
            },
            (error) => {
                setError(error);
            }
        )
    }, [UserId]);

    useEffect(() => {
        if (!(isLoadingHeader && isLoadingMenu)) {
            tg.ready();
            TelegramMenuButton(data[1]);
        }
    }, [isLoadingHeader, isLoadingMenu, data, tg, TelegramMenuButton]);

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
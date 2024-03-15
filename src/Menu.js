import React, {useState, useEffect} from 'react';
//import { Navigate } from 'react-router-dom';
import { HookTelegram } from './components/hookTelegram/hookTelegram.jsx';
import Main from './components/main/main.jsx';
import Header from './components/header/header.jsx';
import {QuerySelect} from './components/query/querySelect.jsx';
import './App.css';

function Menu() {
    const [loadData, setLoadData] = useState(false);
    const [data, setData] = useState([]);
    const {tg} = HookTelegram();

    const handleData = (data) => {
        setData(data);
        setLoadData(true);
    }

    useEffect(() => {
        tg.ready();
        tg.MainButton.show();
        if (typeof data[0] !== 'undefined') {
            let totalPrice = 0; 
            data[1].forEach(element => {
                if (typeof element['Количество в корзине'] !== 'undefined'){
                    totalPrice += element['Стоимость'];
                }
            });
            if (totalPrice === 0){
                tg.MainButton.text = 'Корзина';
            } else {
                tg.MainButton.setParams({
                    text: `Корзина ${totalPrice}`
                })
            }
        }
    }, [data, tg])

    return (
        <div className="WebApp">
            <QuerySelect onDataReceived={handleData}/>
            {loadData && (
                <>
                    <Header productCategory={data[0]}/>
                    <Main productCategory={data[0]} productInfo={data[1]}/>
                </>
            )}
        </div>
    );
}

export default Menu;

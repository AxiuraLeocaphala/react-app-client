import React, {useState} from 'react';
import Preloader from './components/preloader/preloader.jsx';
import Main from './components/main/main.jsx';
import Header from './components/header/header.jsx';
import {QuerySelect} from './components/query/querySelect.jsx';
import './App.css';

function Menu() {
    const [loadData, setLoadData] = useState(false);
    const [data, setData] = useState([]);

    const handleData = (data) => {
        setData(data);
        setLoadData(true);
    }

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

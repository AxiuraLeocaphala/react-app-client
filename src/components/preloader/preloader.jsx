import React, {useEffect} from 'react';
import { HookTelegram } from '../hooks/hookTelegram';
import './preloader.css';

const Preloader = () => {
    useEffect(() => {
        HookTelegram().tg.MainButton.hide();
    })

    return (
        <div className="preloader">
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    );
};

export default Preloader;
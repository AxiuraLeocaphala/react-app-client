import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './../../App.js';
import './preloader.css';

const Preloader = () => {
    return (
        <div id="root">
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
        </div>
    );
};

const Root = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.onload = () => {
            setIsLoaded(true);
        };
    }, []);

    return (
        <>
            {!isLoaded ? <Preloader /> : <App />}
        </>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
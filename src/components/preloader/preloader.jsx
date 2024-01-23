import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './../../App.js';
import './preloader.css';

const Root = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 5000); // Замените это на реальную логику завершения рендеринга
    }, []);

    return (
        <>
        {!isLoaded ? (
            <div id="root">
                <div className="preloader">
                    <div className="sk-chase">
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        ) : (
        <App />
        )}
        </>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
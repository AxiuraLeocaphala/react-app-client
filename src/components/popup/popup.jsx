import React from 'react';
import Button from './../button/button.jsx';
import './popup.css';

const Popup = ({ product , onClose}) => {

    document.body.classList.add('popup-open');

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup cardProduct" id={`${product['ID товара']}`}>
                <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt='' /></picture>
                <h3>
                    {product["Название"]}
                </h3>
                <p>
                    {product["Описание"]}
                </p>
            </div>
            <div className="buttonSpace">
                    <Button product={product}/>
            </div>
        </div>
    );
}

export default Popup;
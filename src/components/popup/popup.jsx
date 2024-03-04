import React from 'react';
import Button from './../button/button.jsx';
import './popup.css';

const Popup = ({ product, onClose, optionsCardProduct }) => {
    return (
        <div className="overlay" onClick={onClose}>
            <div 
                className="popup"
                style={{
                    top: `${optionsCardProduct.top}px`, 
                    ...(optionsCardProduct.left < document.body.clientWidth / 2 ?
                        {left: `${optionsCardProduct.left}px`} : {right: '10px'}),
                    width: `${optionsCardProduct.width * 1.5}px`,
                    height: 'auto'}}>
                <div 
                    className="cardProduct" 
                    id={`${product['ID товара']}`}>
                    <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt='' /></picture>
                    <h3>
                        {product["Название"]}
                    </h3>
                    <p>
                        {product["Описание"]}
                    </p>
                </div>
                <div style={{width: `${optionsCardProduct.width * 1.5}px`}}>
                    <Button product={product}/>
                </div>
            </div>
        </div>
    );
}

export default Popup;
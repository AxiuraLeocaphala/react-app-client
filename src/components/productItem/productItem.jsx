import React, { useState } from 'react';
import './productItem.css';
import Button from './../button/button.jsx';
import Popup from './../popup/popup.jsx';

const ProductItem = ({ product }) => {
    const [isPopupShow, setIsPopupShow] = useState(false);

    const popupShow = (e) => {
        if (!['buttonAddToBasket', 'buttonRemove', 'buttonAdd', 'quantity'].includes(e.target.className)){
            setIsPopupShow(true);
        }
    }

    const popupClose = (e) => {
        if (e.target.className === 'overlay') {    
            document.body.classList.remove('popup-open');
            setIsPopupShow(false);
        }
    }

    return (
        <>
            <div className='cardProduct' id={product["ID товара"]} onClick={popupShow}>
                <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt=''/></picture>
                <h3 id='nameProduct'>
                    {product["Название"]}
                </h3>
                <p id='descriptionProduct'>
                    {product["Описание"]}
                </p>
                <Button product={product}/>
            </div>
            {isPopupShow && <Popup product={product} onClose={popupClose}/>}
        </>
    );
}

export default ProductItem;
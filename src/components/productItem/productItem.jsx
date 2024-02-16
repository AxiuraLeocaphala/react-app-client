/*
    Компонент ProductItem рендерит карточку продукта, используя данные, 
    полученные от компонента Main. В ProductItem также прописана логика 
    демонстрации и скрытия компонента Popup.

    При рендеринге ProductItem компоненту Button передается информация 
    о товаре для создания кнопки/группы кнопок со счетчиком
*/

import React, { useState } from 'react';
import './productItem.css';
import Button from './../button/button.jsx';
import Popup from './../popup/popup.jsx';

const ProductItem = ({ product }) => {

    const [isPopupShow, setIsPopupShow] = useState(false);

    const popupShow = (e) => {
        if (!['buttonAddToBasket', 'buttonReduce', 'buttonIncrease', 'quantity'].includes(e.target.className)){
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
                <Button 
                    product={product}
                />
            </div>
            {isPopupShow && <Popup product={product} onClose={popupClose}/>}
        </>
    );
} 

export default ProductItem;
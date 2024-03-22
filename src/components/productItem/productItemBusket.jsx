import React from 'react';
import Button from "../button/button";
import './productItemBusket.css';

const ProductItemBusket = ({ product }) => {
    return (
        <div className='cardProduct Busket'>
            <div className='darken-overlay'><picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt=''/></picture></div>
            <h3>{product['Название']}</h3>
            <div className='finalCost'>{product['Стоимость']} ₽</div>
            <p>{product['Описание']}</p>
            <div className='sale'>
                <div className='withDiscount'>{product['Стоимость'] * product['Количество']} ₽</div>
                <div className='withoutDiscount'>{product['Стоимость'] * product['Количество'] } ₽</div>
            </div>
            <div className='buttonBusket'><Button key={product['ID товара']} product={product}/></div>
        </div>
    )
}

export default ProductItemBusket;
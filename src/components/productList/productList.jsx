import React, { useState } from 'react';
import './productList.css';
import ProductItem from './../productItem/productItem.jsx';

const tg = window.Telegram.WebApp;

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = ({ data }) => {
    
    const [addedItems, setAddedItems] = useState([])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id); // По id ищем товар в корзине
        let newItems = [];

        if(alreadyAdded) { // Если товар в корзине => 
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Корзина ${getTotalPrice}`
            })
        }
    }
    
    if (!data || data.length === 0) {
        return <p>Данные отсутствуют</p>;
    }
    
    return (
        <div className={'list'}>
            {data.map((product) => (
                <ProductItem
                    key={product["ID товара"]}
                    product={product}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
}

export default ProductList
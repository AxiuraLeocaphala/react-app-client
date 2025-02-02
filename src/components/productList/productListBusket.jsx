import React, { useEffect, useState } from "react";
import { countTotalPrice } from "../hooks/countTotalPrice.js";
import ProductItemBusket from "../productItem/productItemBusket.jsx";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, isChange }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEmpty, setIsEmpty] = useState();

    const checkArray = () => {
        return productsInBusket.every(elem => elem === undefined);
    };
    
    const updateTotalPrice = () => {
        setTotalPrice(countTotalPrice(productsInBusket));
        setIsEmpty(checkArray());
    };

    const deleteItemBusket = (index) => {
        delete productsInBusket[index];
        setIsEmpty(checkArray());
    };

    useEffect(() => {   
        updateTotalPrice();
    });

    return (
        <>
            <div className="qb6">
                <span>
                    {totalPrice} ₽
                </span>
                <span>КОРЗИНА</span>
            </div>
            {isChange && (
                <div className="warning">
                    * Некоторые из выбранных вами блюд попали в стоп-лист, поэтому их здесь нет 
                </div>
            )}
            {isEmpty ? (
                <div className="alertItem">ПУСТО</div>
            ) : (
                <div className="productListBusket" style={isChange && {marginTop: "0"}}>
                    {productsInBusket.map((product, idx) => {
                        return (
                            <ProductItemBusket 
                            key={idx} 
                            index={idx} 
                            product={product} 
                            updateTotalPrice={updateTotalPrice} 
                            deleteItem={deleteItemBusket}
                            />
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default ProductListBusket;
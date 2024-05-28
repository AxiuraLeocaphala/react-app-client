import React, { useEffect, useState } from "react";
import { countTotalPrice } from "../hooks/countTotalPrice.jsx";
import ProductItemBusket from "../productItem/productItemBusket";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, handleLoading }) => {
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
        handleLoading();
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
            {isEmpty ? (
                <div className="alertItem">ПУСТО</div>
            ) : (
                <div className="productListBusket">
                    {productsInBusket.map((product, idx) => {
                        return (
                            <ProductItemBusket key={idx} index={idx} product={product} updateTotalPrice={updateTotalPrice} deleteItem={deleteItemBusket}/>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default ProductListBusket;
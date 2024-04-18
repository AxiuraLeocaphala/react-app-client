import React, { useEffect, useState } from "react";
import CountTotalPrice from "../hooks/countTotalPrice";
import ProductItemBusket from "../productItem/productItemBusket";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, handleLoading }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    const updateTotalPrice = () => {
        setTotalPrice(CountTotalPrice(productsInBusket));
    };

    useEffect(() => {   
        handleLoading();
        updateTotalPrice();
    }, [handleLoading]);

    return (
        <>
            <div className="qb6">
                <span>
                    {totalPrice} ₽
                </span>
                <span>КОРЗИНА</span>
            </div>
            <div className="productListBusket">
                {productsInBusket.map((product, idx) => {
                    return (
                        <ProductItemBusket key={idx} product={product} updateTotalPrice={updateTotalPrice}/>
                    )
                })}
            </div>
        </>
    )
}

export default ProductListBusket;
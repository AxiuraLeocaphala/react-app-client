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
    });
    return (
        <>
            <div className="qb6">
                <span>
                    {productsInBusket[0] !== null ? totalPrice() : 0} ₽
                </span>
                <span>КОРЗИНА</span>
            </div>
            {productsInBusket[0] !== null ? (
                <div className="productListBusket">
                    {updateTotalPrice()}
                    {productsInBusket.map((product, idx) => {
                        return (
                            <ProductItemBusket key={idx} product={product} updateTotalPrice={updateTotalPrice}/>
                        )
                    })}
                </div>
            ) : (
                <div className="alertItem">ПУСТО</div>
            )}
        </>
    )
}

export default ProductListBusket;
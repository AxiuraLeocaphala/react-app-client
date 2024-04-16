import React, { useEffect} from "react";
import CountTotalPrice from "../hooks/countTotalPrice";
import ProductItemBusket from "../productItem/productItemBusket";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, handleLoading }) => {
    useEffect(() => {   
        handleLoading();
    }, [handleLoading]);

    return (
        <>
            <div className="qb6">
                <span>
                    {CountTotalPrice(productsInBusket)} ₽
                </span>
                <span>КОРЗИНА</span>
            </div>
            <div className="productListBusket">
                {productsInBusket.map((product, idx) => {
                    return (
                    <ProductItemBusket key={idx} product={product}/>
                    )
                })}
            </div>
        </>
    )
}

export default ProductListBusket;
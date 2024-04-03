import React, {useEffect} from "react";
import ProductItemBusket from "../productItem/productItemBusket";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, handleLoading }) => {
    useEffect(() => {
        handleLoading();
    }, [handleLoading]);

    return (
        <div className="productListBusket">
            <h1>КОРЗИНА</h1>
            {productsInBusket.map((product, idx) => {
                return (
                    <ProductItemBusket key={idx} product={product}/>
                )
            })}
        </div>
    )
}

export default ProductListBusket;
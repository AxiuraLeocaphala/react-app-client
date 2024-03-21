import React, {useEffect} from "react";
import ProductItemBusket from "../productItem/productItemBusket";
import './productListBusket.css';

const ProductListBusket = ({ productsInBusket, handleLoading }) => {
    useEffect(() => {
        handleLoading();
    }, [handleLoading]);

    return (
        <div className="productListBusket">
            <div>КОРЗИНА</div>
            {productsInBusket.map((product, idx) => {
                return (
                    <ProductItemBusket product={product}/>
                )
            })}
        </div>
    )
}

export default ProductListBusket;
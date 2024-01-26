import React from 'react';
import './productList.css';
import ProductItem from './../productItem/productItem.jsx';

const ProductList = ({ data }) => {
    
    return (
        <>
            {data && data.length > 0 ? (
                <div className={'list'}>
                    {data.map((product) => (
                        <ProductItem
                            key={product["ID товара"]}
                            product={product}
                        />
                    ))}
                </div>
            ) : null}
        </>
    );
}

export default ProductList
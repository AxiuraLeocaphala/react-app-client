import React from 'react';
import './productList.css';
import ProductItem from './../productItem/productItem.jsx';

const ProductList = ({ data_1, data_2 }) => {

    

    return (
        <div className='productlList'>
            {data_1 && data_1.length > 0 && data_2 && data_2.length > 0 && (
                <>
                    {data_1.map((category) => (
                        <div key={category['ID категории']}>
                            <h2 style={{marginLeft: '10px'}}>
                                {category['Лого категории']} {category['Название категории']}
                            </h2>
                            <div className='list'>
                                {data_2.map((productCard) => {
                                    return (
                                        category['ID категории'] === productCard['ID категории'] && (
                                            <ProductItem
                                                key={productCard["ID товара"]}
                                                product={productCard}
                                            />
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ProductList;
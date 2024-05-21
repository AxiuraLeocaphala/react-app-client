import React, { useEffect } from 'react';
import ProductItem from '../productItem/productItem.jsx';
import './productList.css';

const Main = ({ productCategories, productInfo, handleLoadedMenu }) => { 
    useEffect(() => {
        handleLoadedMenu();
    }, [handleLoadedMenu]);

    return (
        <div className='productList'>
            {productCategories.map((category, idx) => (
                <div key={category['ID категории']} id={`categoryCell_${category['ID категории']}`}>
                    <h2>
                        {category['Лого категории']} {category['Название категории']}
                    </h2>
                    <div className='list'>
                        {productInfo.map((product) => {
                            return (
                                category['ID категории'] === product['ID категории'] && (
                                    <ProductItem
                                        key={product["ID товара"]}
                                        product={product}
                                    />
                                )
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Main;
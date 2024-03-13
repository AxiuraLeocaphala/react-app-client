import React, { useEffect } from 'react';
import TruncateText from '../trancateText/truncateText.jsx';
import ProductItem from '../productItem/productItem.jsx';
import './main.css';

const Main = ({ productCategory, productInfo }) => {
    useEffect(() => {
        TruncateText();
    }, [])

    return (
        <div className='productlList'>
            {productCategory.map((category, idx) => (
                <div key={category['ID категории']} id={`categoryCell_${category['ID категории']}`}>
                    <h2 style={{marginLeft: '10px'}}>
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
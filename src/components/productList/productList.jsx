import React from 'react';
import ProductItem from '../productItem/productItem.jsx';
import './productList.css';

const Menu = ({ productCategories, productInfo }) => {
    return (
        <div className='productList'>
            {productCategories.map((category, idx) => (
                <div key={category['CategoryId']} id={`categoryCell_${category['CategoryId']}`}>
                    <h2>
                        {category['CategoryLogo']} {category['CategoryName']}
                    </h2>
                    <div className='list'>
                        {productInfo.map((product) => {
                            return (
                                category['CategoryId'] === product['CategoryId'] && (
                                    <ProductItem
                                        key={product["ProductId"]}
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

export default Menu;
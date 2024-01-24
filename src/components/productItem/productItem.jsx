import React from 'react';
import './productItem.css';
import Button from './../button/button.jsx';

const ProductItem = ({product, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }
    
    return (
        <div className="col-6">
            <div className={`cardProduct ${product["Категория"]}`} id={product["ID товара"]} >

                <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt=''/></picture>
                <h3 id='nameProduct'>
                    {product["Название"]}
                </h3>
                <p id='descriptionProduct'>
                    {product["Описание"]}
                </p>
                <Button price={product["Стоимость"]} onClick={onAddHandler}/>

            </div>
        </div>
    );
}

export default ProductItem;
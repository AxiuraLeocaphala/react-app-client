import React, { useRef, useState, useCallback } from 'react';
import Button from '../button/button.jsx';
import Popup from '../popup/popup.jsx';
import './productItem.css';

const ProductItem = ({ product }) => {
    const [isVisible, setIsVisible] = useState(true);
    const cardProductRef = useRef(null);
    const [optionsCardProduct, setOptionsCardProduct] = useState(null);
    const [isPopupShow, setIsPopupShow] = useState(false);
    let timer = useRef(null);
    
    const updateOptionsCardProduct = useCallback(() => {
        return cardProductRef.current.getBoundingClientRect();
    }, []);

    const handleScrollEnd = useCallback(() => {
        const options = updateOptionsCardProduct();
        setOptionsCardProduct(options);
        setIsPopupShow(true);
    }, [updateOptionsCardProduct]);

    const handleTouchStart = useCallback((e) => {
        if (e.target.closest('.buttonSpace') === null) {
            cardProductRef.current.classList.add('active');
            timer.current = setTimeout(() => {
                const options = updateOptionsCardProduct();
                if (options.top >= 55) {
                    if (options.bottom <= window.innerHeight-55) {
                        setOptionsCardProduct(options);
                        setIsPopupShow(true);
                    } else {
                        window.addEventListener('scrollend', handleScrollEnd, { once: true });
                        window.scroll({
                            top: cardProductRef.current.offsetTop - window.innerHeight / 4,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    window.addEventListener('scrollend', handleScrollEnd, { once: true });
                    window.scroll({
                        top: cardProductRef.current.offsetTop - window.innerHeight / 8,
                        behavior: 'smooth'
                    });
                }
                cardProductRef.current.classList.remove('active');
                cardProductRef.current.classList.add('hide');
                document.body.classList.add('popup-open');
                setIsVisible(false);
            }, 400);
        }
    }, [handleScrollEnd, updateOptionsCardProduct]);

    const handleTouchEnd = useCallback(() => {
        cardProductRef.current.classList.remove('active');
        clearTimeout(timer.current);
    }, []);

    const popupClose = useCallback((e) => {
        if (e.target.className === 'overlay') {
            setIsVisible(true);
            e.target.classList.add('hide');
            e.target.querySelector('.popup').classList.add('hide');
            cardProductRef.current.classList.add('show');
            cardProductRef.current.classList.remove('hide');
            setTimeout(() => {
                cardProductRef.current.classList.remove('show');
                document.body.classList.remove('popup-open');
                setIsPopupShow(false);
            }, 300);
        }
    }, []);
    
    return (
        <>
            <div 
            ref={cardProductRef} 
            className='cardProduct' 
            id={product['ID товара']}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}>
                <picture><img src={`data:image/jpeg;base64,${product["Превью"]}`} alt=''/></picture>
                <h3 id='nameProduct'>{product["Название"]}</h3>
                <p id='descriptionProduct'>{product["Описание"]}</p>
                {isVisible && (<Button product={product}/>)}
            </div>
            {isPopupShow && (
                <Popup 
                product={product} 
                onClose={popupClose} 
                optionsCardProduct={optionsCardProduct}/>
            )}
        </>
    );
}

export default ProductItem;
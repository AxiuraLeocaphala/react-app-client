import React, { useRef, useEffect, useState } from 'react';
import Button from './../button/button';
import './productItemBusket.css';

const ProductItemBusket = ({ product, updateTotalPrice }) => {
    const [isDelete, setIsDelete] = useState(false);
    const capsuleRef = useRef(null);
    const cardProductRef = useRef(null);
    const timer = useRef(0);
    const imgRef = useRef(null);
    const hRef = useRef(null);
    const pRef = useRef(null);
    const arrayElems = useRef([]);
    const discount = 0.9;
    
    const deleteCard = () => {
        cardProductRef.current.classList.add('hide');
        setTimeout(() => {
            capsuleRef.current.style.height = '0px';
            setTimeout(() => {
                setIsDelete(true);
            }, 120)
        }, 200)
    }

    const addEventExpand = () => {
        const cardProduct = cardProductRef.current;
        cardProduct.addEventListener('touchstart', handlePointerDown);
        cardProduct.addEventListener('touchend', handlePointerUp);
    };
    
    const removeEventExpand = () => {
            const cardProduct = cardProductRef.current;
            cardProduct.removeEventListener('touchstart', handlePointerDown);
            cardProduct.removeEventListener('touchend', handlePointerUp);
    };
    
    const handleClickOnExpandedCard = () => {
        const cardProduct = cardProductRef.current;
        arrayElems.current.forEach((elem) => {
            if (elem.tagName === 'H3') {
                elem.style.webkitLineClamp = 1;
                hRef.current.style.height = '30px';
                pRef.current.style.top = '45px';
            } else {
                elem.style.webkitLineClamp= 2;
            }
        })
        cardProduct.style.height = '100%';
        cardProduct.style.boxShadow = '0 2px 10px rgba(0, 0, 0, .1)';
        imgRef.current.style.height = '100px';
        pRef.current.style.height = '42px';
        setTimeout(() => {
            cardProduct.style.zIndex = 0;
            cardProduct.removeEventListener('click', handleClickOnExpandedCard);
        }, 120);
        addEventExpand();
    };

    const handlePointerDown = (e) => {
        if (e.target.closest('.buttonSpaceBusket') === null) {
            const cardProduct = cardProductRef.current;
            const style = cardProduct.style;
            cardProduct.classList.add('entering');
            timer.current = setTimeout(() => {
                removeEventExpand();
                cardProduct.classList.remove('entering');
                let totalHeightChange = 0;
                arrayElems.current.forEach(elem => {
                    totalHeightChange += elem.scrollHeight - elem.clientHeight;
                    if (elem.tagName === 'H3') {
                        hRef.current.style.height = `${elem.scrollHeight}px`;
                        pRef.current.style.top = `${15+elem.scrollHeight}px`;
                    }
                    elem.style.webkitLineClamp = 999;
                });
                cardProduct.classList.add('entered');
                style.zIndex = 2;
                style.height = `${cardProduct.clientHeight+totalHeightChange}px`;
                style.boxShadow = '0 20px 20px rgba(0, 0, 0, 0.7)';
                imgRef.current.style.height = `${imgRef.current.clientHeight + totalHeightChange}px`;
                pRef.current.style.height = `${pRef.current.scrollHeight}px`;
                setTimeout(() => {
                    cardProduct.classList.remove('entered');
                    cardProduct.addEventListener('click', handleClickOnExpandedCard);
                }, 120);
            }, 400);
        }
    };

    const handlePointerUp = (e) => {
        if (e.target.closest('.buttonSpaceBusket') === null) {
            cardProductRef.current.classList.remove('entering');
            clearTimeout(timer.current);
        }
    };

    const isMoreThan = (elem) => {
        if (elem) {
            return elem.scrollHeight - elem.clientHeight > 1;
        }        
    };

    useEffect(() => {
        if (isMoreThan(hRef.current)) {
            arrayElems.current.push(hRef.current);
            if (isMoreThan(pRef.current)) {
                arrayElems.current.push(pRef.current);
            }
            addEventExpand();
            return () => {
                arrayElems.current = [];
            }
        } else if (isMoreThan(pRef.current)) {
            arrayElems.current.push(pRef.current);
            addEventExpand();
            return () => {
                arrayElems.current = [];
            }
        }
    });

    return (
        !isDelete && (
            <div ref={capsuleRef} className="capsule">
                <div ref={cardProductRef} className="cardProduct Busket">
                    <img src={`data:image/jpeg;base64,${product["Превью"]}`} alt='' ref={imgRef}/>
                    <h3 ref={hRef}>{product['Название']}</h3>
                    <div className='finalCost'>{product['Стоимость']} ₽</div>
                    <p ref={pRef}>{product['Описание']}</p>
                    <div className='sale'>
                        <div className='withDiscount'>{product['Стоимость'] * product['Количество'] * discount} ₽</div>
                        <div className='withoutDiscount'>{product['Стоимость'] * product['Количество']} ₽</div>
                    </div>
                    <div className='buttonSpaceBusket'><Button product={product} placeCall={'busket'} deleteCard={deleteCard} updateTotalPrice={updateTotalPrice}/></div>
                </div>
            </div>
        )
    )
}

export default ProductItemBusket;
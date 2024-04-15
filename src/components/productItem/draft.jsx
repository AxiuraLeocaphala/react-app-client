import React, {useRef, useEffect, useState} from 'react';
import {useSpring, animated} from '@react-spring/web';
import Button from '../button/button';
import './productItem.css';

const ProductItem = ({ product }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {heightCard, widthCard} = useSpring({
        height: isExpanded ? 'auto' : '280px',
        width : isExpanded ? '160%' : '100%',
    });
    const {heightP} = useSpring({
        height: isExpanded ? 'auto' : '55px'
    })

    const cardProductRef = useRef(null);
    const capsuleRef = useRef(null);
    const imgRef = useRef(null);
    const hRef = useRef(null);
    const pRef = useRef(null);
    const arrayElems = useRef([]);
    let timer = 0;

    const handleClickExpandedCard = (e) => {
        if (e.target.closest('.buttonSpace') === null) {
            const cardProduct = cardProductRef.current;
            const style = cardProduct.style;
            const h = hRef.current.style;
            const p = pRef.current.style;
    
            imgRef.current.style.height = '130px';
            h.fontSize = '18px';
            h.maxHeight = '50px'; 
            h.webkitLineClamp = 1;
            p.fontSize = '14px';
            p.height = '55px';
            p.webkitLineClamp = 3;
            style.width = '100%';
            style.height = '280px';
            setIsExpanded(false);
            cardProduct.removeEventListener('click', handleClickExpandedCard);
            setTimeout(() => {
                style.zIndex = 0;
                cardProduct.addEventListener('touchstart', handleTouchStart);
                cardProduct.addEventListener('touchend', handleTouchEnd);
            }, 200);
        }        
    }

    const expandCardProduct = () => {
        const cardProduct = cardProductRef.current;
        const style = cardProduct.style;
        const h = hRef.current.style;
        const p = pRef.current.style;
        if (cardProduct.getBoundingClientRect().x > document.body.clientWidth/2) {
            style.right = '0';
        }
        style.zIndex = 2;
        style.width = '160%';
        imgRef.current.style.height = '160px';
        h.fontSize = '20px';
        p.fontSize = '18px';
        if (arrayElems.current.length === 0) {
            h.height = 'auto';
            p.height = `${pRef.current.clientHeight}px`;
            style.height = 'auto';
        } else {
            arrayElems.current.forEach((elem)=> {
                if (elem.tagName === 'H3') {
                    elem.style.maxHeight = '999px';
                } else {
                    elem.style.height = `${elem.scrollHeight}px`;
                }
                elem.style.webkitLineClamp = 999;
            })
            style.height = 'auto';        
        }
        
        cardProduct.removeEventListener('touchstart', handleTouchStart);
        cardProduct.removeEventListener('touchend', handleTouchEnd);
        setTimeout(() => {
            cardProduct.addEventListener('click', handleClickExpandedCard);
        }, 200);
    };

    const handleTouchStart = (e) => {
        if (e.target.closest('.buttonSpace') === null) {
            const cardProduct = cardProductRef.current;
            const classList = cardProduct.classList;
            classList.add('entering');
            timer = setTimeout(() => {
                classList.remove('entering');
                classList.add('entered');
                const options = cardProduct.getBoundingClientRect();
                if (options.top >= 55) {
                    if (options.bottom <= window.innerHeight) {
                        //expandCardProduct();
                        setIsExpanded(true);
                        cardProduct.style.zIndex = 2;

                    } else {
                        //window.addEventListener('scrollend', expandCardProduct, { once: true });
                        window.scroll({
                            top: capsuleRef.current.offsetTop - window.innerHeight / 4,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    //window.addEventListener('scrollend', expandCardProduct, { once: true });
                    window.scroll({
                        top: capsuleRef.current.offsetTop - window.innerHeight / 8,
                        behavior: 'smooth'
                    });
                }
            }, 400);
            classList.remove('entered');
        }
    };

    const handleTouchEnd = (e) => {
        if (e.target.closest('.buttonSpace') === null) {
            cardProductRef.current.classList.remove('entering');
            clearTimeout(timer);
        }
    };

    const isMoreThan = (elem) => {
        return elem.scrollHeight - elem.clientHeight > 1;
    };

    const removeEvent = () => {
        const cardProduct = cardProductRef.current;
        cardProduct.removeEventListener('touchstart', handleTouchStart);
        cardProduct.removeEventListener('touchend', handleTouchEnd);
    }

    useEffect(() => {
        const cardProduct = cardProductRef.current;
        cardProduct.addEventListener('touchstart', handleTouchStart);
        cardProduct.addEventListener('touchend', handleTouchEnd);
        if (isMoreThan(hRef.current)) {
            arrayElems.current.push(hRef.current);
            if (isMoreThan(pRef.current)) {
                arrayElems.current.push(pRef.current);
            }
            return () => {
                removeEvent();
                arrayElems.current = [];
            }
        } else if (isMoreThan(pRef.current)) {
            arrayElems.current.push(pRef.current);
            return () => {
                removeEvent();
                arrayElems.current = [];
            }
        }
    }, []);

    return ( 
        <div ref={capsuleRef} className="capsule">
            <animated.div style={{heightCard, widthCard}}
            ref={cardProductRef}
            className="cardProduct Menu"
            id={product["ID товара"]}>
                <picture><img ref={imgRef} src={`data:image/jpeg;base64,${product["Превью"]}`} alt=''/></picture>
                <h3 ref={hRef} id="nameProduct">{product["Название"]}</h3>
                <animated.p style={heightP} ref={pRef} id="descriptionProduct">{product["Описание"]}</animated.p>
                <Button product={product}></Button>
            </animated.div>
        </div>
    )
    
};

export default ProductItem;
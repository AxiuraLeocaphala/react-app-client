import React, {useEffect, useRef} from 'react';
import Flickity from 'flickity';
import { HookTelegram } from '../hooks/hookTelegram';
import './header.css';

const Header = ({productCategories, handleLoadedHeader}) => {
    const sliderCategoryRef = useRef(null);
    const aRefs = useRef(Array(productCategories.length).fill(null).map(() => React.createRef()));

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = document.getElementById(e.target.getAttribute('href').substring(1));
        window.scroll({
            top: target.offsetTop - 60,
            behavior: 'smooth'
        });
    }

    const activeCategory = (target) => {
        let w = window;
        let t = document.getElementById(target);
        let wt = w.scrollY;
        let wh = w.innerHeight - HookTelegram().tg.viewportHeight / 2;
        let eh = t.offsetHeight;
        let et = t.offsetTop;
        if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        let flickity = new Flickity(sliderCategoryRef.current, {
            freeScroll: true,
            contain: true,
            cellAlign: 'center',
            dragThreshold: 10,
            prevNextButtons: false,
            pageDots: false,
        });
        const handleScroll = () => {
            aRefs.current.forEach((ref, index) => {
                if (activeCategory(ref.current.getAttribute('href').substring(1))) {
                    if (flickity.selectedIndex !== index) {
                        aRefs.current.forEach((ref, index) => {
                            ref.current.classList.remove('active');
                        });
                        ref.current.classList.add('active');
                        flickity.select(index);
                    }
                }
            })
        }
        document.addEventListener('scroll', handleScroll);
        handleLoadedHeader();
        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, [handleLoadedHeader])


    return (
        <div className='header'>
            <div ref={sliderCategoryRef} className='sliderCategory'>
                {productCategories.map((element, index) => {
                    return (
                        <a
                        
                        key={index}
                        ref={aRefs.current[index]}
                        href={`#categoryCell_${index}`}
                        onClick={handleClick}
                        >
                            {element['Лого категории']} {element['Название категории']} 
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default Header;
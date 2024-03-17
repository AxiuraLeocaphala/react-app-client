import React, { useEffect, useRef } from "react";
import {HookTelegram} from '../hooks/hookTelegram.jsx';
import Flickity from 'flickity';
import './header.css'

const Header = ({ productCategory }) => {
    const sliderCategoryRef = useRef(null);
    const aRefs = useRef(Array(productCategory.length).fill(null).map(() => React.createRef()));

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
        let flkty;
        flkty = new Flickity(sliderCategoryRef.current, {
            freeScroll: true,
            contain: true,
            cellAlign: 'center',
            dragThreshold: 10,
            prevNextButtons: false,
            pageDots: false,
        });

        const handleScroll = () => {
            aRefs.current.forEach((ref, index) => {
                const categoryCellHref = ref.current.getAttribute('href').replace("#", "");
                if (activeCategory(categoryCellHref)) {
                    if (flkty.selectedIndex !== index) {
                        aRefs.current.forEach((ref, index) => {
                            ref.current.classList.remove('active');
                        });
                        ref.current.classList.add('active');
                        flkty.select(index);
                    }
                }
            })
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [productCategory]);
    
    const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const hash = e.target.getAttribute('href');
		const targetElement = document.getElementById(hash.substring(1));
		if (targetElement) {
			window.scroll({
				top: targetElement.offsetTop - 60,
				behavior: 'smooth'
			});
		}
	}

    return (
        <div className="header">
            {console.log('index.js')}
            <div ref={sliderCategoryRef} className="sliderCategory">
                {productCategory.map((item, idx) => {
                    return (
                        <a 
                            ref={aRefs.current[idx]}
                            key={idx}
                            href={`#categoryCell_${idx}`} 
                            className={`categoryName${idx === 0 ? ' active' : ''}`}
                            onClick={handleClick}
                        >
                            {item["Лого категории"]} {item["Название категории"]}
                        </a>
                    );
                })}
            </div>
        </div>
    )
}

export default Header;
import React, { useEffect } from 'react';
import Flickity from 'flickity';
import ProductItem from '../productItem/productItem.jsx';
import './main.css';

const tg = window.Telegram.WebApp;

function activeCategory(target) {
    let w = window;
    let t = document.getElementById(target);
    let wt = w.scrollY;
    let wh = w.innerHeight - tg.viewportHeight / 2;
    let eh = t.offsetHeight;
    let et = t.offsetTop;
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        return true;
    } else {
        return false;
    }
}

const Main = ({data_1, data_2}) => {

    useEffect(() => {
        let flkty;
        
        if (data_1 && data_1.length > 0) {
			flkty = new Flickity('.sliderCategory', {
				freeScroll: true,
				contain: true,
				cellAlign: 'center',
				dragThreshold: 10,
				prevNextButtons: false,
				pageDots: false,
			});
		}

        function handleScroll() {
            const categoryCells = document.querySelectorAll('[id^="categoryCell_"]');
            categoryCells.forEach((cell, i) => {
                if (activeCategory(cell.id)) {
                    if (flkty.selectedIndex !== i) {
                        const links = document.querySelectorAll('.sliderCategory a');
                        links.forEach(link => {
                            link.classList.remove('active');
                        });
                        document.querySelector('.sliderCategory  a[href="#' + cell.id + '"]').classList.add('active');
                        flkty.select(i);
                    }
                    
                }
            });
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data_1]);

    const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const hash = e.target.getAttribute('href');
		const targetElement = document.getElementById(hash.substring(1));
		if (targetElement) {
			const offsetTop = targetElement.offsetTop - 50;
			window.scroll({
				top: offsetTop,
				behavior: 'smooth'
			});
		}
	}
    
    return (
        <>
            <div className="header">
                <div className="sliderCategory">
                    {data_1 && data_1.map((item, idx) => {
                        return (
                            <a 
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

            <div className='productlList'>
                {data_1 && data_1.length > 0 && data_2 && data_2.length > 0 && (
                    <>
                        {data_1.map((category, idx) => (
                            <div key={category['ID категории']} id={`categoryCell_${category['ID категории']}`}>
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
        </>
    );
};

export default Main;
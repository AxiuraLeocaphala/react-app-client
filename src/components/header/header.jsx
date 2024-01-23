import React, { useEffect } from "react";
import Flickity from 'flickity';
import "./header.css";

const Header = ( {data} ) => {

	useEffect(() => {
        new Flickity('.sliderCategory', {
            freeScroll: true,
            contain: true,
            cellAlign: 'center',
            dragThreshold: 10,
            prevNextButtons: false,
            pageDots: false,
        });
    }, []);

	const flickitySlides = {
		id: [0, 1, 2, 3, 4, 5, 6],
		categoryName: ['🍳 Завтраки', '☕️ Класические напитки', '🍰 Десерты', '🍹 Летнее меню', '🍬 Коробки конфет', '🥐 Выпечка', '🥞 Блинчики'],
	}
    return (	
		<div className="header">
			<div className="sliderCategory">
				
				{flickitySlides['id'].map((index, idx) =>{
					return (
						<a 
							key={index}
							href={`#categoryCell_${index}`} 
							className={`categoryName${idx === 0 ? ' active' : ''}`}
						>
							{flickitySlides.categoryName[index]}
						</a>
					)
				})}
			</div>
		</div>
    );
}

export default Header;
import React from "react";
import Flickity from "react-flickity-component";
import './../../static/libraries/flickity.min.css';
import "./header.css";

const Header = () => {

	const flickityOptions = {
		initialIndex: 0,
		freeScroll: true,
		contain: true,
		cellAlign: 'center',
		dragThreshold: 10,
		prevNextButtons: false,
		pageDots: false
	}
	const flickitySlides = {
		id: [1, 2, 3, 4, 5, 6, 7],
		categoryName: ['🍳 Завтраки', '☕️ Класические напитки', '🍰 Десерты', '🍹 Летнее меню', '🍬 Коробки конфет', '🥐 Выпечка', '🥞 Блинчики'],
	}

    return (	
		<div className="header">
			<div className="sliderCategory">
				<Flickity
				className='slider'
				elementType='div'
				disableImagesLoaded={false}
				options={flickityOptions}
				static
				>
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
				</Flickity>
			</div>
		</div>
    );
}

export default Header;
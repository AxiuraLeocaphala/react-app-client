import React, { useEffect } from "react";
import Flickity from 'flickity';
import "./header.css";

const Header = ( {data} ) => {
	useEffect(() => {
		if (data && data.length > 0) {
			new Flickity('.sliderCategory', {
				freeScroll: true,
				contain: true,
				cellAlign: 'center',
				dragThreshold: 10,
				prevNextButtons: false,
				pageDots: false,
			});
		}
	}, [data]);

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
		<div className="header">
			<div className="sliderCategory">
				{data && data.map((item, idx) => {
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
    );
}

export default Header;
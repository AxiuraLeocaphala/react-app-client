import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './../productList/productList.jsx';
import Preloader from './../preloader/preloader.jsx';

function Query({ onRender }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDataFromServer = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:3001/data/price-list');
				setData(response.data);
				setLoading(false);
				if (typeof onRender === 'function') {
					onRender(); // Вызываем функцию обратного вызова, чтобы уведомить родительский компонент
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
		
		fetchDataFromServer();

	}, [onRender]);
	
	return (
		loading ? (<Preloader />) : (<ProductList data={data}/>)
	);
}

export default Query;
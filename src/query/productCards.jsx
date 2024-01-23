import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/productList/productList.jsx';

function Query() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchDataFromServer = async () => {
			try {
				const response = await axios.get('http://127.0.0.1:3001/data/price-list');
				setData(response.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
		
		fetchDataFromServer();

	}, []);
	
	return (
		<ProductList data={data} />
	);
}

export default Query;
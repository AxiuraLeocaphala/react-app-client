import axios from 'axios';

const  QueryIncrease = (chatId, productName) => {
    return axios.post('http://127.0.0.1:3001/data/increaseQuantity', {
        chatId,
        productName
    });
}

export default QueryIncrease;
import axios from 'axios';

const  QueryIncrease = (chatId, productName) => {
    return axios.post('http://192.168.56.1:3001/data/increaseQuantity', {
        chatId,
        productName
    });
}

export default QueryIncrease;
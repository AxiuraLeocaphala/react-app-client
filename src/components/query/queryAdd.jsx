import axios from 'axios';

const  QueryAdd = (chatId, productName) => {
    return axios.post('http://192.168.1.3:3001/data/increaseQuantity', {
        chatId,
        productName
    });
}

export default QueryAdd;
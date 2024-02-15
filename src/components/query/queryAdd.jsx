import axios from 'axios';

const  QueryAdd = (chatId, productName, productQuantity, productPrice) => {
    return axios.post('http://127.0.0.1:3001/data/addToBusket', {
        chatId,
        productName,
        productQuantity,
        productPrice
    });
}

export default QueryAdd;
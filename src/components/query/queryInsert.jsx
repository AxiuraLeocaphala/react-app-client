import axios from 'axios';

const  QueryInsert = (chatId, productName, productQuantity, productPrice) => {
    // Запрос серверу на добавление товара в корзину
    return axios.post('http://127.0.0.1:3001/data/addToBusket', {
        chatId,
        productName,
        productQuantity,
        productPrice
    });
}

export default QueryInsert;
import axios from 'axios';

const  QueryInsert = (chatId, productName, productQuantity, productPrice) => {
    // Запрос серверу на добавление товара в корзину
    return axios.post('http://192.168.1.3:3001/data/addToBusket', {
        chatId,
        productName,
        productQuantity,
        productPrice
    });
}

export default QueryInsert;
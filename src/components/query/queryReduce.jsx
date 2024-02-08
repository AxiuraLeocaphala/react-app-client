import axios from 'axios';

const  QueryReduce = (chatId, productName) => {
    return axios.post('http://127.0.0.1:3001/data/reduceNumber', {
        chatId,
        productName
    });
}

export default QueryReduce;
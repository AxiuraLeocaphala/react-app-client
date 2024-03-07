import axios from 'axios';

const  QueryReduce = (chatId, productName) => {
    return axios.post('http://192.168.56.1:3001/data/reduceNumber', {
        chatId,
        productName
    });
}

export default QueryReduce;
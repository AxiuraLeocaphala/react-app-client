import axios from 'axios';

const  QueryReduce = (chatId, productName) => {
    return axios.post('http://192.168.1.3:3001/data/reduceNumber', {
        chatId,
        productName
    });
}

export default QueryReduce;
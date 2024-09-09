import { useEffect, useState } from 'react'
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import './App.css';

function Order() {
    const [paymentDispute, setPaymentDispute] = useState('card');

    useTelegramOnOrder(paymentDispute);

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <> 
            <OrderList setPaymentDispute={setPaymentDispute}/>
        </>
    )
}

export default Order;
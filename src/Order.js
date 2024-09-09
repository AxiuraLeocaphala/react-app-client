import { useEffect, useState } from 'react'
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import { CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Order() {
    const [paymentDispute, setPaymentDispute] = useState('card');

    useTelegramOnOrder(paymentDispute);

    useEffect(() => {
        tg.ready();
        return () => {
            console.log('CANCEL ORDER');
            CancelRefreshTokens()
        };
    }, [])

    return (
        <> 
            <OrderList setPaymentDispute={setPaymentDispute}/>
        </>
    )
}

export default Order;
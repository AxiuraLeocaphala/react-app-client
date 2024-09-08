import { useEffect, useState } from 'react'
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import { CancelRefreshTokens } from './components/request/authWrapper';
import './App.css';

function Order() {
    const [paymentDispute, setPaymentDispute] = useState('card');

    useTelegramOnOrder(paymentDispute);

    useEffect(() => {
        tg.ready();
        return () => CancelRefreshTokens('order');
    }, [])

    return (
        <> 
            <OrderList setPaymentDispute={setPaymentDispute}/>
        </>
    )
}

export default Order;
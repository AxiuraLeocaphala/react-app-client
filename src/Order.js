import { useEffect, useState, useRef } from 'react'
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import './App.css';

function Order() {
    const timerRef = useRef(null);
    const [paymentDispute, setPaymentDispute] = useState('card');

    useTelegramOnOrder(paymentDispute);

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens("Order", timerRef.current)
        return () => {
            console.log('CANCEL ORDER');
            CancelRefreshTokens("Order", timerRef.current)
        };
    }, [])

    return (
        <> 
            <OrderList setPaymentDispute={setPaymentDispute}/>
        </>
    )
}

export default Order;
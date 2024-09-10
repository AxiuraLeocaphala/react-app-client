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
        ScheduleRefreshTokens(timerRef)
        return () => {
            console.log('CANCEL ORDER');
            CancelRefreshTokens(timerRef)
        };
    }, [])

    return (
        <> 
            <OrderList setPaymentDispute={setPaymentDispute}/>
        </>
    )
}

export default Order;
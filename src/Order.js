import { useEffect, useState, useRef, memo } from 'react'
import { useLoaderData } from 'react-router-dom';
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import { MakeOrder } from "../src/components/request/makeOrder.js";
import './App.css';

function Order() {
    const timerRef = useRef(null);
    const [paymentDispute, setPaymentDispute] = useState('card');
    const detailOrder = useLoaderData();
    const OrderListMemo = memo(OrderList);

    useTelegramOnOrder(paymentDispute);

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)
        return () => {
            CancelRefreshTokens(timerRef)
        };
    }, [])

    const handleClickBtn = () => {
        MakeOrder(paymentDispute);
    }

    return (
        <> 
            <OrderListMemo setPaymentDispute={setPaymentDispute} detailOrder={detailOrder}/>
            <button onClick={handleClickBtn}>Сделать заказ</button>
        </>
    )
}

export default Order;
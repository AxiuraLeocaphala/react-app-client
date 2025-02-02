import { useEffect, useState, useRef, memo } from 'react'
import { useLoaderData } from 'react-router-dom';
import OrderList from "./components/orderList/orderList";
import { tg, useTelegramOnOrder } from './components/hooks/useTelegram';
import { ScheduleRefreshTokens, CancelRefreshTokens } from "./components/request/authWrapper.js";
import { MakeOrder } from "../src/components/request/makeOrder.js";
import './App.css';

function Order() {
    const timerRef = useRef(null);
    const [paymentMethod, setPaymentMethod] = useState('CARD');
    const detailOrder = useLoaderData();
    const OrderListMemo = memo(OrderList);

    useTelegramOnOrder(paymentMethod, detailOrder.data["totalPrice"]);

    useEffect(() => {
        tg.ready();
        ScheduleRefreshTokens(timerRef)
        return () => {
            CancelRefreshTokens(timerRef)
        };
    }, [])

    const handleClickBtn = () => {
        MakeOrder(paymentMethod);
    }

    return (
        <> 
            <OrderListMemo setPaymentMethod={setPaymentMethod} detailOrder={detailOrder}/>
            <button onClick={handleClickBtn}>Сделать заказ</button>
        </>
    )
}

export default Order;
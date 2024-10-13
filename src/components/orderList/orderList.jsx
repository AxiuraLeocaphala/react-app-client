import {useRef} from 'react';
import { useLoaderData } from 'react-router-dom';
import './orderList.css';

const OrderList = ({setPaymentDispute}) => {
    const totalPrice = useLoaderData().data['totalPrice'];
    const phoneNumber = useLoaderData().data['phoneNumber'];
    const cashRef = useRef();
    const cardRef = useRef();

    const handleClickCash = () => {
        setPaymentDispute('CASH');
        cardRef.current.classList.remove('active');
        cashRef.current.classList.add('active');
    }

    const handleClickCard = () => {
        setPaymentDispute('CARD');
        cashRef.current.classList.remove('active');
        cardRef.current.classList.add('active');
    }

    return (
        <>
            <div className='ol1'>Заказ</div>
            <div className='orderList'>
                <section>
                    <div className='title'>Способ оплаты</div>
                    <div className='paymentDispute'>
                        <div className='option'onClick={handleClickCash} ref={cashRef}>Наличные</div>
                        <div className='option active' onClick={handleClickCard} ref={cardRef}>Карта</div>
                    </div>
                </section>

                <section>
                    <div className='title'>Дополнительная информация</div>
                    <div className='phoneNumber'>{phoneNumber}</div>
                    <div className='address'>Адрес: Меридиан, Красноармейская улица, 73</div>
                </section>

                <section>
                    <div className='title'>Итог</div>
                    <div className='totalPrice'>
                        <span>Итого</span>
                        <span className='price'>{totalPrice} ₽</span>
                    </div>
                </section>
                <div className='police'>
                    Нажимая на кнопку “Заказать” вы даете согласие на обработку и 
                    хранение персональных данных в соответствии с Политикой 
                    конфиденциальности и условиями. Подробнее
                </div>
            </div>
        </>
    )
}

export default OrderList
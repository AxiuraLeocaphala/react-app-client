const CountTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((elem) => {
        if (elem["Количество"] !== undefined && elem["Количество"] !== 0) {
            totalPrice += elem["Стоимость"]
        }
    });
    return totalPrice;
}

export default CountTotalPrice;
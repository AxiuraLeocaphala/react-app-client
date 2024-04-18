const CountTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((elem) => {
        if (elem["Количество"] !== undefined && elem["Количество"] !== 0) {
            totalPrice += elem["Стоимость"] * elem["Количество"]
        }
    });
    return totalPrice;
}

export default CountTotalPrice;
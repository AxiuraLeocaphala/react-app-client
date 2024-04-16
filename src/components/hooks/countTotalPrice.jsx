const CountTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((elem) => {
        if (elem["Количество"] !== undefined) {
            totalPrice += elem["Стоимость"]
        }
    });
    return totalPrice;
}

export default CountTotalPrice;
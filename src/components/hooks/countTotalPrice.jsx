const CountTotalPrice = (data) => {
    let totalPrice = 0;
    data.forEach((elem) => {
        if (elem["Quantity"] !== undefined && elem["Quantity"] !== 0) {
            totalPrice += elem["ProductPrice"] * elem["Quantity"]
        }
    });
    return totalPrice;
}

export default CountTotalPrice;
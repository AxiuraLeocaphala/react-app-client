import React, {useEffect} from "react";

const ProductListBusket = ({productInBusket, handleLoading }) => {
    useEffect(() => {
        handleLoading();
    }, [handleLoading]);

    return (
        <>
            {productInBusket.map((element) => {
                return (
                    <div>{element['ID категории']} {element['ID товара']} {element['Название']} {element['Описание']} {element['Стоимость']}</div>
                )
            })}
        </>
    )
}

export default ProductListBusket;
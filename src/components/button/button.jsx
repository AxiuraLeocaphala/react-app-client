import {useState} from "react";
import { useVisibility } from "../../other/contextMsg";
import { RequestAdd } from "../request/requestAdd";
import { RequestIncrease } from "../request/requestIncrease";
import { RequestReduce } from "../request/requestReduce";
import "./button.css";

const Button = ({ product, locationCall, deleteCard, updateTotalPrice }) => {
    const [isButtonAddVisible, setButtonAddVisible] = useState(product["Quantity"] === null);
    const {setComponentVisibility, setComponentQuantity} = useVisibility();

    const handleClickMain = () => {
        RequestAdd(product, setButtonAddVisible);
    }

    const handleClickReduce = () => {
        RequestReduce(product, setComponentQuantity, locationCall, deleteCard, updateTotalPrice, setButtonAddVisible);
    }

    const handleClickIncrease = () => {
        RequestIncrease(product, setComponentQuantity, locationCall, updateTotalPrice, setComponentVisibility);
    }

    return (
        <div className="buttonSpace">
            { isButtonAddVisible ? (
                <>
                    <button className="buttonAddToBusket" onClick={handleClickMain}>
                        {product["ProductPrice"]} ₽
                    </button>
                </>
            ) : (
                <>
                    <button className="buttonReduce" onClick={handleClickReduce}>-</button>
                    <input className="quantity" type="text" readOnly value={product["Quantity"]}/>
                    <button className="buttonIncrease" onClick={handleClickIncrease}>+</button>
                </>
            )}
        </div>
    )
}

export default Button;
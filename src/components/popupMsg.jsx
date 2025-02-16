import { useVisibility } from "./../store/contextMsg";
import "./../styles/popupMsg.css";

const PopupMsg = () => {
    const {visibilityState, quantity} = useVisibility();

    return (
        <div className={`popup-msg ${visibilityState}`}>
            <p>Невозможно добавить в корзину больше {quantity} позиций</p>
        </div>
    )
}

export default PopupMsg;
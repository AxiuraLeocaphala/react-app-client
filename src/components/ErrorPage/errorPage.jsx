/*
const TruncateText = () => {
    const truncateText = (elements) => {
        elements.forEach(element => {
            const availableHeight = element.clientHeight;
            const originalText = element.textContent;

            if (element.scrollHeight > availableHeight) {
                let truncatedText = originalText;
                while (element.scrollHeight > availableHeight && truncatedText.length > 0) {
                    truncatedText = truncatedText.slice(0, -1);
                    element.textContent = truncatedText + '...';
                }
            }
        });
    }

    const names = document.querySelectorAll('#nameProduct');
    const descriptions = document.querySelectorAll('#descriptionProduct');
    truncateText(names);
    truncateText(descriptions);
};
 
export default TruncateText;
*/

import { useRouteError } from "react-router-dom";
import "./errorPage.css";
import logo from "../duck/fhinking-face.gif";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (   
        <section>
            <img src={logo} alt=""/>
            <p className="first">Произошла непредвиденная ошибка</p>
            <p className="last">
                <i>{error.statusText || error.message}</i>
            </p>
        </section>
    )
}
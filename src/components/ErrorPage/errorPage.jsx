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
import niceWorkBro from "../utya/niceWorkBro.gif";
import thinkingFace from "../utya/thinkingFace.gif";
import slepping from '../utya/slepping.gif';

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)

    let logo;
    if (error.status === 401) {
        logo = niceWorkBro;
    } else if (error.status === undefined) {
        // Временное решение обработки сценария "спящий сервер" (ошибка: net::ERR_CONNECTION_REFUSED)
        logo = slepping;
        error.message = "Сервер спит. Всеми силами пытаемся его разбулить"; 
    } else {
        logo =  thinkingFace;
    }


    return (   
        <section>
            <img src={logo} alt=""/>
            <p className="first">Что то пошло не так</p>
            <p className="last">
                <i>{error.statusText || error.message || error.data}</i>
            </p>
        </section>
    )
}
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

    let logo;
    switch (error.status) {
        case 401:
            logo = niceWorkBro;
            break;
        case 503:
            logo = slepping;
            break;
        default:
            logo = thinkingFace;
            break;
    }

    return (  
        <div>
            <section>
            <img src={logo} alt=""/>
            <p className="first">Что то пошло не так</p>
            <p className="last">
                <i>{error.statusText || error.message || error.data}</i>
            </p>
        </section>
        </div> 
        
    )
}
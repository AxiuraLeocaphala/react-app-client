import { useRouteError } from "react-router-dom";
import "./errorPage.css";
import niceWorkBro from "../utya/niceWorkBro.gif";
import thinkingFace from "../utya/thinkingFace.gif";
import slepping from '../utya/slepping.gif';

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

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
            <section className="errorPage">
                <img src={logo} alt=""/>
                <p className="first">Что то пошло не так</p>
                <p className="last">
                    <i>{error.statusText || error.message || error.data}</i>
                </p>
            </section>
        </div> 
    )
}
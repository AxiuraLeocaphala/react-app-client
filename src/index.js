import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu.js';
import Busket from './Busket';
import Order from './Order.js'
import ErrorPage from './components/ErrorPage/errorPage';
import Preloader from './components/preloader/preloader';
import { AuthWrapper, RefreshTokens, ScheduleRefreshTokens} from './components/request/authWrapper.js';
import { getCookie } from './components/request/cookie.js';
import { LoaderMenu } from './components/request/loaderMenu.jsx';
import { LoaderBusket } from './components/request/loaderBusket.jsx';
import { LoaderOrder } from './components/request/loaderOrder.js';

const router = createBrowserRouter([
    {   
        path: "/",
        element: <Menu/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken')) {
                if (!getCookie('refreshToken')) {
                    await AuthWrapper();
                }
                else await RefreshTokens();
            } else ScheduleRefreshTokens('Menu');

            return LoaderMenu();
        }
    }, {
        path: "/busket",
        element: <Busket/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken')) {
                if (!getCookie('refreshToken')) {
                    await AuthWrapper();
                }
                else await RefreshTokens();
            } else ScheduleRefreshTokens('Busket');
            
            return LoaderBusket();
        }
    }, {
        path: "/order",
        element: <Order/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken')) {
                if (!getCookie('refreshToken')) {
                    await AuthWrapper();
                }
                else await RefreshTokens();
            } else ScheduleRefreshTokens('Order');

            return LoaderOrder();
        }
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Preloader/>}/>
    </React.StrictMode>
);
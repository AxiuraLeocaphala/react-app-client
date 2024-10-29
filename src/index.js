import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu.js';
import Busket from './Busket';
import Order from './Order.js'
import ErrorPage from './components/ErrorElement/errorPage.jsx';
import Preloader from './components/preloader/preloader';
import { LoaderMenu } from './components/request/loaderMenu.jsx';
import { LoaderBusket } from './components/request/loaderBusket.jsx';
import { LoaderOrder } from './components/request/loaderOrder.js';
import { AuthWrapper } from './components/request/authWrapper.js';
import { getCookie } from './components/request/cookie.js';

const router = createBrowserRouter([
    {   
        path: "",
        element: <Menu/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken') && !getCookie('refreshToken')) await AuthWrapper()
            return LoaderMenu();
        }
    }, {
        path: "/busket",
        element: <Busket/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken') && !getCookie('refreshToken')) await AuthWrapper()
            return LoaderBusket();
        }
    }, {
        path: "/order",
        element: <Order/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            if (!getCookie('accessToken') && !getCookie('refreshToken')) await AuthWrapper()
            return LoaderOrder();
        }
    }
    ],{
        basename: "/meridian",
    }

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Preloader/>}/>
    </React.StrictMode>
);
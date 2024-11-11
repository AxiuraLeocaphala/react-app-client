import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu';
import Busket from './Busket';
import Order from './Order'
import ErrorPage from './components/ErrorElement/errorPage.jsx';
import Preloader from './components/preloader/preloader';
import { LoaderMenu } from './components/request/loaderMenu';
import { LoaderBusket } from './components/request/loaderBusket';
import { LoaderOrder } from './components/request/loaderOrder';
import { AuthWrapper } from './components/request/authWrapper';
import { getCookie } from './other/cookie.js';

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
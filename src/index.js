import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './pages/Menu.js';
import Busket from './pages/Busket.js';
import Order from './pages/Order.js'
import ErrorPage from './components/errorPage.jsx';
import Preloader from './components/preloader.jsx';
import { LoaderMenu } from './services/loaderMenu';
import { LoaderBusket } from './services/loaderBusket';
import { LoaderOrder } from './services/loaderOrder';
import { AuthWrapper } from './services/authWrapper';
import { getCookie } from './utils/cookie.js';

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
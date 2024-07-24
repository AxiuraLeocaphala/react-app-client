import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './Menu.js';
import Busket from './Busket';
import ErrorPage from './components/ErrorPage/errorPage';
import Preloader from './components/preloader/preloader';
import AuthWrapper from './components/request/authWrapper.jsx';
import LoaderMenu from './components/request/loaderMenu.jsx';
import LoaderBusket from './components/request/loaderBusket.jsx';

const router = createBrowserRouter([
    {   
        path: "/",
        element: <Menu/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            await AuthWrapper();
            const culinaryDetails = await LoaderMenu();
            return culinaryDetails ;
        }
    },
    {
        path: "/busket",
        element: <Busket/>,
        errorElement: <ErrorPage/>,
        loader: async () => {
            await AuthWrapper();
            const tastyCart = await LoaderBusket();
            return tastyCart;
        }
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Preloader/>}/>
    </React.StrictMode>
);
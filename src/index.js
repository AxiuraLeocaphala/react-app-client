import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes> 
                <Route path="*" element={<Menu/>}/> 
                <Route path="busket" element={<Menu/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
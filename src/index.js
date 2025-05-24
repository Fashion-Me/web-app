import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Paginas/Home'
import "@radix-ui/themes/styles.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cadastro from "./Paginas/Cadastro";
import Login from "./Paginas/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/cadastro",
        element: <Cadastro />
    },
    {
        path: "/login",
        element: <Login />
    }
]);
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <RouterProvider router={router}></RouterProvider>
);
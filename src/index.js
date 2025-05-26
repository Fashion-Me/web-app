import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@radix-ui/themes/styles.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/* Rotas */

import Home from './Paginas/Home'
import Cadastro from "./Paginas/Cadastro";
import Login from "./Paginas/Login";
import EsquecerSenha from "./Paginas/EsquecerSenha";

const router = createBrowserRouter([
    {   path: "/",          element: <Home/>},
    {   path: "/cadastro",  element: <Cadastro/>},
    {   path: "/login",     element: <Login/>},
    {   path: "/esquecerSenha", element: <EsquecerSenha/> }
]);
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <RouterProvider router={router}></RouterProvider>
);
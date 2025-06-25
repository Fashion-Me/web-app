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
import HomeEspecifica from "./Paginas/HomeEspecifica";
import NovaSenha from "./Paginas/NovaSenha";
import Pesquisar from "./Paginas/Pesquisar";
import Mensagens from "./Paginas/Mensagens";

const router = createBrowserRouter([
    {   path: "/",          element: <Home/>},
    {   path: "/cadastro",  element: <Cadastro/>},
    {   path: "/login",     element: <Login/>},
    {   path: "/pesquisar", element: <Pesquisar/> },
    {   path: "/mensagens", element: <Mensagens/> },
    {   path: "/esquecerSenha", element: <EsquecerSenha/> },
    {   path: "/homeEspecifica", element: <HomeEspecifica/> },
    {   path: "/novaSenha", element: <NovaSenha/> },
]);
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <RouterProvider router={router}></RouterProvider>
);
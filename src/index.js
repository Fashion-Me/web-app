// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import "@radix-ui/themes/styles.css";
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
//
// /* Rotas */
//
// import Home from './Paginas/Home'
// import Cadastro from "./Paginas/Cadastro";
// import Login from "./Paginas/Login";
// import EsquecerSenha from "./Paginas/EsquecerSenha";
// import HomeEspecifica from "./Paginas/HomeEspecifica";
// import NovaSenha from "./Paginas/NovaSenha";
// import Pesquisar from "./Paginas/Pesquisar";
// import Mensagens from "./Paginas/Mensagens";
// import Configuracao from "./Paginas/Configuracao";
//
// const router = createBrowserRouter([
//     {   path: "/",          element: <Home/>},
//     {   path: "/cadastro",  element: <Cadastro/>},
//     {   path: "/login",     element: <Login/>},
//     {   path: "/pesquisar", element: <Pesquisar/> },
//     {   path: "/mensagens", element: <Mensagens/> },
//     {   path: "/configuracao", element: <Configuracao/> },
//     {   path: "/esquecerSenha", element: <EsquecerSenha/> },
//     {   path: "/homeEspecifica", element: <HomeEspecifica/> },
//     {   path: "/novaSenha", element: <NovaSenha/> },
// ]);
// const root = ReactDOM.createRoot(document.getElementById('menu'));
// root.render(
//     <RouterProvider router={router}></RouterProvider>
// );

//
import './index.css';
import "@radix-ui/themes/styles.css";
/* Rotas */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Páginas */
import Home from './Paginas/Home';
import Cadastro from "./Paginas/Cadastro";
import Login from "./Paginas/Login";
import EsquecerSenha from "./Paginas/EsquecerSenha";
import HomeEspecifica from "./Paginas/HomeEspecifica";
import NovaSenha from "./Paginas/NovaSenha";
import Pesquisar from "./Paginas/Pesquisar";
import Mensagens from "./Paginas/Mensagens";
import Configuracao from "./Paginas/Configuracao";
import Apresentacao from "./Paginas/Apresentacao";
import Denuncias from "./Paginas/Denuncias";

/* Criando as rotas */
const router = createBrowserRouter([
    { path: "/", element: <Apresentacao /> },
    { path: "/home", element: <Home /> },
    { path: "/cadastro", element: <Cadastro /> },
    { path: "/login", element: <Login /> },
    { path: "/pesquisar", element: <Pesquisar /> },
    { path: "/mensagens", element: <Mensagens /> },
    { path: "/configuracao", element: <Configuracao /> },
    { path: "/esquecerSenha", element: <EsquecerSenha /> },
    { path: "/homeEspecifica", element: <HomeEspecifica /> },
    { path: "/novaSenha", element: <NovaSenha /> },

    /* Aplicação Moderação de Conteúdo */

    { path: "/denuncias", element: <Denuncias /> },

]);

const queryClient = new QueryClient();

/* Renderizando a aplicação com o React Query envolta do Router */
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);

//
//
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import "@radix-ui/themes/styles.css";
//
// import {
//     createBrowserRouter,
//     RouterProvider,
//     Navigate,
// } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//
// /* ---------- COMPONENTES AUXILIARES ---------- */
// import RequireAuth from "./routes/RequireAuth";   // ⬅ NOVO
//
// /* ---------- PÁGINAS ---------- */
// import Home from "./Paginas/Home";
// import Cadastro from "./Paginas/Cadastro";
// import Login from "./Paginas/Login";
// import EsquecerSenha from "./Paginas/EsquecerSenha";
// import HomeEspecifica from "./Paginas/HomeEspecifica";
// import NovaSenha from "./Paginas/NovaSenha";
// import Pesquisar from "./Paginas/Pesquisar";
// import Mensagens from "./Paginas/Mensagens";
// import Configuracao from "./Paginas/Configuracao";
//
// /* ---------- ROTAS ---------- */
// const router = createBrowserRouter([
//     /* Páginas públicas (sem autenticação) */
//     { path: "/login", element: <Login /> },
//     { path: "/esquecerSenha", element: <EsquecerSenha /> },
//     { path: "/novaSenha", element: <NovaSenha /> },
//
//     /* Páginas protegidas – passam por RequireAuth */
//     {
//         path: "/",
//         element: (
//                 <Home />
//         ),
//     },
//     {
//         path: "/cadastro",
//         element: (
//                 <Cadastro />
//         ),
//     },
//     {
//         path: "/pesquisar",
//         element: (
//             <RequireAuth>
//                 <Pesquisar />
//             </RequireAuth>
//         ),
//     },
//     {
//         path: "/mensagens",
//         element: (
//             <RequireAuth>
//                 <Mensagens />
//             </RequireAuth>
//         ),
//     },
//     {
//         path: "/configuracao",
//         element: (
//             <RequireAuth>
//                 <Configuracao />
//             </RequireAuth>
//         ),
//     },
//     {
//         path: "/homeEspecifica",
//         element: (
//             <RequireAuth>
//                 <HomeEspecifica />
//             </RequireAuth>
//         ),
//     },
//
//     /* Qualquer rota desconhecida → login */
//     {
//         path: "*",
//         element: <Navigate to="/login" replace />,
//     },
// ]);
//
// /* ---------- REACT QUERY ---------- */
// const queryClient = new QueryClient();
//
// /* ---------- RENDER ---------- */
// const root = ReactDOM.createRoot(document.getElementById("menu"));
// root.render(
//     <React.StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <RouterProvider router={router} />
//         </QueryClientProvider>
//     </React.StrictMode>
// );

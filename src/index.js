import './index.css';
import "@radix-ui/themes/styles.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Páginas */
import Home from './Paginas/Home';
import Cadastro from "./Paginas/Cadastro";
import CadastroAdicional from "./Paginas/CadastroAdicional/CadastroAdicional";
import Login from "./Paginas/Login";
import EsquecerSenha from "./Paginas/EsquecerSenha";
import HomeEspecifica from "./Paginas/HomeEspecifica";
import NovaSenha from "./Paginas/NovaSenha";
import Pesquisar from "./Paginas/Pesquisar/Pesquisar";
import Mensagens from "./Paginas/Mensagens";
import Configuracao from "./Paginas/Configuracao";
import Apresentacao from "./Paginas/Apresentacao/Apresentacao";
import Denuncias from "./Paginas/Denuncias";
import Perfil from "./Paginas/Perfil/Perfil";
import PagAnuncioVer from "./Paginas/PagAnuncio/PagAnuncioVer";

/* Criando as rotas */
const router = createBrowserRouter([
    { path: "/", element: <Apresentacao /> },
    { path: "/home", element: <Home /> },
    { path: "/cadastro", element: <Cadastro /> },
    { path: "/cadastroAdicional", element: <CadastroAdicional/> },
    { path: "/login", element: <Login /> },
    { path: "/pesquisar", element: <Pesquisar /> },
    { path: "/mensagens", element: <Mensagens /> },
    { path: "/perfil", element: <Perfil /> },
    { path: "/configuracao", element: <Configuracao /> },
    { path: "/esquecerSenha", element: <EsquecerSenha /> },
    { path: "/homeEspecifica", element: <HomeEspecifica /> },
    { path: "/novaSenha", element: <NovaSenha /> },
    { path: "/AnuncioVer", element: <PagAnuncioVer /> },

    /* Aplicação Moderação de Conteúdo */

    { path: "/moderacao/denuncias", element: <Denuncias /> },
    { path: "/moderacao/banimentos", element: <Denuncias /> },
    { path: "/moderacao/cadastro", element: <Denuncias /> },

]);

const queryClient = new QueryClient();

/* Renderizando a aplicação com o React Query envolta do Router */
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
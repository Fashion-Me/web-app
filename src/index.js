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
import Moderacao from "./Paginas/Moderacao/Moderacao";
import Perfil from "./Paginas/Perfil/Perfil";
import PagAnuncioVer from "./Paginas/PagAnuncio/PagAnuncioVer";
import PagAnuncioAdd from "./Paginas/PagAnuncio/PagAnuncioAdd";
import PagAnuncioEdit from "./Paginas/PagAnuncio/PagAnuncioEdit";
import EnderecosNovos from "./Paginas/Pedidos/EnderecosNovos";
import StatusPagamento from "./Paginas/MeusPedidos/StatusPagamento";
import ModeracaoEspecAnun from "./Paginas/Moderacao/ModeracaoEspecAnun";
import ModeracaoEspecPerfil from "./Paginas/Moderacao/ModeracaoEspecPerfil";
import ModeracaoEspecPost from "./Paginas/Moderacao/ModeracaoEspecPost";

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
    { path: "/AnuncioAdd", element: <PagAnuncioAdd /> },
    { path: "/AnuncioEdit", element: <PagAnuncioEdit /> },
    { path: "/pagamento", element: <EnderecosNovos /> },
    { path: "/MeusPedidos", element: <StatusPagamento /> },


    /* Aplicação Moderação de Conteúdo */
    { path: "/moderacao", element: <Moderacao /> },
    { path: "/moderacao/verPerfil", element: <Perfil acesso={"mod"}/>},
    { path: "/moderacao/perfils", element: <Moderacao pag={"perfils"} /> },
    { path: "/moderacao/anuncios", element: <Moderacao pag={"anuncios"}  /> },
    { path: "/moderacao/posts", element: <Moderacao pag={"posts"}  /> },
    { path: "/moderacao/cadastro", element: <Moderacao pag={"cadastro"}  /> },
    { path: "/moderacao/especPerfil", element: <ModeracaoEspecPerfil/> },
    { path: "/moderacao/especPost", element: <ModeracaoEspecPost /> },
    { path: "/moderacao/especAnuncio", element: <ModeracaoEspecAnun /> },

]);

const queryClient = new QueryClient();

/* Renderizando a aplicação com o React Query envolta do Router */
const root = ReactDOM.createRoot(document.getElementById('menu'));
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);
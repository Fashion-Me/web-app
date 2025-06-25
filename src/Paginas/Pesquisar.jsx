import React from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import ConteudoPesquisa from "../Componentes/ConteudoPesquisa";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
// Puxar do Banco

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'

const Pesquisar = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";


    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent user={tipoUsuario} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu user={tipoUsuario} tipo={menuTipo} />
            )}
            <ConteudoPesquisa tipo=""/>
        </div>
    );
};

export default Pesquisar;

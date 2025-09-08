import React from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import {useSearchParams} from "react-router-dom";
import useMenuTipo from "../hooks/useMenuTipo";
// Puxar do Banco

const Home = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();

    const [searchParams] = useSearchParams();
    const tipoEspecifico = searchParams.get("titulo");

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent  menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <ConteudoHomePadrao tipo="Especifica" tipoEspecifico={tipoEspecifico}/>
        </div>


    );
};

export default Home;
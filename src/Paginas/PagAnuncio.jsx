import React from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";

// Puxar do Banco

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'

const Home = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();



    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <ConteudoHomePadrao tipo=""/>
        </div>
    );
};

export default Home;

//alt+shift+f
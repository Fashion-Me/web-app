import React from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';

// Puxar do Banco

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'

const Pesquisar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            if (window.innerWidth > 500) {
                setMenuOpen(false); // Fecha o menu no desktop
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <div className='Home'>
            {isMobile ? (
                <HamburgerComponent user={tipoUsuario} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            ) : (
                <Menu user={tipoUsuario}/>
            )}
            <ConteudoHomePadrao local={LocalCli} tipo=""/>
        </div>
    );
};

export default Pesquisar;

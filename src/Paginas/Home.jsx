import React from 'react';
import Menu from '../Componentes/Menu';
import {BrowserRouter as Router, Routes} from 'react-router-dom'
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';

// Puxar do Banco
import fotoPerfil from "../Imagens/FotoPerfil.png"

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'
const tipoUsuario = "convidado"; // Pode ser 'convidado', 'adm' ou 'padrao'

export default () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <ConteudoHomePadrao local={LocalCli} tituloAnuncio="Calças"/>
        </div>
    );
};

//alt+shift+f
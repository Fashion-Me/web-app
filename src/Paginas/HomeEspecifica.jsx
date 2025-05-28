import React from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import {useState, useEffect} from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import {useSearchParams} from "react-router-dom";

// Puxar do Banco

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'
const tipoUsuario = "convidado"; // Pode ser 'convidado', 'adm' ou 'padrao'

const Home = () => {

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
    const [searchParams] = useSearchParams();
    const tipoEspecifico = searchParams.get("titulo");

    return (
        <div className='Home'>
            {isMobile ? (
                <HamburgerComponent user={tipoUsuario} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            ) : (
                <Menu user={tipoUsuario}/>
            )}
            <ConteudoHomePadrao local={LocalCli} tipo="Especifica" tipoEspecifico={tipoEspecifico}/>
        </div>
    );
};

export default Home;
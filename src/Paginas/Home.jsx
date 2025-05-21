import React from 'react';
import Menu from '../Componentes/Menu';
import ConjAnuncio from "../Componentes/ConjAnuncio/ConjAnuncio";
import "../css/Home.css"
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import iconeInicio from "../Imagens/Fundo-Btn.png";
import {MapPinned, ShoppingCart} from 'lucide-react';
import { useState, useEffect } from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';

//Puxar do Banco
import fotoPerfil from "../Imagens/FotoPerfil.png"
import Hamburger from "../Componentes/Menu/Hamburger";

const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'


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
        <div>
            {isMobile ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu />
            )}
        </div>
        {/*<Menu className='Menu-G'/>*/}
        {/*<Hamburger/>*/}
        <div className="Conteudo">
            <ConteudoHomePadrao local={LocalCli} tituloAnuncio="Calças" />




            {/*<div className="divLocal">*/}
            {/*    <MapPinned stroke={"#4066FF"}/>*/}
            {/*    <p> {LocalCli} </p>*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className="btnAnunciar"*/}
            {/*    style={{backgroundImage: `url(${iconeInicio})`}}*/}
            {/*>*/}
            {/*    <p>ANUNCIE AQUI SUAS ROUPAS NA FASHION</p>*/}
            {/*</div>*/}
            {/*<div className='divCarinho'>*/}
            {/*    <div className="imgPerfil"><img src={fotoPerfil} alt="Foto de Perfil"/></div>*/}
            {/*    <div className="IconeCarinho"><ShoppingCart/></div>*/}
            {/*</div>*/}
            {/*<ConjAnuncio*/}
            {/*    titulo="Calças"*/}
            {/*/>*/}
        </div>
    </div>
);
};

//alt+shift+f
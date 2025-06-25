import React, { useState } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import { useSearchParams } from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import ConteudoMensagens from "../Componentes/ConteudoMensagens";

const Mensagens = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent user={tipoUsuario} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu user={tipoUsuario} tipo={menuTipo} />
            )}
            <ConteudoMensagens/>
        </div>
    );
};

export default Mensagens;
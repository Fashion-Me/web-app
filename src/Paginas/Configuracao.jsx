import React, { useState } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import { useSearchParams } from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import ConteudoConfig  from "../Componentes/ConteudoConfig.jsx";

const Configuracao = () => {
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
            <ConteudoConfig/>
        </div>
    );
};

export default Configuracao;
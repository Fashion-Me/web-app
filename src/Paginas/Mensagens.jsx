import React, { useState } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import ConteudoHomePadrao from "../Componentes/ConteudoHomePadrao";
import "@radix-ui/themes/styles.css";
import { useSearchParams } from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import ConteudoMensagens from "../Componentes/ConteudoMensagens";
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";


const Mensagens = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu &&(
                    <HamburgerComponent user={tipoUsuario} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu user={tipoUsuario} tipo={menuTipo} />
            )}
            <ConteudoMensagens mostrarMenu={mostrarMenu} setMostrarMenu={setMostrarMenu} />
        </div>
    );
};

export default Mensagens;
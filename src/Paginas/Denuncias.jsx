import React , { useState, useEffect } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "@radix-ui/themes/styles.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import HamburgerComponentMod from '../Componentes/Menu/HamburgerMod';
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";
import FundoHome from "../Imagens/DetalheFundo.png";


const Denuncias = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(true);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu &&(
                    <HamburgerComponentMod menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu tipo={menuTipo} acesso={"mod"} />
            )}
            <main className="Conteudo" id="mainContasDenuncias" style={{backgroundImage: `url(${FundoHome})`}}>

            </main>
        </div>
    );
};

export default Denuncias;
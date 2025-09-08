import React, {useState} from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";
import FundoHome from "../Imagens/DetalheFundo.png";


const Denuncias = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu &&(
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo" id="ConteudoMensagens" style={{backgroundImage: `url(${FundoHome})`}}>
            </main>
        </div>
    );
};

export default Denuncias;
import React , { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../../css/Home.css";
import "@radix-ui/themes/styles.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import HamburgerComponentMod from '../../Componentes/Menu/HamburgerMod';
import useMenuTipo from "../../hooks/useMenuTipo";
import useAuth from "../../hooks/useAuth";
import FundoHome from "../../Imagens/DetalheFundo.png";
import {ArrowLeft} from "lucide-react";
import EditarPerfil from "../../Componentes/CompConfig/EditarPerfil";
import ModeracaoAnuncios from "./Components/ModeracaoAnuncios"
import ModeracaoPerfils from "./Components/ModeracaoPerfils"
import ModeracaoPosts from "./Components/ModeracaoPosts"
import ModeracaoCadastro from "./Components/ModeracaoCadastro"


const Moderacao = (props) => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(true);
    const [mostrarMenu, setMostrarMenu] = useState(true);
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
                {props.pag === 'perfils' &&
                    <>
                        <ModeracaoPerfils/>
                    </>
                }
                {props.pag === 'anuncios' &&
                    <>
                        <ModeracaoAnuncios/>
                    </>
                }
                {props.pag === 'posts' &&
                    <>
                        <ModeracaoPosts/>
                    </>
                }
                {props.pag === 'cadastro' &&
                    <>
                        <ModeracaoCadastro/>
                    </>
                }
            </main>
        </div>
    );
};
export default Moderacao;




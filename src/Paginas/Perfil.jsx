import React , { useState, useEffect } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import "@radix-ui/themes/styles.css";
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import '../css/Pesquisar.css';
import '../css/Perfil.css';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Anuncio from '../Componentes/ConjAnuncio/Anuncio';

import Carrinho from "../Componentes/Carrinho";
// Puxar do Banco
import imgAnuncioCamiseta from "../Imagens/AnuncioCamisa.png";
import FundoHome from "../Imagens/DetalheFundo.png";
import FundoPerfil from "../Imagens/camisetas.png";
import fotoPerfil from "../Imagens/FotoPerfil.png";

const Perfil = () => {


    const bioPerfil = "Sou o Luis Ricardo e gosto de dar I no TCC"
    const NomePerfil = "Luiz Ricardo"

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const produtos = Array(8).fill({
        preco: '14',
        imagem: imgAnuncioCamiseta, // Corrigido: agora contém o caminho direto da imagem
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo ConteudoPerfil">
                <div className="PerfilHeader" style={{ backgroundImage: `url(${FundoPerfil})` }}>
                </div>
                <div className="PerfilInfo">
                    <img src={fotoPerfil} alt="Foto de Luis Ricardo" className="FotoPerfil" />
                    <h1 className="NomeUsuario">{NomePerfil}</h1>
                    <h2>Sobre</h2>
                    <p className="BioUsuario">{bioPerfil}</p>
                </div>
                <div className="divBarraPesquisa">
                    <div className="barraPesquisa">
                        <input type="text" placeholder="Pesquisar..."/>
                        <Search className="iconeLupa" size={24} color="#efefef" />
                    </div>
                </div>

                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Meus Últimos Produtos</h2>
                    <div className="CarrosselProdutos">
                        <button className="BotaoCarrossel">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="ConjAnuncioPerfil">
                            <div className="Inferior ListaProdutos">
                                {produtos.map(produto => (
                                    <Anuncio key={produto.id} preco={produto.preco} imgFundo={produto.imagem} />
                                ))}
                            </div>
                        </div>
                        <button className="BotaoCarrossel">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Perfil;
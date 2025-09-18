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
import imgAnuncioCasaco from "../Imagens/AnuncioCasaco.png";
import FundoHome from "../Imagens/DetalheFundo.png";
import FundoPerfil from "../Imagens/camisetas.png";
import fotoPerfil from "../Imagens/FotoPerfil.png";

const Perfil = () => {


    const bioPerfil = "Sou o Luis Ricardo e gosto de dar I no TCC"
    const NomePerfil = "Luis Ricardo"

    const [startIndex, setStartIndex] = useState(0);
    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1 < produtos.length - 4 ? prevIndex + 1 : 0));
    };
    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : produtos.length - 5));
    };


    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const produtos = [
        { preco: '10', imagem: imgAnuncioCamiseta },
        { preco: '20', imagem: imgAnuncioCasaco },
        { preco: '30', imagem: imgAnuncioCamiseta },
        { preco: '40', imagem: imgAnuncioCasaco },
        { preco: '50', imagem: imgAnuncioCamiseta },
        { preco: '60', imagem: imgAnuncioCasaco },
        { preco: '70', imagem: imgAnuncioCamiseta },
        { preco: '80', imagem: imgAnuncioCasaco },
    ];

    const isAtStart = startIndex === 0;
    const isAtEnd = startIndex + 5 >= produtos.length;

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
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStart ? 'desabilitado' : ''}`}
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="ConjAnuncioPerfil">
                            <div className="Inferior ListaProdutos">
                                {produtos.slice(startIndex, startIndex + 5).map((produto, index) => (
                                    <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} />
                                ))}
                            </div>
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEnd ? 'desabilitado' : ''}`}
                            onClick={handleNext}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Perfil;
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

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const [buscasRecentes, setBuscasRecentes] = useState(["camisetas", "rosa"]);
    const categorias = ["camisetas", "casacos", "calças", "calçados", "acessórios"];
    const produtos = Array(10).fill({ preco: "R$ 14" });

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
                <header className="PerfilHeader" style={{ backgroundImage: `url(${FundoPerfil})` }}>
                </header>
                <div className="PerfilInfo">
                    <img src={fotoPerfil} alt="Foto de Luis Ricardo" className="FotoPerfil" />
                    <h1 className="NomeUsuario">Luis Ricardo</h1>
                    <h2>Sobre mim</h2>
                    <p className="BioUsuario">Sou o Luis Ricardo e gosto de dar I no TCC</p>
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
                        <button className="BotaoCarrossel Esquerda">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="ListaProdutos">
                            {produtos.map(produto => (
                                // Usando o seu componente Anuncio
                                <Anuncio key={produto.id} preco={produto.preco} imagem={produto.imagem} />
                            ))}
                        </div>
                        <button className="BotaoCarrossel Direita">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Perfil;
import React , { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../../css/Home.css"
import "@radix-ui/themes/styles.css";
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import './Pesquisar.css';
import { Search } from 'lucide-react';
import Anuncio from '../../Componentes/ConjAnuncio/Anuncio';
import Carrinho from "../../Componentes/Carrinho";
// Puxar do Banco
import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";
import FundoHome from "../../Imagens/DetalheFundo.png";
import camisetasImg from "../../Imagens/FundoBtnCamisetas.png";
import casacosImg from "../../Imagens/FundoBtnCasacos.png";
import calcasImg from  "../../Imagens/FundoBtnCalcas.png";
import calcadosImg from  "../../Imagens/FundoBtnCalcados.png";
import acessoriosImg from  "../../Imagens/FundoBtnAcessorios.png";


const Pesquisar = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const [buscasRecentes, setBuscasRecentes] = useState(["camisetas", "rosa"]);
    const categorias = ["camisetas", "casacos", "calças", "calçados", "acessórios"];
    const produtos = Array(10).fill({ preco: "R$ 14" });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    const anuncios = [
        { id: 1, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 2, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 3, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 4, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 5, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 6, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 7, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 8, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 9, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 10, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 11, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 12, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 13, preco: '14' , imgFundo: imgAnuncioCamiseta },
        { id: 14, preco: '14' , imgFundo: imgAnuncioCamiseta },
    ];

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
            <main className="Conteudo Pesquisar" style={{backgroundImage: `url(${FundoHome})`}}>
                <div className="FundoHamburguerCarrinho">
                </div>
                <Carrinho className="Clicavel"/>
                {/* Campo de pesquisa */}
                <div className="divBarraPesquisa">
                    <div className="barraPesquisa">
                        <input type="text" placeholder="Pesquisar..."/>
                        <Search className="iconeLupa" size={24} color="#efefef" />
                    </div>
                </div>

                <div className="secao-categorias">
                    <div>
                        <h2>Buscas recentes</h2>
                        <div className="buscas-recentes-chips">
                            <p className="chip">camisetas</p>
                            <p className="chip">jaqueta</p>
                        </div>
                    </div>
                    <div>

                        <h2>Categorias</h2>
                        <div className="categorias-botoes">
                            <button className="categoria-btn">
                                <img src={camisetasImg} alt="Camisetas" />
                                <p>camisetas</p>
                            </button>
                            <button className="categoria-btn">
                                <img src={casacosImg} alt="Casacos" />
                                <p>casacos</p>
                            </button>
                            <button className="categoria-btn">
                                <img src={calcasImg} alt="Calças" />
                                <p>calças</p>
                            </button>
                            <button className="categoria-btn">
                                <img src={calcadosImg} alt="Calçados" />
                                <p>calçados</p>
                            </button>
                            <button className="categoria-btn">
                                <img src={acessoriosImg} alt="Acessórios" />
                                <p>acessórios</p>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="ConjAnuncio ConjAnuncioConfig" >
                    <div className="Inferior">
                        {anuncios.map((prod, i) => (
                               <Anuncio
                                    key={i}
                                    imgFundo={imgAnuncioCamiseta}
                                    preco={prod.preco}
                               />
                            ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pesquisar;

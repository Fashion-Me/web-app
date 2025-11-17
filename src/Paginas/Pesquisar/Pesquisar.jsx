import React , { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../../css/Home.css"
import "@radix-ui/themes/styles.css";
import {useSearchParams} from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import './Pesquisar.css';
import { Search, X } from 'lucide-react';
import Anuncio from '../../Componentes/ConjAnuncio/Anuncio';
import Carrinho from "../../Componentes/Carrinho";
// Puxar do Banco

import FundoHome from "../../Imagens/DetalheFundo.png";
import camisetasImg from "../../Imagens/FundoBtnCamisetas.png";
import casacosImg from "../../Imagens/FundoBtnCasacos.png";
import calcasImg from  "../../Imagens/FundoBtnCalcas.png";
import calcadosImg from  "../../Imagens/FundoBtnCalcados.png";
import acessoriosImg from  "../../Imagens/FundoBtnAcessorios.png";

import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";
import CamisetaPreta from "../../Imagens/CamisetaPreta1.webp";
import CalcasPretas from "../../Imagens/calcas1.webp";
import Calcados from "../../Imagens/calcados1.webp";
import Casacos from "../../Imagens/AnuncioTituloCasacos1.png";
import Casacos2 from "../../Imagens/AnuncioCasaco.png";


const Pesquisar = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const [buscasRecentes, setBuscasRecentes] = useState(["Roupas Pretas", "jaqueta"]);
    const [pesquisa, setPesquisa] = useState("");
    const adicionarBuscaNaBarra = (busca) => {
        setPesquisa(busca);
    };
    const removerBusca = (buscaParaRemover) => {
        setBuscasRecentes(buscasRecentes.filter(busca => busca !== buscaParaRemover));
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    const anuncios = [
        { id: 1, preco: '139.99', imgFundo: CalcasPretas },
        { id: 2, preco: '85.50', imgFundo: imgAnuncioCamiseta },
        { id: 3, preco: '95.99', imgFundo: CamisetaPreta },
        { id: 4, preco: '119.99', imgFundo: Casacos },
        { id: 5, preco: '75.00', imgFundo: CamisetaPreta },
        { id: 6, preco: '65.00', imgFundo: imgAnuncioCamiseta },
        { id: 7, preco: '150.00', imgFundo: CalcasPretas },
        { id: 8, preco: '200.00', imgFundo: Calcados },
        { id: 9, preco: '55.00', imgFundo: Casacos2 },
        { id: 10, preco: '89.90', imgFundo: imgAnuncioCamiseta },
        { id: 11, preco: '135.00', imgFundo: CalcasPretas },
        { id: 12, preco: '180.00', imgFundo: Casacos },
        { id: 13, preco: '70.00', imgFundo: CamisetaPreta },
        { id: 14, preco: '220.00', imgFundo: Calcados },
    ];

    const anunciosFiltrados = () => {
        if (pesquisa.toLowerCase() === "roupas pretas") {
            return anuncios.filter(anuncio => [1, 3,4,9].includes(anuncio.id));
        }
        return anuncios;
    };

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
                <div className="divBarraPesquisa divBarraPesquisaMob">
                    <div className="barraPesquisa">
                        <input type="text"
                               placeholder="Pesquisar..."
                               onChange={(e) => setPesquisa(e.target.value)}
                               value={pesquisa}
                        />
                        <Search className="iconeLupa" size={24} color="#efefef" />
                    </div>
                </div>

                <div className="secao-categorias">
                    {buscasRecentes.length > 0 && (
                        <div>
                            <h2>Buscas recentes</h2>
                            <div className="buscas-recentes-chips">
                                {buscasRecentes.map((busca, index) => (
                                    <div key={index} className="chip">
                                        <p
                                            onClick={() => adicionarBuscaNaBarra(busca)}
                                        >
                                            {busca}
                                        </p>
                                        <span
                                            className="chip-remover"
                                            onClick={() => removerBusca(busca)}
                                        >
                                             <X size={18} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                        {anunciosFiltrados().map((prod, i) => (
                               <Anuncio
                                    key={i}
                                    imgFundo={prod.imgFundo}
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

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
import CamisetaPreta from "../../Imagens/AnuncioTituloCasacos1.png";
import CalcasPretas from "../../Imagens/AnuncioTituloCasacos1.png";
import Calcados from "../../Imagens/AnuncioTituloCasacos1.png";
import Casacos from "../../Imagens/AnuncioTituloCasacos1.png";
import Casacos2 from "../../Imagens/AnuncioCasaco.png";

// 👉 importa seu client da API (ajuste o caminho se for diferente)
import api from "../../services/authApi";

const Pesquisar = () => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const [buscasRecentes, setBuscasRecentes] = useState(["Cor preta", "jaqueta"]);
    const [pesquisa, setPesquisa] = useState("");
    const adicionarBuscaNaBarra = (busca) => {
        setPesquisa(busca);
    };
    const removerBusca = (buscaParaRemover) => {
        setBuscasRecentes(buscasRecentes.filter(busca => busca !== buscaParaRemover));
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    // 👉 aqui agora vem da API
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const carregarAnuncios = async () => {
            try {
                setCarregando(true);
                setErro(null);

                // GET /listings?limit=20&offset=0
                const response = await api.get("/listings", {
                    params: { limit: 20, offset: 0 },
                });

                // response.data é um array de ListingOut
                const data = response.data || [];

                // mapeia pro formato que o componente Anuncio já usa
                const mapeados = data.map((listing) => {
                    const primeiraMidia = listing.medias && listing.medias.length > 0
                        ? listing.medias[0].url
                        : imgAnuncioCamiseta; // fallback se não tiver mídia

                    return {
                        id: listing.id,
                        preco: (listing.price_cents / 100).toFixed(2).replace(".", ","), // "139,99"
                        imgFundo: primeiraMidia,
                        titulo: listing.title,
                        size: listing.size,
                        categoria: listing.category,
                    };
                });

                setAnuncios(mapeados);
            } catch (e) {
                console.error("Erro ao carregar anúncios:", e);
                setErro("Erro ao carregar anúncios. Tente novamente mais tarde.");
            } finally {
                setCarregando(false);
            }
        };

        carregarAnuncios();
    }, []);

    const anunciosFiltrados = () => {
        const posicoesDesejadas = [0, 1, 3, 8, 10, 15, 16, 18];

        // Filtro específico para "cor preta" - filtra por posições
        if (pesquisa.toLowerCase() === "cor preta") {
            return anuncios.filter((anuncio, index) => posicoesDesejadas.includes(index));
        }

        // Filtro genérico por título
        if (pesquisa.trim() !== "") {
            const termo = pesquisa.toLowerCase();
            return anuncios.filter((anuncio) =>
                (anuncio.titulo || "").toLowerCase().includes(termo)
            );
        }

        // Retorna todos os anúncios se não houver pesquisa
        return anuncios;
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo Pesquisar" style={{ backgroundImage: "url(" + FundoHome + ")"}}>
                <div className="FundoHamburguerCarrinho">
                </div>
                <Carrinho className="Clicavel"/>
                <div className="divBarraPesquisa divBarraPesquisaMob">
                    <div className="barraPesquisa">
                        <input
                            type="text"
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
                                        <p onClick={() => adicionarBuscaNaBarra(busca)}>
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

                <div className="ConjAnuncio ConjAnuncioConfig">
                    <div className="Inferior">
                        {carregando && <p>Carregando anúncios...</p>}
                        {erro && <p className="erro-anuncios">{erro}</p>}
                        {!carregando && !erro && anunciosFiltrados().map((prod, i) => (
                            <Anuncio
                                key={prod.id ?? i}
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

export default Pesquisar;
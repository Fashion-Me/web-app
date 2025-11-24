import React, { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../../css/Home.css"
import "@radix-ui/themes/styles.css";
import { useNavigate } from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import './Pesquisar.css';
import { Search, X } from 'lucide-react';
import Anuncio from '../../Componentes/ConjAnuncio/Anuncio';
import Carrinho from "../../Componentes/Carrinho";
import api from "../../services/authApi";

import FundoHome from "../../Imagens/DetalheFundo.png";
import camisetasImg from "../../Imagens/FundoBtnCamisetas.png";
import casacosImg from "../../Imagens/FundoBtnCasacos.png";
import calcasImg from "../../Imagens/FundoBtnCalcas.png";
import calcadosImg from "../../Imagens/FundoBtnCalcados.png";
import acessoriosImg from "../../Imagens/FundoBtnAcessorios.png";
import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";

const STORAGE_KEY = 'buscas_recentes';

const Pesquisar = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const navigate = useNavigate();

    const [buscasRecentes, setBuscasRecentes] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [categoriaAtiva, setCategoriaAtiva] = useState(null);
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    // Carregar buscas recentes do localStorage
    useEffect(() => {
        const buscasSalvas = localStorage.getItem(STORAGE_KEY);
        if (buscasSalvas) {
            try {
                setBuscasRecentes(JSON.parse(buscasSalvas));
            } catch (e) {
                console.error("Erro ao carregar buscas recentes:", e);
            }
        }
    }, []);

    // Salvar buscas recentes no localStorage
    const salvarBuscaRecente = (busca) => {
        if (!busca.trim()) return;

        const novasBuscas = [busca, ...buscasRecentes.filter(b => b !== busca)].slice(0, 5);
        setBuscasRecentes(novasBuscas);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novasBuscas));
    };

    const removerBusca = (buscaParaRemover) => {
        const novasBuscas = buscasRecentes.filter(busca => busca !== buscaParaRemover);
        setBuscasRecentes(novasBuscas);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novasBuscas));
    };

    const adicionarBuscaNaBarra = (busca) => {
        setPesquisa(busca);
        realizarBusca(busca, categoriaAtiva);
    };

    // Buscar anúncios na API
    const realizarBusca = async (termoBusca = "", categoria = null) => {
        try {
            setCarregando(true);
            setErro(null);

            const params = {};

            if (termoBusca.trim()) {
                params.q = termoBusca.trim();
                salvarBuscaRecente(termoBusca.trim());
            }

            if (categoria) {
                params.category = categoria;
            }

            console.log('Buscando com parâmetros:', params);
            const response = await api.get("/listings/search", { params });

            const data = response.data || [];

            const mapeados = data.map((listing) => {
                const primeiraMidia = listing.medias && listing.medias.length > 0
                    ? listing.medias.sort((a, b) => a.position - b.position)[0].url
                    : imgAnuncioCamiseta;

                return {
                    id: listing.id,
                    preco: (listing.price_cents / 100).toFixed(2).replace(".", ","),
                    imgFundo: primeiraMidia,
                    titulo: listing.title,
                    size: listing.size,
                    categoria: listing.category,
                };
            });

            setAnuncios(mapeados);
        } catch (e) {
            console.error("Erro ao buscar anúncios:", e);
            setErro("Erro ao buscar anúncios. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    // Buscar ao clicar na lupa
    const handleBuscar = () => {
        realizarBusca(pesquisa, categoriaAtiva);
    };

    // Buscar ao pressionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    };

    // Filtrar por categoria
    const handleCategoria = (categoria) => {
        const novaCategoria = categoriaAtiva === categoria ? null : categoria;
        setCategoriaAtiva(novaCategoria);
        realizarBusca(pesquisa, novaCategoria);
    };

    // Mapear categorias para o formato da API
    const categoriasMap = {
        camisetas: 'SHIRT',
        casacos: 'COAT',
        calcas: 'PANTS',
        calcados: 'SHOES',
        acessorios: 'ACCESSORIES'
    };

    // Carregar anúncios iniciais
    useEffect(() => {
        realizarBusca();
    }, []);

    // Navegar para o anúncio ao clicar
    const onCliqueAnuncio = (anuncio) => {
        navigate(`/anuncio/${anuncio.id}`);
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo Pesquisar" style={{ backgroundImage: `url(${FundoHome})` }}>
                <div className="FundoHamburguerCarrinho"></div>
                <Carrinho className="Clicavel"/>

                <div className="divBarraPesquisa divBarraPesquisaMob">
                    <div className="barraPesquisa">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            onChange={(e) => setPesquisa(e.target.value)}
                            onKeyPress={handleKeyPress}
                            value={pesquisa}
                        />
                        <Search
                            className="iconeLupa"
                            size={24}
                            color="#efefef"
                            onClick={handleBuscar}
                            style={{ cursor: 'pointer' }}
                        />
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
                            <button
                                className={`categoria-btn ${categoriaAtiva === categoriasMap.camisetas ? 'active' : ''}`}
                                onClick={() => handleCategoria(categoriasMap.camisetas)}
                            >
                                <img src={camisetasImg} alt="Camisetas" />
                                <p>camisetas</p>
                            </button>
                            <button
                                className={`categoria-btn ${categoriaAtiva === categoriasMap.casacos ? 'active' : ''}`}
                                onClick={() => handleCategoria(categoriasMap.casacos)}
                            >
                                <img src={casacosImg} alt="Casacos" />
                                <p>casacos</p>
                            </button>
                            <button
                                className={`categoria-btn ${categoriaAtiva === categoriasMap.calcas ? 'active' : ''}`}
                                onClick={() => handleCategoria(categoriasMap.calcas)}
                            >
                                <img src={calcasImg} alt="Calças" />
                                <p>calças</p>
                            </button>
                            <button
                                className={`categoria-btn ${categoriaAtiva === categoriasMap.calcados ? 'active' : ''}`}
                                onClick={() => handleCategoria(categoriasMap.calcados)}
                            >
                                <img src={calcadosImg} alt="Calçados" />
                                <p>calçados</p>
                            </button>
                            <button
                                className={`categoria-btn ${categoriaAtiva === categoriasMap.acessorios ? 'active' : ''}`}
                                onClick={() => handleCategoria(categoriasMap.acessorios)}
                            >
                                <img src={acessoriosImg} alt="Acessórios" />
                                <p>acessórios</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ConjAnuncio ConjAnuncioConfig">
                    <div className="Inferior">
                        {carregando && <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Carregando anúncios...</p>}
                        {erro && <p className="erro-anuncios" style={{ textAlign: 'center', width: '100%', padding: '20px', color: 'red' }}>{erro}</p>}
                        {!carregando && !erro && anuncios.length === 0 && (
                            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum anúncio encontrado</p>
                        )}
                        {!carregando && !erro && anuncios.map((anuncio) => (
                            <Anuncio
                                key={anuncio.id}
                                imgFundo={anuncio.imgFundo}
                                preco={anuncio.preco}
                                editar={false}
                                onClick={() => onCliqueAnuncio(anuncio)}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pesquisar;
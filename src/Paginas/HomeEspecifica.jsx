import Menu from '../Componentes/Menu';
import "../css/Home.css"
import "@radix-ui/themes/styles.css";
import React, {useState, useEffect} from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";

import Anuncio from "../Componentes/ConjAnuncio/Anuncio";
import Carrinho from "../Componentes/Carrinho";
import "../Componentes/Css/ConteudoHomePadrao.css"
import {useNavigate} from "react-router-dom";
import api from "../services/authApi";

import FundoHome from "../Imagens/DetalheFundo.png";
import imgFundoTituloCamisetas from "../Imagens/FundoConjCamisetas2.png";
import imgFundoTituloCasacos from "../Imagens/FundoConjCasacos2.png";
import imgFundoTituloCalcas from "../Imagens/FundoConjCalcas2.png";
import imgFundoTituloCalcados from "../Imagens/FundoConjCalcados.png";
import imgFundoTituloAcessorios from "../Imagens/FundoConjAcessorios.png";

import imgAnuncioCamiseta from "../Imagens/AnuncioCamisa.png";
import imgAnuncioCasaco from "../Imagens/AnuncioCasaco.png";
import imgAnuncioCalca from "../Imagens/AnuncioCalca.png";
import imgAnuncioCalcado from "../Imagens/AnuncioCalcado.png";
import imgAnuncioAcessorio from "../Imagens/AnuncioAcessorio.png";

const CATEGORIA_MAP = {
    "CAMISETAS": "shirt",
    "CASACOS": "coat",
    "CALÇAS": "pants",
    "CALÇADOS": "shoes",
    "ACESSÓRIOS": "accessories"
};

const Home = ({tipoEspec}) => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const navigate = useNavigate();
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [quantidadeExibida, setQuantidadeExibida] = useState(10);

    const imgFundoTitulo =
        tipoEspec === "CAMISETAS" ? imgFundoTituloCamisetas :
            tipoEspec === "CASACOS" ? imgFundoTituloCasacos :
                tipoEspec === "CALÇAS" ? imgFundoTituloCalcas :
                    tipoEspec === "CALÇADOS" ? imgFundoTituloCalcados :
                        tipoEspec === "ACESSÓRIOS" ? imgFundoTituloAcessorios : "";

    const imgAnuncioFallback =
        tipoEspec === "CAMISETAS" ? imgAnuncioCamiseta :
            tipoEspec === "CASACOS" ? imgAnuncioCasaco :
                tipoEspec === "CALÇAS" ? imgAnuncioCalca :
                    tipoEspec === "CALÇADOS" ? imgAnuncioCalcado :
                        tipoEspec === "ACESSÓRIOS" ? imgAnuncioAcessorio : "";

    useEffect(() => {
        const buscarAnuncios = async () => {
            const categoriaIngles = CATEGORIA_MAP[tipoEspec];
            if (!categoriaIngles) {
                console.error("Categoria não mapeada:", tipoEspec);
                setCarregando(false);
                return;
            }

            try {
                const response = await api.get(`/listings/category/${categoriaIngles}`);
                setAnuncios(response.data || []);
            } catch (err) {
                console.error("Erro ao buscar anúncios:", err);
                setAnuncios([]);
            } finally {
                setCarregando(false);
            }
        };

        buscarAnuncios();
    }, [tipoEspec]);

    const adicionarAnuncio = () => {
        setQuantidadeExibida((prev) => prev + 10);
    };

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
            <main className="Conteudo divHomePadrao" style={{backgroundImage: `url(${FundoHome})`}}>
                <div className="FundoHamburguerCarrinho"></div>
                <Carrinho className="Clicavel"/>
                <div className="ConjAnuncio">
                    <div className="Superior" style={{ backgroundImage: `url(${imgFundoTitulo})` }}>
                        <div className="ConjAnuncioTitulo">
                            <h2 className="bold">{tipoEspec}</h2>
                        </div>
                    </div>
                    <div className="Inferior">
                        {carregando ? (
                            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Carregando...</p>
                        ) : anuncios.length > 0 ? (
                            anuncios.slice(0, quantidadeExibida).map((anuncio) => {
                                const imagemPrincipal = anuncio.medias && anuncio.medias.length > 0
                                    ? anuncio.medias.sort((a, b) => a.position - b.position)[0].url
                                    : imgAnuncioFallback;

                                const precoReais = (anuncio.price_cents / 100).toFixed(2);

                                return (
                                    <Anuncio
                                        key={anuncio.id}
                                        preco={precoReais}
                                        imgFundo={imagemPrincipal}
                                        onClick={() => onCliqueAnuncio(anuncio)}
                                    />
                                );
                            })
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum anúncio encontrado</p>
                        )}
                    </div>
                </div>
                {!carregando && anuncios.length > quantidadeExibida && (
                    <button className="btnAdicionarAnuncio" onClick={adicionarAnuncio} type="button">
                        Ver mais
                    </button>
                )}
            </main>
        </div>
    );
};

export default Home;
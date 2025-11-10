
import Menu from '../Componentes/Menu';
import "../css/Home.css"
import "@radix-ui/themes/styles.css";
import React, {useState, useEffect} from 'react';
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";

import ConjAnuncio from "../Componentes/ConjAnuncio/ConjAnuncio";
import Carrinho from "../Componentes/Carrinho";
import "../Componentes/Css/ConteudoHomePadrao.css"
import {useNavigate, useSearchParams} from "react-router-dom";

// Puxar do Banco

// Importar do banco
import FundoHome from "../Imagens/DetalheFundo.png";
import iconeInicio from "../Imagens/Fundo-Btn.png";
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

import imgTituloCamisetas from "../Imagens/Anuncio_Titulo_1.png";
import imgTituloCasacos from "../Imagens/AnuncioTituloCasacos1.png";
import imgTituloCalcas from "../Imagens/AnuncioTituloCalcas1.png";
import imgTituloCalcados from "../Imagens/AnuncioTituloCalcados1.png";
import imgTituloAcessorios from "../Imagens/AnuncioTituloAcessorios1.png";

const Home = ({tipoEspec}) => {

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const navigate = useNavigate();
    const [anunciosAdicionados, setAnunciosAdicionados] = useState([]);

    const adicionarAnuncio = () => {
        setAnunciosAdicionados((prevAnuncios) => [
            ...prevAnuncios,
            <ConjAnuncio key={prevAnuncios.length} func="add" imgAnuncio={
                tipoEspec === "CAMISETAS" ? imgAnuncioCamiseta :
                    tipoEspec === "CASACOS" ? imgAnuncioCasaco :
                        tipoEspec === "CALÇAS" ? imgAnuncioCalca :
                            tipoEspec === "CALÇADOS" ? imgAnuncioCalcado :
                                tipoEspec === "ACESSÓRIOS" ? imgAnuncioAcessorio :
                                    imgAnuncioAcessorio
            } />
        ]);
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo divHomePadrao" style={{backgroundImage: `url(${FundoHome})`}}>
                <div className="FundoHamburguerCarrinho">
                </div>
                <Carrinho className="Clicavel"/>
                <>
                    {tipoEspec === "CAMISETAS" ?
                        <ConjAnuncio titulo="CAMISETAS" imgFundoTitulo={imgFundoTituloCamisetas} imgTitulo={imgTituloCamisetas}  imgAnuncio={imgAnuncioCamiseta}/> :
                        tipoEspec === "CASACOS" ?
                            <ConjAnuncio titulo="CASACOS" imgFundoTitulo={imgFundoTituloCasacos} imgTitulo={imgTituloCasacos}   imgAnuncio={imgAnuncioCasaco}/> :
                            tipoEspec === "CALÇAS" ?
                                <ConjAnuncio titulo={tipoEspec} imgFundoTitulo={imgFundoTituloCalcas}  imgTitulo={imgTituloCalcas}   imgAnuncio={imgAnuncioCalca}/> :
                                tipoEspec === "CALÇADOS" ?
                                    <ConjAnuncio titulo={tipoEspec} imgFundoTitulo={imgFundoTituloCalcados}  imgTitulo={imgTituloCalcados}  imgAnuncio={imgAnuncioCalcado}/> :
                                    tipoEspec === "ACESSÓRIOS" ?
                                        <ConjAnuncio titulo={tipoEspec} imgFundoTitulo={imgFundoTituloAcessorios}  imgTitulo={imgTituloAcessorios} imgAnuncio={imgAnuncioAcessorio}/> :
                                        null
                    }
                    {anunciosAdicionados.map((anuncio) => anuncio)}
                    <button className="btnAdicionarAnuncio" onClick={adicionarAnuncio} type="submit">Ver mais</button>
                </>
            </main>
        </div>


    );
};

export default Home;
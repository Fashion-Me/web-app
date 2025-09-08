import React, {useState} from 'react';
import {MapPinned, ShoppingCart, MapPin} from 'lucide-react';
import ConjAnuncio from "./ConjAnuncio/ConjAnuncio";
import Carrinho from "./Carrinho";
import "./Css/ConteudoHomePadrao.css"
import {useNavigate, useSearchParams} from "react-router-dom";

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

const ConteudoHomePadrao = ({local, tipo, tipoEspecifico}) => {
    const navigate = useNavigate();
    const [anunciosAdicionados, setAnunciosAdicionados] = useState([]);

    const adicionarAnuncio = () => {
        setAnunciosAdicionados((prevAnuncios) => [
            ...prevAnuncios,
            <ConjAnuncio key={prevAnuncios.length} func="add" imgAnuncio={
                tipoEspecifico === "CAMISETAS" ? imgAnuncioCamiseta :
                    tipoEspecifico === "CASACOS" ? imgAnuncioCasaco :
                        tipoEspecifico === "CALÇAS" ? imgAnuncioCalca :
                            tipoEspecifico === "CALÇADOS" ? imgAnuncioCalcado :
                                tipoEspecifico === "ACESSÓRIOS" ? imgAnuncioAcessorio :
                                    imgAnuncioAcessorio
            } />
        ]);
    };
    return (
        <main className="Conteudo divHomePadrao" style={{backgroundImage: `url(${FundoHome})`}}>
            <div className="FundoHamburguerCarrinho">
            </div>
            <Carrinho className="Clicavel"/>
            {tipo === "" &&
                <>
                    <div
                        className="btnAnunciar"
                        style={{backgroundImage: `url(${iconeInicio})`}}
                        onClick={() => {
                            navigate(`/?tipoUsuario`)
                        }}
                    >
                        <h2 className="bold">ANUNCIE AQUI SUAS ROUPAS NA FASHION</h2>
                    </div>
                    <ConjAnuncio titulo="CAMISETAS" imgFundoTitulo={imgFundoTituloCamisetas}    imgTitulo={imgTituloCamisetas}    imgAnuncio={imgAnuncioCamiseta}/>
                    <ConjAnuncio titulo="CASACOS"   imgFundoTitulo={imgFundoTituloCasacos}      imgTitulo={imgTituloCasacos}    imgAnuncio={imgAnuncioCasaco}/>
                    <ConjAnuncio titulo="CALÇAS"    imgFundoTitulo={imgFundoTituloCalcas}       imgTitulo={imgTituloCalcas}    imgAnuncio={imgAnuncioCalca}/>
                    <ConjAnuncio titulo="CALÇADOS"  imgFundoTitulo={imgFundoTituloCalcados}     imgTitulo={imgTituloCalcados}    imgAnuncio={imgAnuncioCalcado}/>
                    <ConjAnuncio titulo="ACESSÓRIOS" imgFundoTitulo={imgFundoTituloAcessorios}  imgTitulo={imgTituloAcessorios}    imgAnuncio={imgAnuncioAcessorio}/>
        </>
}
            {tipo === "Especifica" && (
                <>
                    {tipoEspecifico === "CAMISETAS" ?
                        <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCamisetas} imgTitulo={imgTituloCamisetas}  imgAnuncio={imgAnuncioCamiseta}/> :
                        tipoEspecifico === "CASACOS" ?
                            <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCasacos} imgTitulo={imgTituloCasacos}   imgAnuncio={imgAnuncioCasaco}/> :
                            tipoEspecifico === "CALÇAS" ?
                                <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCalcas}  imgTitulo={imgTituloCalcas}   imgAnuncio={imgAnuncioCalca}/> :
                                tipoEspecifico === "CALÇADOS" ?
                                    <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCalcados}  imgTitulo={imgTituloCalcados}  imgAnuncio={imgAnuncioCalcado}/> :
                                    tipoEspecifico === "ACESSÓRIOS" ?
                                        <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloAcessorios}  imgTitulo={imgTituloAcessorios} imgAnuncio={imgAnuncioAcessorio}/> :
                                        null
                    }
                    {anunciosAdicionados.map((anuncio) => anuncio)}
                    <button className="btnAdicionarAnuncio" onClick={adicionarAnuncio} type="submit">Ver mais</button>
                </>
            )}

        </main>
    );
};

export default ConteudoHomePadrao;
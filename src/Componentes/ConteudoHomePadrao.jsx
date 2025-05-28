import React, {useState} from 'react';
import {MapPinned, ShoppingCart} from 'lucide-react';
import ConjAnuncio from "./ConjAnuncio/ConjAnuncio";
import "./Css/ConteudoHomePadrao.css"
import {useNavigate} from "react-router-dom";

// Importar do banco
import FundoHome from "../Imagens/DetalheFundo.png";
import iconeInicio from "../Imagens/Fundo-Btn.png";
import fotoPerfil from "../Imagens/FotoPerfil.png";
import imgFundoTitulo from "../Imagens/FundoConjCamisetas.png";
import imgFundoTituloCamisetas from "../Imagens/FundoConjCamisetas.png";
import imgFundoTituloCasacos from "../Imagens/FundoConjCasacos.png";
import imgFundoTituloCalcas from "../Imagens/FundoConjCalcas.png";
import imgFundoTituloCalcados from "../Imagens/FundoConjCalcados.png";
import imgFundoTituloAcessorios from "../Imagens/FundoConjAcessorios.png";
import imgAnuncioCamiseta from "../Imagens/AnuncioCamisa.png";
import imgAnuncioCasaco from "../Imagens/AnuncioCasaco.png";
import imgAnuncioCalca from "../Imagens/AnuncioCalca.png";
import imgAnuncioCalcado from "../Imagens/AnuncioCalcado.png";
import imgAnuncioAcessorio from "../Imagens/AnuncioAcessorio.png";

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
            <div className="divLocal">
                <MapPinned className="iconelocal" stroke={"#4066FF"}/>
                <p> {local} </p>
            </div>
            <div className='divCarinho'>
                <div className="imgPerfil"><img src={fotoPerfil} alt="Foto de Perfil"/></div>
                <div className="IconeCarinho"><ShoppingCart stroke={"#fefefe"}/></div>
            </div>
            {tipo === "" &&
                <>
                    <div
                        className="btnAnunciar"
                        style={{backgroundImage: `url(${iconeInicio})`}}
                        onClick={() => {
                            navigate("/")
                        }}
                    >
                        <p>ANUNCIE AQUI SUAS ROUPAS NA FASHION</p>
                    </div>
                    <ConjAnuncio titulo="CAMISETAS" imgFundoTitulo={imgFundoTituloCamisetas}    imgAnuncio={imgAnuncioCamiseta}/>
                    <ConjAnuncio titulo="CASACOS"   imgFundoTitulo={imgFundoTituloCasacos}      imgAnuncio={imgAnuncioCasaco}/>
                    <ConjAnuncio titulo="CALÇAS"    imgFundoTitulo={imgFundoTituloCalcas}       imgAnuncio={imgAnuncioCalca}/>
                    <ConjAnuncio titulo="CALÇADOS"  imgFundoTitulo={imgFundoTituloCalcados}     imgAnuncio={imgAnuncioCalcado}/>
                    <ConjAnuncio titulo="ACESSÓRIOS" imgFundoTitulo={imgFundoTituloAcessorios}  imgAnuncio={imgAnuncioAcessorio}/>
                </>
            }

            {tipo === "Especifica" && (
                <>
                    {tipoEspecifico === "CAMISETAS" ?
                        <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCamisetas} imgAnuncio={imgAnuncioCamiseta}/> :
                        tipoEspecifico === "CASACOS" ?
                            <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCasacos} imgAnuncio={imgAnuncioCasaco}/> :
                            tipoEspecifico === "CALÇAS" ?
                                <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCalcas} imgAnuncio={imgAnuncioCalca}/> :
                                tipoEspecifico === "CALÇADOS" ?
                                    <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloCalcados} imgAnuncio={imgAnuncioCalcado}/> :
                                    tipoEspecifico === "ACESSÓRIOS" ?
                                        <ConjAnuncio titulo={tipoEspecifico} imgFundoTitulo={imgFundoTituloAcessorios} imgAnuncio={imgAnuncioAcessorio}/> :
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
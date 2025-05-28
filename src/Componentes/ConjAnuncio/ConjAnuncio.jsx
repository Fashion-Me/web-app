import React, {useState} from 'react';
import Anuncio from './Anuncio';
import "./Anuncio.css"

// Importar do Banco
import Logo from "../Menu/Imagens/LogoTexto.png";
import AnuncioTituloCamisa_1 from "../../Imagens/Anuncio_Titulo_1.png"
import AnuncioCamisa from "../../Imagens/AnuncioCamisa.png"
import {useNavigate} from "react-router-dom";

export default (params) => {
    const navigate = useNavigate();

    function onNavegacaoConjAnuncio() {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('titulo', params.titulo);
        navigate(`/homeEspecifica?${queryParams.toString()}`);
    }

    return(
        <div className="ConjAnuncio">
            {params.func !== "add" && (
                <div className="Superior" style={{ backgroundImage: `url(${params.imgFundoTitulo})` }} onClick={() => onNavegacaoConjAnuncio()}>
                    <div className="ConjAnuncioTitulo">
                        <h2> {params.titulo} </h2>
                    </div>
                    <div className="ConjAnuncioAnuncios">
                        <div className="ConjAnuncioAnunciosEsquerda">
                            <Anuncio imgFundo={AnuncioTituloCamisa_1}/>
                            <Anuncio imgFundo={AnuncioTituloCamisa_1}/>
                        </div>
                        <div className="ConjAnuncioAnunciosDireita">
                            <Anuncio imgFundo={AnuncioTituloCamisa_1}/>
                        </div>
                    </div>
                </div>
            )}
            <div className="Inferior">
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
            </div>
        </div>
    );
};
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
        <div className="ConjAnuncio" >
            {params.func !== "add" && (
                <div className="Superior Clicavel" style={{ backgroundImage: `url(${params.imgFundoTitulo})` }} onClick={() => onNavegacaoConjAnuncio()}>
                    <div className="ConjAnuncioTitulo">
                        <h2 className="bold"> {params.titulo} </h2>
                    </div>
                </div>
            )}
            <div className="Inferior">
                <Anuncio preco={12} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={40} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={200} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={25} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={80} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={1200} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={2} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={7} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={600} imgFundo={params.imgAnuncio}/>
                <Anuncio preco={370} imgFundo={params.imgAnuncio}/>
            </div>
        </div>
    );
};
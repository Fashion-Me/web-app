import React from 'react';
import { MapPinned, ShoppingCart } from 'lucide-react';
import iconeInicio from "../Imagens/Fundo-Btn.png";
import fotoPerfil from "../Imagens/FotoPerfil.png";
import ConjAnuncio from "./ConjAnuncio/ConjAnuncio";
import "./Css/ConteudoHomePadrao.css"

const ConteudoHomePadrao = ({ local, tituloAnuncio }) => {
    return (
        <div className="divHomePadrao">
            <div className="divLocal">
                <MapPinned stroke={"#4066FF"} />
                <p> {local} </p>
            </div>
            <div className='divCarinho'>
                <div className="imgPerfil"><img src={fotoPerfil} alt="Foto de Perfil" /></div>
                <div className="IconeCarinho"><ShoppingCart /></div>
            </div>
            <div
                className="btnAnunciar"
                style={{ backgroundImage: `url(${iconeInicio})` }}
            >
                <p>ANUNCIE AQUI SUAS ROUPAS NA FASHION</p>
            </div>
            <ConjAnuncio titulo={tituloAnuncio} />
        </div>
    );
};

export default ConteudoHomePadrao;
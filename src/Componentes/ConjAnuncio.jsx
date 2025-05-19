import React, {useState} from 'react';
import Anuncio from './ConjAnuncio/Anuncio';
import Logo from "./Menu/Imagens/LogoTexto.png";
import Aba from "./Menu/Aba";
import {Bell, House, Mail, Search, Settings, TriangleAlert, User} from "lucide-react";

export default (params) => {
    return(
        <div className="ConjAnuncio">
            <div className="Superior">
                <div className="ConjAnuncio-Titulo">
                    <h2> {params.titulo} </h2>
                </div>
                <div className="ConjAnuncio-Anuncios">
                    <div>

                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>

                </div>
            </div>
            <div className="Inferior">
                <Anuncio
                    preco={12}
                    //selecionado={abaSelecionada === "Inicio"}
                    //onClick={() => handleSelecionarAba("Inicio")}
                />
            </div>
        </div>
    );
};
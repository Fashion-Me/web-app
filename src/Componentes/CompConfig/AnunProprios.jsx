import React, {useRef, useState} from 'react';
import Anuncio from '../ConjAnuncio/Anuncio';
import './CompConfig.css';

/*   */

import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";
import {SquarePen} from "lucide-react"; // Importe a imagem real

const AnunciosCurtidos = () => {
    const anunciosCurtidos = Array(16).fill({
        preco: '14',
        imagem: imgAnuncioCamiseta, // Corrigido: agora contém o caminho direto da imagem
    });

    return (
        <>
            <div className="ConjAnuncio ConjAnuncioConfig" >
                <div className="Inferior">
                    {anunciosCurtidos.map((item, index) => (
                        <>
                            <Anuncio key={index} preco={item.preco} imgFundo={item.imagem} editar={true}/>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AnunciosCurtidos;
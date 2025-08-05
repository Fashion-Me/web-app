import React, {useRef, useState} from 'react';
import Anuncio from '../ConjAnuncio/Anuncio';
import './CompConfig.css';

/*   */

import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png"; // Importe a imagem real

const AnunciosCurtidos = () => {
    const anunciosCurtidos = Array(16).fill({
        preco: '14',
        imagem: imgAnuncioCamiseta, // Corrigido: agora contém o caminho direto da imagem
    });

    return (
        <div className="AreaConfig  container-editar-perfil">
            <h2 className="titulo">Anúncios curtidos</h2>
            <div className="ConjAnuncio" >
                <div className="Inferior">
                    {anunciosCurtidos.map((item, index) => (
                        <Anuncio key={index} preco={item.preco} imgFundo={item.imagem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnunciosCurtidos;


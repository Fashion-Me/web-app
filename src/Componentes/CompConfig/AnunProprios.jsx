import React, {useRef, useState} from 'react';
import Anuncio from '../ConjAnuncio/Anuncio';
import './CompConfig.css';

/*   */

import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";
import {SquarePen} from "lucide-react";
import CamisetaVermelha from "../../Imagens/CamisetaVermelha1.webp";
import imgPerfilVH from "../../Imagens/FotoPerfilVH.jpg";
import imgPerfil from "../../Imagens/FotoPerfil.png";
import imgAnuncioCasaco from "../../Imagens/AnuncioCasaco.png";
import imgAnuncioCalcado from "../../Imagens/AnuncioCalcado.png"; // Importe a imagem real

const AnunciosCurtidos = () => {
    const anunciosCurtidos = [
        {
            id: 1,
            preco: 45,
            fotoAnuncio: CamisetaVermelha ,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 2,
            preco: 50,
            fotoAnuncio: imgPerfilVH ,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 3,
            preco: 50,
            fotoAnuncio: imgPerfil,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 4,
            preco: 50,
            fotoAnuncio: imgAnuncioCamiseta ,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 5,
            preco: 50,
            fotoAnuncio: imgAnuncioCasaco ,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 6,
            preco: 50,
            fotoAnuncio: imgAnuncioCalcado,
            tituloAnuncio: "Conteúdo de cunho sexual, nudez",
        },
    ];

    return (
        <>
            <div className="ConjAnuncio ConjAnuncioConfig" >
                <div className="Inferior">
                    {anunciosCurtidos.map((item, index) => (
                        <>
                            <Anuncio key={index} preco={item.preco} imgFundo={item.fotoAnuncio} editar={true}/>
                        </>
                    ))}
                </div>
            </div>
            {/*<div className="lista-anunciosP">*/}
            {/*    {anunciosCurtidos.map((anuncio) => (*/}
            {/*    <Anuncio*/}
            {/*        key={anuncio.id}*/}
            {/*        preco={anuncio.preco}*/}
            {/*        tituloAnuncio={anuncio.tituloAnuncio}*/}
            {/*        imagemAnun={anuncio.fotoAnuncio}*/}
            {/*        editar={true}*/}
            {/*    />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    );
};

export default AnunciosCurtidos;
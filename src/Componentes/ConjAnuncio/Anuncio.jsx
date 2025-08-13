import React from 'react';
import "./Anuncio.css"
import {SquarePen} from "lucide-react";

export default (params) => {
    return (
        <div className="Anuncio Clicavel" style={{ backgroundImage: `url(${params.imgFundo})` }}>
            {params.preco && (
                <div className="divPreco">
                    <p className="semibold">R$ {params.preco}</p>
                </div>
            )}
            {params.editar && (<SquarePen size={40} strokeWidth={1.5} className="IconeEditar"/>)}
        </div>
    );
};
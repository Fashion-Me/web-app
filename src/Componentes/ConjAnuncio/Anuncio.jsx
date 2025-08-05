import React from 'react';
import "./Anuncio.css"

export default (params) => {
    return (
        <div className="Anuncio Clicavel" style={{ backgroundImage: `url(${params.imgFundo})` }}>
            {params.preco && (
                <div className="divPreco">
                    <p className="semibold">R$ {params.preco}</p>
                </div>
            )}
        </div>
    );
};
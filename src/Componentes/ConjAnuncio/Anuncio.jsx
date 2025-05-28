import React from 'react';
import "./Anuncio.css"

export default (params) => {
    return (
        <div className="Anuncio" style={{ backgroundImage: `url(${params.imgFundo})` }}>
            {params.preco && (
                <div className="divPreco">
                    <p>R$ {params.preco}</p>
                </div>
            )}
        </div>
    );
};
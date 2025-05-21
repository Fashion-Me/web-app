import React from 'react';

export default (params) => {
    return (
        <div className="Anuncio" style={{ backgroundImage: `url(${params.imgFundo})` }}>
            <div className="divPreco">
                <p>{params.preco}</p>
            </div>
        </div>
    );
};
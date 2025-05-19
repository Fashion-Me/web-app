import React from 'react';

export default (params) => {
    return (
        <div className="Anuncio">
            <div className="divPreco">
                <p>{params.preco}</p>
            </div>
        </div>
    );
};
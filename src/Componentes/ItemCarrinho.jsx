import React from 'react';


const ItemCarrinho = (params) => {
    return (
        <div className="ItemCarrinho">
            <img src={params.imgAnuncio} alt="Anuncio"/>
            <div className="DetalhesAnuncio">
                <h2 className="bold">{params.nomeProduto}</h2>
                <h3>{params.nomeVendedor}</h3>
                <h3>R${params.preco}</h3>
                <h3 className="bold" style={{ color: 'red', cursor: 'pointer' }}>EXCLUIR</h3>
            </div>
        </div>
    );
}

export default ItemCarrinho;
import React, { useState } from 'react';
import './ConfigMeusPedidos.css';
import foto1 from "../../Imagens/CamisaPretaLisa.jpg";
import foto2 from "../../Imagens/SapatoCouroMarrom.jpg";
import foto3 from "../../Imagens/CalcaPreta.webp";
import foto4 from "../../Imagens/AnuncioTituloCasacos1.png";
import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const itensCarrinho = [
        { imgAnuncio: foto1, nomeProduto: "Camisa preta lisa", nomeVendedor: "Caue Santos", preco: 45, frete: 15.00 },
        { imgAnuncio: foto2, nomeProduto: "Sapato de couro marrom", nomeVendedor: "Luiza mel", preco: 82, frete: 25.00 },
        { imgAnuncio: foto3, nomeProduto: "Calça preta", nomeVendedor: "Carlos biritno", preco: 65, frete: 18.00 },
        { imgAnuncio: foto4, nomeProduto: "Casaco preto para motos", nomeVendedor: "Fabricio antonio", preco: 83, frete: 14.00 }
    ];

    const handleVerEntrega = (item) => {
        console.log('Ver entrega do item:', item);
        navigate("/MeusPedidos")
    };

    return (
        <>
            <div className="listaPedidos">
                {itensCarrinho.map((item, index) => (
                    <div key={index} className="itemPedido">
                        <div className="infoPedido">
                            <img src={item.imgAnuncio} alt={item.nomeProduto} className="imagemProduto" />
                            <div className="detalhesPedido">
                                <h3>{item.nomeProduto}</h3>
                                <p className="vendedor">Vendedor: {item.nomeVendedor}</p>
                                <p className="preco">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                        <button
                            className="btnEntrega"
                            onClick={() => handleVerEntrega(item)}
                        >
                            Ver entrega
                        </button>
                    </div>
                ))}
            </div>
        </>


    );

};
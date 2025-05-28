import fotoPerfil from "../Imagens/FotoPerfil.png";
import imgAnuncioCamiseta from "../Imagens/Anuncio_Titulo_1.png";
import {ShoppingCart} from "lucide-react";
import React, {useState} from "react";
import {X, Check } from 'lucide-react';
import "./Css/Carrinho.css"
import ItemCarrinho from "./ItemCarrinho"

const Carrinho = () => {
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    return (
        <>
            {!carrinhoAberto ? (
                <div className='divCarinho' onClick={() => setCarrinhoAberto(true)}>
                    <div className="imgPerfil"><img src={fotoPerfil} alt="Foto de Perfil"/></div>
                    <div className="IconeCarinho"><ShoppingCart  stroke={"#fefefe"}/></div>
                </div>
            ) : (
                <div className='divCarrinhoAberto'>
                    <div className="TituloCarinho">
                        <h1>Carrinho</h1>
                        <X onClick={() => setCarrinhoAberto(false)}/>
                    </div>
                    <div className="ItensCarrinho">
                        <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                        <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                        <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                        <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                        <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                    </div>
                    <div className="ResultadoCarrinho">
                        <button><h2>Calcule seu frete aqui</h2><Check/></button>
                        <div>
                            <h2>Produtos:</h2>
                            <h2>R$ 75,00</h2>
                        </div>
                        <div>
                            <h2>Frete:</h2>
                            <h2>R$ 31,00</h2>
                        </div>
                        <div>
                            <h2>Total:</h2>
                            <h2>R$ 106,00</h2>
                        </div>
                    </div>
                    <button className="btnComprarAgora">Comprar agora</button>
                </div>
            )}
        </>
    );
};
export default Carrinho;


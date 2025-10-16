import React, { useState } from 'react';
import Menu from '../../Componentes/Menu';
import "./PagAnuncio.css"
import "@radix-ui/themes/styles.css";
import { useSearchParams } from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Heart, MessagesSquare, CircleAlert, ArrowLeft, ArrowRight, ShoppingCart, User } from 'lucide-react';

import FundoHome from "../../Imagens/DetalheFundo.png";
// Dados de exemplo do produto
import foto1 from '../../Imagens/FotoAnuncioTigrinho.png';
import foto2 from '../../Imagens/AnuncioCasaco.png';
import foto3 from '../../Imagens/camisetas.png';
import foto4 from '../../Imagens/FotoPerfil.png';
import foto5 from '../../Imagens/DetalheFoto_Note.png';
import Carrinho from "../../Componentes/Carrinho";

const produtoExemplo = {
    id: 1,
    titulo: "Camiseta tigrinho cea perfeita",
    preco: "R$ 80",
    descricao: "Camiseta de jogo duvidoso usado por 2 semanas tamanho G",
    imagens: [
        foto1,
        foto2,
        foto3,
        foto4,
        foto5,
    ]
};

const PagAnuncio = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);

    const proximaImagem = () => {
        setImagemAtual((prev) => (prev + 1) % produtoExemplo.imagens.length);
    };

    const imagemAnterior = () => {
        setImagemAtual((prev) => (prev - 1 + produtoExemplo.imagens.length) % produtoExemplo.imagens.length);
    };

    const selecionarImagem = (index) => {
        setImagemAtual(index);
    };

    return (
        <div className='PagAnuncio'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            {/*<div className="conteudo-anuncio" style={{backgroundImage: `url(${FundoHome})`}}>*/}
            <div className="conteudo-anuncio">
                <div className="FundoHamburguerCarrinho">
                </div>
                <Carrinho className="Clicavel"/>
                <div className="header-anuncio">
                    <button className="btn-voltar-Anuncio" onClick={() => window.history.back()}>
                        <ArrowLeft size={22} strokeWidth={3}/>
                        VOLTAR
                    </button>
                </div>
                <div className="main-content">
                    {/* Carrossel de imagens */}
                    <div className="carousel-container">
                        <div className="carousel-main">
                            <button onClick={imagemAnterior} className="carousel-btn prev">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="imagem-principal">
                                <img src={produtoExemplo.imagens[imagemAtual]} alt="Produto" />
                            </div>
                            <button onClick={proximaImagem} className="carousel-btn next">
                                <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Miniaturas */}
                        <div className="thumbnails">
                            {produtoExemplo.imagens.map((imagem, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${index === imagemAtual ? 'active' : ''}`}
                                    onClick={() => selecionarImagem(index)}
                                >
                                    <img src={imagem} alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ícones no meio */}
                    <div className="icons-middle">
                        <button className="icon-btn">
                            <Heart size={40} />
                        </button>
                        <button className="icon-btn">
                            <MessagesSquare size={40} />
                        </button>
                        <button className="icon-btn">
                            <CircleAlert size={40} />
                        </button>
                    </div>

                    {/* Informações do produto */}
                    <div className="produto-info">
                        <h1 className="produto-titulo">{produtoExemplo.titulo}</h1>
                        <p className="produto-preco">{produtoExemplo.preco}</p>

                        <div className="botoes-acao">
                            <button className="btn-comprar">
                                COMPRAR AGORA
                            </button>
                            <button className="btn-carrinho">
                                ADICIONAR AO CARRINHO
                            </button>
                        </div>

                        <div className="descricao-section">
                            <h3>Descrição do produto</h3>
                            <p className="produto-descricao">{produtoExemplo.descricao}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagAnuncio;

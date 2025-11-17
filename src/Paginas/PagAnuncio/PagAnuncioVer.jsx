import React, { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "./PagAnuncio.css"
import "@radix-ui/themes/styles.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Star, MessagesSquare, CircleAlert, ArrowLeft, ArrowRight, ShoppingCart, User, MapPin, X } from 'lucide-react';

import FundoHome from "../../Imagens/DetalheFundo.png";
import foto1 from '../../Imagens/CamisetaVermelha1.webp';
import foto2 from '../../Imagens/CamisetaVermelha2.webp';
import foto3 from '../../Imagens/CamisetaVermelha3.webp';
import foto4 from '../../Imagens/FotoPerfil.png';
import foto5 from '../../Imagens/DetalheFoto_Note.png';
import Carrinho from "../../Componentes/Carrinho";

const produtoExemplo = {
    id: 1,
    titulo: "Camisa vermelha AVENUE",
    preco: "R$ 450",
    descricao: "Apresentamos a Camisa Avenue vermelha, perfeita para adicionar um toque de estilo ao seu visual! Com um design moderno e vibrante, esta camisa é ideal para diversas ocasiões. Combine conforto e elegância com esta peça única.",
    tamanho: "GG",
    estado: "USADO",
    categoria: "CAMISETA",
    localizacao: "Av Brasil 700",
    imagens: [
        foto1,
        foto2,
        foto3,
    ]
};

const vendedorExemplo = {
    nome: "Luiz Ricardo",
    avatar: foto4,
    produtosAnunciados: 86,
    dataCriacao: "nov/2022"
};

const PagAnuncioVer = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false);
    const [opcaoDenuncia, setOpcaoDenuncia] = useState('');
    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(!isFavorited);
        // Adicione sua lógica aqui
        console.log('Favorito alterado:', !isFavorited);
    };
    const handleLinkVendedor = () => {
        navigate('/meuPerfil');
    };

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

                    <div className="icons-middle">
                        <button className="icon-btn">
                            <Star
                                size={40}
                                fill={isFavorited ? "#4066FF" : "none"}
                                stroke={isFavorited ? "#4066FF" : "currentColor"}
                                onClick={handleFavoriteClick}
                                style={{ cursor: 'pointer' }}
                            />
                        </button>
                        <button className="icon-btn">
                            <MessagesSquare size={40} />
                        </button>
                        <button className="icon-btn" onClick={() => setModalDenunciaAberto(true)}>
                            <CircleAlert size={40} />
                        </button>
                    </div>

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

                {/* Nova seção de informações adicionais */}
                <div className="info-adicional">
                    <div className="info-container">
                        {/* Informações do produto */}
                        <div className="info-produto">
                            <h3>Informações do produto</h3>
                            <div className="info-item">
                                <span className="info-label">Tamanho</span>
                                <span className="info-value">{produtoExemplo.tamanho}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Estado</span>
                                <span className="info-value">{produtoExemplo.estado}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Categoria</span>
                                <span className="info-value">{produtoExemplo.categoria}</span>
                            </div>
                        </div>

                        {/* Informações do vendedor */}
                        <div className="info-vendedor" onClick={handleLinkVendedor}>
                            <h3>Vendedor</h3>
                            <div className="vendedor-card">
                                <div className="vendedor-avatar">
                                    <img src={vendedorExemplo.avatar} alt={vendedorExemplo.nome} />
                                </div>
                                <div className="vendedor-detalhes">
                                    <div className="vendedor-nome">{vendedorExemplo.nome}</div>
                                    <div className="vendedor-stats">
                                        Produtos anunciados: <strong>{vendedorExemplo.produtosAnunciados}</strong>
                                    </div>
                                    <div className="vendedor-stats">
                                        Desde: <strong>{vendedorExemplo.dataCriacao}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Localização */}
                    {produtoExemplo?.localizacao ? (
                        <div className="info-localizacao">
                            <h3>Localização</h3>
                            <div className="localizacao-content">
                                <MapPin size={30} className="localizacao-icon" />
                                <span className="localizacao-texto">{produtoExemplo.localizacao}</span>
                            </div>
                        </div>
                    ) : null}
                    {modalDenunciaAberto && (
                        <div className="modal-overlay" onClick={() => setModalDenunciaAberto(false)}>
                            <div className="modal-denuncia" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <CircleAlert size={32} className="modal-icon" />
                                    <h2>Denunciar</h2>
                                    <button
                                        onClick={() => setModalDenunciaAberto(false)}
                                        style={{
                                            marginLeft: 'auto',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '8px'
                                        }}
                                    >
                                        <X size={32}  cor={'#efefef'} />
                                    </button>
                                </div>

                                <p className="modal-descricao">
                                    Sua denúncia é anônima e não será notificada para a loja referente ao anúncio
                                </p>

                                <div className="modal-opcoes">
                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="sexual"
                                            checked={opcaoDenuncia === 'sexual'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo de cunho sexual, nudez
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="golpe"
                                            checked={opcaoDenuncia === 'golpe'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo se trata à um golpe
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="ilicito"
                                            checked={opcaoDenuncia === 'ilicito'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo ilícito, fora da lei
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="pejorativo"
                                            checked={opcaoDenuncia === 'pejorativo'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo pejorativo ou referente a política
                                    </label>
                                </div>

                                <div className="modal-botoes">
                                    <button
                                        className="btn-confirmar"
                                        disabled={!opcaoDenuncia}
                                        onClick={() => {
                                            // Aqui você enviaria a denúncia para a API
                                            console.log('Denúncia:', opcaoDenuncia);
                                            setModalDenunciaAberto(false);
                                            setOpcaoDenuncia('');
                                        }}
                                    >
                                        CONFIRMAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PagAnuncioVer;

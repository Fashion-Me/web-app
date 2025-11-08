import React, { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../PagAnuncio/PagAnuncio.css"
import "./ModeracaoEspecAnun.css"
import PerfilHistorico from './Components/PerfilHistorico';
import "@radix-ui/themes/styles.css";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Star, MessagesSquare, CircleAlert, ArrowLeft, ArrowRight, ShoppingCart, User, MapPin, X } from 'lucide-react';

import FundoHome from "../../Imagens/DetalheFundo.png";
import foto1 from '../../Imagens/FotoAnuncioTigrinho.png';
import foto2 from '../../Imagens/AnuncioCasaco.png';
import foto3 from '../../Imagens/camisetas.png';
import foto4 from '../../Imagens/FotoPerfil.png';
import foto5 from '../../Imagens/DetalheFoto_Note.png';
import Carrinho from "../../Componentes/Carrinho";
import {useNavigate} from "react-router-dom";

const produtoExemplo = {
    id: 1,
    titulo: "Camiseta tigrinho cea perfeita",
    imagens: [
        foto1,
        foto2,
        foto3,
        foto4,
        foto5,
    ]
};

const vendedorExemplo = {
    nome: "Luiz Ricardo",
    avatar: foto4,
    produtosAnunciados: 534,
    dataCriacao: "nov/2022"
};


const ModeracaoEspecAnun = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [menuHistorico, setMenuHistorico] = useState("PERFIL");
    const [modalPenaAberto, setModalPenaAberto] = useState(false);
    const [opcaoPena, setOpcaoPena] = useState('');
    const navigate = useNavigate();

    const denunciasExemplo = [
        "1111111111111111111111111111Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Post com o título \"Outfit de Bolsonaro\" denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política",
        "Perfil denunciado por conteúdo pejorativo ou referente a política"
    ];

    const proximaImagem = () => {
        setImagemAtual((prev) => (prev + 1) % produtoExemplo.imagens.length);
    };

    const imagemAnterior = () => {
        setImagemAtual((prev) => (prev - 1 + produtoExemplo.imagens.length) % produtoExemplo.imagens.length);
    };

    const selecionarImagem = (index) => {
        setImagemAtual(index);
    };

    const handleVerPerfil = () => {
        // Navegar para o perfil
        console.log("Ver perfil");
        navigate(`/moderacao/especPerfil`);
    };

    return (
        <div className='PagAnuncio'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} acesso={"mod"}/>
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

                    <div className="produto-info">
                        <h1 className="produto-titulo">{produtoExemplo.titulo}</h1>
                        <p className="produto-preco"></p>

                        <div className="botoes-acao">
                            <button id="btnPunir" onClick={() => setModalPenaAberto(true)}>
                                MUDAR PENALIDADE
                            </button>
                            <button id="btnExcluir">
                                EXCLUIR ANÚNCIO
                            </button>
                        </div>
                        <div className="descricao-section">
                            <div className="info-vendedor" onClick={handleVerPerfil}>
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
                    </div>
                </div>
                <div className="info-adicional">
                    <PerfilHistorico
                        denuncias={denunciasExemplo}
                        menuAtivo={menuHistorico}
                        setMenuAtivo={setMenuHistorico}
                    />
                </div>
                {modalPenaAberto && (
                    <div className="modalOverlay" onClick={() => setModalPenaAberto(false)}>
                        <div className="modalPena" onClick={(e) => e.stopPropagation()}>
                            <div className="modalHeader">
                                <h2 className="textoBranco">Mudar Pena</h2>
                                <button
                                    onClick={() => setModalPenaAberto(false)}
                                    className="btnFecharModal"
                                >
                                    <X size={32}  cor={'#efefef'} />
                                </button>
                            </div>

                            <p className="modalDescricao">
                                'Pena' se refere aos tipos de punições que a conta irá sofrer, podendo ser aplicado o baniento temporário ou permanente
                            </p>

                            <div className="modalOpcoes">
                                <label className="opcaoPena">
                                    <input
                                        type="radio"
                                        name="pena"
                                        value="permanente"
                                        checked={opcaoPena === 'permanente'}
                                        onChange={(e) => setOpcaoPena(e.target.value)}
                                    />
                                    <p className={opcaoPena === 'permanente' ? 'textoVermelho' : 'textoBranco'}>
                                        Banimento Permanente
                                    </p>
                                </label>

                                <label className="opcaoPena">
                                    <input
                                        type="radio"
                                        name="pena"
                                        value="24h"
                                        checked={opcaoPena === '24h'}
                                        onChange={(e) => setOpcaoPena(e.target.value)}
                                    />
                                    <p className={opcaoPena === '24h' ? 'textoAzul' : 'textoBranco'}>
                                        Punido no periodo de 24h
                                    </p>
                                </label>

                                <label className="opcaoPena">
                                    <input
                                        type="radio"
                                        name="pena"
                                        value="72h"
                                        checked={opcaoPena === '72h'}
                                        onChange={(e) => setOpcaoPena(e.target.value)}
                                    />
                                    <p className={opcaoPena === '72h' ? 'textoAzul' : 'textoBranco'}>
                                        Punido no periodo de 72h
                                    </p>
                                </label>

                                <label className="opcaoPena">
                                    <input
                                        type="radio"
                                        name="pena"
                                        value="1semana"
                                        checked={opcaoPena === '1semana'}
                                        onChange={(e) => setOpcaoPena(e.target.value)}
                                    />
                                    <p className={opcaoPena === '1semana' ? 'textoAzul' : 'textoBranco'}>
                                        Punido no periodo de 1 semana
                                    </p>
                                </label>
                            </div>

                            <div className="modalBotoes">
                                <button
                                    className="btnConfirmar"
                                    disabled={!opcaoPena}
                                    onClick={() => {
                                        console.log('Pena aplicada:', opcaoPena);
                                        setModalPenaAberto(false);
                                        setOpcaoPena('');
                                    }}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModeracaoEspecAnun;

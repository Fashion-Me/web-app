import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from '../../Componentes/Menu';
import "../../css/Home.css";
import "../../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import "../../Componentes/CompConfig/CompConfig.css"
import "../../css/Configuracao.css"
import "../Pedidos/EnderecosNovos.css"
import "../Pedidos/EnderecosCadastrados.css"
import "../../Componentes/Css/Carrinho.css"
import "../MeusPedidos/StatusPagamento.css"

import api from "../../services/authApi";
import useAuth from "../../hooks/useAuth";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Search, UserRoundPen, Star, Megaphone, KeyRound, ShoppingBag, ArrowLeft, Check, ShoppingCart, X, ArrowRight } from "lucide-react";
import FundoHome from "../../Imagens/DetalheFundo.png";


import fotoPerfil from "../../Imagens/FotoPerfil.png";
import imgAnuncioCamiseta from "../../Imagens/Anuncio_Titulo_1.png";
import ItemCarrinho from "../../Componentes/ItemCarrinho"

const Configuracao = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const navigate = useNavigate();
    const [conteudoAtual, setConteudoAtual] = useState('StatusPedidos'); //pagina Padrao
    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true);
    const [mostrarAreaConfig, setMostrarAreaConfig] = useState(true);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Novo estado para o pop-up

    useEffect(() => {
        let previousWidth = window.innerWidth;

        const handleResize = () => {
            const currentWidth = window.innerWidth;

            if (currentWidth > 500) {
                setMostrarAbaConfig(true);
                setMostrarAreaConfig(true);
                setMostrarMenu(true);
            } else if (previousWidth > 500 && currentWidth <= 500) {
                setMostrarAreaConfig((prevState) => prevState ? false : prevState);
            }

            previousWidth = currentWidth;
        }
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='Home'>
            <main className="Conteudo" id="ConteudoConfig">
                {mostrarAbaConfig &&
                    <AbaConfig
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                    />
                }

                {mostrarAreaConfig &&
                    <AreaConfig
                        setConteudoAtual={setConteudoAtual}
                        conteudoAtual={conteudoAtual}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        mostrarAreaConfig={mostrarAreaConfig} // ← adicionado
                    />}


            </main>
        </div>
    );
};

export default Configuracao;

const AbaConfig = ({ setMostrarAbaConfig, setMostrarAreaConfig }) => (
    <div id="ResumoCompra">
        <div className='divResumoCompraAberto'>
            <div id='TopTitulo'>
                <div className="TituloResumoCompra">
                    <h1 style={{ fontWeight: "bold" }}>Resumo da Compra</h1>
                </div>
                <div className="divValoresPesquisa">
                    <h2 id='produtos'>Produtos:</h2>
                    <h2 id='preco'>R$ 75,00</h2>
                </div>
            </div>
            <div className="ItensComprados">
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
            </div>
            <div className="ResultadoResumoCompra">

                <div className="divMensagensPesquisa divConfigPesquisa">
                    {/*
                    <div className="barraPesquisa">
                        <input type="text" placeholder="Digite o seu CEP" />
                        <Check className="iconeLupa" size={24} color="#efefef" />
                    </div>
                    */}
                </div>
                <div className="divValoresColumn">
                    <div className='Frete'>
                        <h2>Frete Total:</h2>
                        <h2 className="bold">R$ 10,00</h2>
                    </div>
                    <div className='Frete'>
                        <h2>Frete 1:</h2>
                        <h2>R$ 10,00</h2>
                    </div>
                    <div className='Frete'>
                        <h2>Frete 2:</h2>
                        <h2>R$ 10,00</h2>
                    </div>
                </div>
                <div className="divValores">
                    <h2>Total:</h2>
                    <h2 className="bold">R$ 106,00</h2>
                </div>
                <div id='buttonResumo'>
                    <button
                        className="btnResumoCompra"
                        onClick={() => {
                            setMostrarAbaConfig(false);  // esconde a div ResumoCompra
                            setMostrarAreaConfig(true);  // mostra a div AreaTotal
                        }}
                    >
                        Próximo
                    </button>


                </div>
            </div>
        </div>
    </div>

);

const AreaConfig = ({
                        conteudoAtual,
                        setMostrarAbaConfig,
                        setMostrarAreaConfig,
                        setMostrarMenu,
                        setConteudoAtual,
                        mostrarAreaConfig // ← adicione aqui
                    }) => (

    <div className="AreaTotal" >
        {conteudoAtual === 'StatusPedidos' &&
            <StatusPedidos
                setConteudoAtual={setConteudoAtual}
                setMostrarAbaConfig={setMostrarAbaConfig}
                setMostrarAreaConfig={setMostrarAreaConfig}
                setMostrarMenu={setMostrarMenu}
                mostrarAreaConfig={mostrarAreaConfig} // ← adicionado
            />
        }

        {conteudoAtual === 'DevolucaoPedidos' &&
            <>
                <DevolucaoPedidos
                    setConteudoAtual={setConteudoAtual}
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />
            </>
        }
    </div>
);


const StatusPedidos = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const [concorda, setConcorda] = useState(false);

    return (
        <div className="AreaTotal">
            <div className="divEspacoTodo">
                <div className="linesstatus">
                    <div className="line line1"></div>
                    <div className="line line2Finalizar"></div>
                </div>
                <div className="areaTermos">
                    <div className="textoTermos">
                        <h3 className='HBOLD'>28 SET/2025</h3>
                        <p>
                            Pedido entregue ao destinatário: João Guilherme, o destinatário tem um período de 6 (seis) dias
                            corridos para solicitar a devolução do item, relembrando que qualquer dano ao produto impossibilita
                            a devolução do item!
                        </p>

                        <h3 className='HBOLD'>27 SET/2025</h3>
                        <p>
                            Pedido em processo de entrega ao destinatário, o destinatário tem um período de 6 (seis) dias
                            corridos para solicitar a devolução do item, relembrando que qualquer dano ao produto impossibilita
                            a devolução do item!
                        </p>

                        <h3 className='HBOLD'>25 SET/2025</h3>
                        <p>
                            Pedido em processo de entrega ao destinatário, o destinatário tem um período de 6 (seis) dias
                            corridos para solicitar a devolução do item, relembrando que qualquer dano ao produto impossibilita
                            a devolução do item!
                        </p>
                    </div>
                </div>

                <div className="BotoesEndereco">
                    <button className="btnCancelar" onClick={() => setConteudoAtual("Home")}>
                        Voltar
                    </button>
                    <button
                        className="btnProximo"
                        onClick={() => setConteudoAtual("DevolucaoPedidos")}
                    >
                        Solicitar Devolução
                    </button>
                </div>

            </div>
        </div>
    );
};

const DevolucaoPedidos = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const [fotos, setFotos] = useState([null, null, null]);
    const [motivo, setMotivo] = useState("");

    const handleFotoChange = (index, file) => {
        const novasFotos = [...fotos];
        novasFotos[index] = file;
        setFotos(novasFotos);
    };

    const camposValidos = fotos.every(f => f !== null) && motivo.trim().length >= 100;

    return (
        <div className="AreaTotal">
            <div className="CondicoesRetorno">
                <div className="RetornoTopo">
                    <h3>3. Condições de Retorno</h3>
                    <p>
                        Os pedidos só poderão ser retornados dentro do prazo de <strong>6 dias</strong> e caso estejam em perfeitas condições.
                        Se o produto for danificado após o recebimento, não será possível realizar devolução ou troca.
                        Por isso, pedimos atenção e cuidado no manuseio dos itens.
                    </p>
                </div>

                <div className="RetornoFotos">
                    <label className="RetornoTitulo">FOTOS DO PRODUTO</label>
                    <div className="RetornoGridFotos">
                        {fotos.map((foto, index) => (
                            <label key={index} className="FotoBox">
                                {foto ? (
                                    <img
                                        src={URL.createObjectURL(foto)}
                                        alt={`foto-${index + 1}`}
                                        className="PreviewFoto"
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 5c1.65 0 3 1.35 3 3h5v11H4V8h5c0-1.65 1.35-3 3-3zm0 3c-.552 0-1 .447-1 1v1H9v2h2v1c0 .553.448 1 1 1s1-.447 1-1v-1h2v-2h-2V9c0-.553-.448-1-1-1zm0 11c3.309 0 6-2.691 6-6s-2.691-6-6-6-6 2.691-6 6 2.691 6 6 6z" />
                                    </svg>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="inputFoto"
                                    onChange={(e) => handleFotoChange(index, e.target.files[0])}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="RetornoMotivo">
                    <label className="RetornoTitulo">MOTIVO DA DEVOLUÇÃO</label>
                    <div className="TextareaWrapper">
                        <textarea
                            className="RetornoTextarea"
                            placeholder="Descreva detalhadamente o motivo da devolução..."
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                        <span className="ContadorChars">
                            {motivo.trim().length}/100
                        </span>
                    </div>
                </div>


                <div className="AlinhaBotao">
                    <div className="BotoesEndereco">
                        <button className="btnCancelar" onClick={() => setConteudoAtual("StatusPedidos")}>
                            Cancelar
                        </button>
                        <button
                            className={`btnProximo ${!camposValidos ? "desativado" : ""}`}
                            disabled={!camposValidos}
                            onClick={() => setConteudoAtual("SolicitacaoEnviada")}
                        >
                            Enviar Solicitação
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};
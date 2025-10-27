import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from '../../Componentes/Menu';
import "../../css/Home.css";
import "../../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import "../../Componentes/CompConfig/CompConfig.css"
import "../../css/Configuracao.css"
import "./EnderecosCadastrados.css"
import "../../Componentes/Css/Carrinho.css"

import api from "../../services/authApi";
import useAuth from "../../hooks/useAuth";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Search, UserRoundPen, Star, Megaphone, KeyRound, ShoppingBag, ArrowLeft, Check, ShoppingCart, X } from "lucide-react";
import FundoHome from "../../Imagens/DetalheFundo.png";


import fotoPerfil from "../../Imagens/FotoPerfil.png";
import imgAnuncioCamiseta from "../../Imagens/Anuncio_Titulo_1.png";

import ItemCarrinho from "../../Componentes/ItemCarrinho"

const Configuracao = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const navigate = useNavigate();
    const [conteudoAtual, setConteudoAtual] = useState('');
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
                    />
                }
                {mostrarAreaConfig &&
                    <AreaConfig
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                    />}
            </main>
        </div>
    );
};

export default Configuracao;

const AbaConfig = ({ }) => (
    <div id="divConfig">
        <div className='divCarrinhoAberto'>
            <div id='TopTitulo'>
                <div className="TituloCarinho">
                    <h1 style={{ fontWeight: "bold" }}>Resumo da Compra</h1>
                </div>
                <div className="divValoresPesquisa">
                    <h2 id='produtos'>Produtos:</h2>
                    <h2 id='preco'>R$ 75,00</h2>
                </div>
            </div>
            <div className="ItensCarrinho">
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
                <ItemCarrinho imgAnuncio={imgAnuncioCamiseta} nomeProduto="Camisa Branca" nomeVendedor="Victor Hugo" preco={40} />
            </div>
            <div className="ResultadoCarrinho">

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
            </div>
            {/*
            <button className="btnComprarAgora">Comprar agora</button>
            */}
        </div>
    </div>
);

const AreaConfig = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu }) => (
    <div className="AreaConfig" >
        <>
            <div className="divTituloArea">
                {window.innerWidth < 500 &&
                    <ArrowLeft size={30}
                               strokeWidth={2.5}
                               onClick={() => {
                                   setMostrarAreaConfig(false);
                                   setMostrarAbaConfig(true);
                                   setMostrarMenu(true)
                               }
                               }
                    />}
                <div className="lines">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                </div>
                <h2 className="titulo">Endereço(s) Cadastrado(s)</h2>
                <div className="Endereco"></div>
                <div className="Endereco"></div>
                <div className="BotoesEndereco">
                    <button className="btnCancelar">Cancelar</button>
                    <button className="btnProximo">Próximo</button>
                </div>

            </div>
        </>
    </div>
);

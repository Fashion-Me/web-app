import React, { useState } from 'react';
import { ArrowRight, Clock4  } from "lucide-react";
import './ModeracaoEspecPerfil.css';
import Menu from '../../Componentes/Menu';
import HamburgerComponentMod from '../../Componentes/Menu/HamburgerMod';
import useMenuTipo from "../../hooks/useMenuTipo";
import PerfilHistorico from './Components/PerfilHistorico';
import FundoHome from "../../Imagens/DetalheFundo.png";
import imgPerfil from "../../Imagens/FotoPerfil.png";
import {useNavigate} from "react-router-dom";

const ModeracaoEspecPerfil = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(true);
    const [menuHistorico, setMenuHistorico] = useState("PERFIL");
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const [modalPenaAberto, setModalPenaAberto] = useState(false);
    const [opcaoPena, setOpcaoPena] = useState('');
    const navigate = useNavigate();

    // Dados de exemplo
    const perfilDados = {
        foto: imgPerfil,
        nome: "Luiz Ricardo Rocha Lopes Lima",
        status: "Banido",
        numDenuncias: 55
    };

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

    const handleVerPerfil = () => {
        // Navegar para o perfil
        console.log("Ver perfil");
        navigate(`/moderacao/verPerfil`);
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu && (
                    <HamburgerComponentMod menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu tipo={menuTipo} acesso={"mod"} />
            )}
            <main className="Conteudo" id="mainEspecPerfil" style={{backgroundImage: `url(${FundoHome})`}}>
                <div className="FundoHamburguerCarrinho">
                </div>
                <div className="especPerfilContainer">
                    <div className="especHeader">
                        <h1>PERFIL</h1>
                        <button className="moderacaoBtnVoltar" onClick={() => window.history.back()}>
                            <ArrowRight size={32} />
                        </button>
                    </div>

                    <div className="perfilInfoContainer">
                        <div className="divInfoModPerfilFoto">
                            <img src={perfilDados.foto} alt={perfilDados.nome} className="perfilFotoGrande" />

                            <div className="modPerfilInfoBox">
                                <span className="infoLabel">nome do perfil</span>
                                <span className="infoValor">{perfilDados.nome}</span>
                            </div>
                        </div>
                        <div className="divInfoModPerfilDenun">
                            <div className="caixaStatus">
                                <span className="infoLabel">Status</span>
                                <span className="infoValor">{perfilDados.status}</span>
                            </div>

                            <div className="caixaDenuncias">
                                <span className="infoLabel">Denuncias</span>
                                <span className="infoValor">{perfilDados.numDenuncias}</span>
                            </div>

                            <button className="btnVerPerfil" onClick={handleVerPerfil}>
                                Ver Perfil
                            </button>

                            <button className="btnMudarPena" onClick={() => setModalPenaAberto(true)}>
                                Mudar Pena
                            </button>
                        </div>
                    </div>

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
                                    ×
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
            </main>
        </div>
    );
};

export default ModeracaoEspecPerfil;

import React, { useState } from 'react';
import Aba from "./Menu/Aba";
import Logo from "./Menu/Imagens/LogoTexto.png";
import logoSimples from "../Imagens/LogoSImples.png";
import "./Css/Menu.css";
import { House, Search, Mail, UserRound, TriangleAlert, Settings, Bell, ShieldAlert, UserRoundPlus } from 'lucide-react';
import { Link, Routes, useNavigate } from "react-router-dom";
import CaixaDeEntrada from "./Menu/CaixaDeEntrada";


export default (props) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);


    function onNavegacao(titulo) {
        const queryParams = new URLSearchParams(window.location.search);


        if (titulo === "Inicio") {
            navigate(`/home?pagDirecao=${titulo}`);
        } else if (titulo === "Pesquisar") {
            navigate(`/pesquisar?pagDirecao=${titulo}`);
        } else if (titulo === "Mensagens") {
            navigate(`/mensagens?pagDirecao=${titulo}`);
        } else if (titulo === "Perfil") {
            navigate(`/perfil?pagDirecao=${titulo}`);
        } else if (titulo === "Moderação") {
            navigate(`/moderacao?pagDirecao=${titulo}`);
        } else if (titulo === "Configuração") {
            navigate(`/configuracao?pagDirecao=${titulo}`);
        } else if (titulo === "Entrar") {
            navigate("/login");
        } else if (titulo === "Cadastrar") {
            navigate("/cadastro");
        }
        // Novas rotas para moderação
        else if (titulo === "Denuncias") {
            navigate(`/moderacao/denuncias`);
        } else if (titulo === "Banimentos") {
            navigate(`/moderacao/banimentos`);
        } else if (titulo === "Cadastro") {
            navigate("/moderacao/cadastro");
        }
    }

    // Define a aba inicial padrão com base no tipo de acesso
    const pagDirecao = queryParams.get("pagDirecao") || (props.acesso === "mod" ? "Denuncias" : "Inicio");
    const [abaSelecionada, setAbaSelecionada] = useState(pagDirecao);


    const [mostrarCaixaDeEntrada, setMostrarCaixaDeEntrada] = useState(false);

    const handleSelecionarAba = (titulo) => {
        if (titulo === "Notificação") {
            setMostrarCaixaDeEntrada((prevState) => !prevState);
        } else {
            setMostrarCaixaDeEntrada(false);
        }
        setAbaSelecionada(titulo);
    };

    // Renderização para o menu de MODERADOR
    if (props.acesso === "mod") {
        return (
            <>
                {props.tipo !== "simples" && (
                    <div className="Menu">
                        <div className="Superior">
                            <div className="logo partMenu">
                                {!props.children && <img src={Logo} alt="Logo Fashion-me" />}
                                {props.children && (
                                    <div className="divLogoHamburger">
                                        <div>{props.children}</div>
                                        <div><img src={Logo} alt="Logo Fashion-me" /></div>
                                    </div>
                                )}
                            </div>

                            <div className="conjAba partMenu">
                                <hr />
                                <Aba
                                    titulo="Denuncias"
                                    selecionado={abaSelecionada === "Denuncias"}
                                    onClick={() => {
                                        handleSelecionarAba("Denuncias");
                                        onNavegacao("Denuncias");
                                    }}
                                >
                                    <ShieldAlert/>
                                </Aba>
                                <hr />
                                <Aba
                                    titulo="Banimentos"
                                    selecionado={abaSelecionada === "Banimentos"}
                                    onClick={() => {
                                        handleSelecionarAba("Banimentos");
                                        onNavegacao("Banimentos");
                                    }}
                                >
                                    <UserRound/>
                                </Aba>
                                <hr />
                                <Aba
                                    titulo="Cadastro"
                                    selecionado={abaSelecionada === "Cadastro"}
                                    onClick={() => {
                                        handleSelecionarAba("Cadastro");
                                        onNavegacao("Cadastro");
                                    }}
                                >
                                    <UserRoundPlus/>
                                </Aba>
                                <hr />
                            </div>
                        </div>
                    </div>
                )}

                {props.tipo === "simples" && (
                    <div className="Menu MenuSimples">
                        <div className="Superior">
                            <div className="logo partMenu">
                                {!props.children && <img src={logoSimples} alt="Logo Fashion-me" />}
                                {props.children && (
                                    <div className="divLogoHamburger">
                                        <div>{props.children}</div>
                                        <div><img src={Logo} alt="Logo Fashion-me" /></div>
                                    </div>
                                )}
                            </div>
                            <div className="conjAba partMenu">
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Denuncias"}
                                    onClick={() => {
                                        handleSelecionarAba("Denuncias");
                                        onNavegacao("Denuncias");
                                    }}
                                >
                                    <ShieldAlert/>
                                </Aba>
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Banimentos"}
                                    onClick={() => {
                                        handleSelecionarAba("Banimentos");
                                        onNavegacao("Banimentos");
                                    }}
                                >
                                    <UserRound/>
                                </Aba>
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Cadastrar"}
                                    onClick={() => {
                                        handleSelecionarAba("Cadastrar");
                                        onNavegacao("Cadastrar");
                                    }}
                                >
                                    <UserRoundPlus/>
                                </Aba>
                                <hr />
                            </div>
                        </div>
                    </div>
                )}
                {/* A caixa de entrada de notificações pode ou não ser exibida para mods, mantido por segurança */}
                {mostrarCaixaDeEntrada && (
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexShrink: 0 }}>
                            <CaixaDeEntrada setMostrarCaixaDeEntrada={setMostrarCaixaDeEntrada}/>
                        </div>
                    </div>
                )}
            </>
        )
    }

    // Renderização padrão para usuários normais
    return (
        <>
            {props.tipo !== "simples" && (
                <div className="Menu">
                    <div className="Superior">
                        <div className="logo partMenu">
                            {!props.children && <img src={Logo} alt="Logo Fashion-me" />}
                            {props.children && (
                                <div className="divLogoHamburger">
                                    <div>{props.children}</div>
                                    <div><img src={Logo} alt="Logo Fashion-me" /></div>
                                </div>
                            )}
                        </div>

                        <div className="conjAba partMenu">
                            <hr />
                            <Aba
                                titulo="Inicio"
                                selecionado={abaSelecionada === "Inicio"}
                                onClick={() => {
                                    handleSelecionarAba("Inicio");
                                    onNavegacao("Inicio");
                                }}
                            >
                                <House />
                            </Aba>
                            <hr />
                            <Aba
                                titulo="Pesquisar"
                                selecionado={abaSelecionada === "Pesquisar"}
                                onClick={() => {
                                    handleSelecionarAba("Pesquisar");
                                    onNavegacao("Pesquisar");
                                }}
                            >
                                <Search />
                            </Aba>
                            <hr />
                            <Aba
                                titulo="Mensagens"
                                selecionado={abaSelecionada === "Mensagens"}
                                onClick={() => {
                                    handleSelecionarAba("Mensagens");
                                    onNavegacao("Mensagens");
                                }}
                            >
                                <Mail />
                            </Aba>
                            <hr />
                            <Aba
                                titulo="Perfil"
                                selecionado={abaSelecionada === "Perfil"}
                                onClick={() => {
                                    handleSelecionarAba("Perfil");
                                    onNavegacao("Perfil");
                                }}
                            >
                                <UserRound />
                            </Aba>
                        </div>
                    </div>
                    <div className="conjAba partMenu inferior">
                        <Aba
                            titulo="Notificação"
                            selecionado={abaSelecionada === "Notificação"}
                            onClick={() => {
                                handleSelecionarAba("Notificação");
                            }}
                        >
                            <Bell />
                        </Aba>
                        <hr />
                        <Aba
                            titulo="Configuração"
                            selecionado={abaSelecionada === "Configuração"}
                            onClick={() => {
                                handleSelecionarAba("Configuração");
                                onNavegacao("Configuração");
                            }}
                        >
                            <Settings />
                        </Aba>
                    </div>
                </div>
            )}

            {props.tipo === "simples" && (
                <div className="Menu MenuSimples">
                    <div className="Superior">
                        <div className="logo partMenu">
                            {!props.children && <img src={logoSimples} alt="Logo Fashion-me" />}
                            {props.children && (
                                <div className="divLogoHamburger">
                                    <div>{props.children}</div>
                                    <div><img src={Logo} alt="Logo Fashion-me" /></div>
                                </div>
                            )}
                        </div>
                        <div className="conjAba partMenu">
                            <hr />
                            <Aba
                                selecionado={abaSelecionada === "Inicio"}
                                onClick={() => {
                                    handleSelecionarAba("Inicio");
                                    onNavegacao("Inicio");
                                }}
                            >
                                <House />
                            </Aba>
                            <hr />
                            <Aba
                                selecionado={abaSelecionada === "Pesquisar"}
                                onClick={() => {
                                    handleSelecionarAba("Pesquisar");
                                    onNavegacao("Pesquisar");
                                }}
                            >
                                <Search />
                            </Aba>
                            <hr />
                            <Aba
                                selecionado={abaSelecionada === "Mensagens"}
                                onClick={() => {
                                    handleSelecionarAba("Mensagens");
                                    onNavegacao("Mensagens");
                                }}
                            >
                                <Mail />
                            </Aba>
                            <hr />
                            <Aba

                                selecionado={abaSelecionada === "Perfil"}
                                onClick={() => handleSelecionarAba("Perfil")}
                            >
                                <UserRound />
                            </Aba>
                        </div>
                    </div>
                    <div className="conjAba partMenu inferior">
                        <Aba

                            selecionado={abaSelecionada === "Notificação"}
                            onClick={() => handleSelecionarAba("Notificação")}
                        >
                            <Bell />
                        </Aba>
                        <hr />
                        <Aba

                            selecionado={abaSelecionada === "Configuração"}
                            onClick={() => {
                                handleSelecionarAba("Configuração");
                                onNavegacao("Configuração");
                            }}
                        >
                            <Settings />
                        </Aba>
                    </div>
                </div>
            )}
            {mostrarCaixaDeEntrada && (
                <div style={{ display: 'flex' }}>
                    <div style={{ flexShrink: 0 }}>
                        <CaixaDeEntrada setMostrarCaixaDeEntrada={setMostrarCaixaDeEntrada}/>
                    </div>
                </div>
            )}
        </>
    );
};
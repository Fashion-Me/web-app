import React, { useState } from 'react';
import Aba from "./Menu/Aba";
import Logo from "./Menu/Imagens/LogoTexto.png";
import logoSimples from "../Imagens/LogoSImples.png";
import "./Css/Menu.css";
import { House, Search, Mail, User, TriangleAlert, Settings, Bell } from 'lucide-react';
import { Link, Routes, useNavigate } from "react-router-dom";
import CaixaDeEntrada from "./Menu/CaixaDeEntrada";


export default (props) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const tipoUsuario = queryParams.get("tipoUsuario") || "convidado";

    function onNavegacao(titulo) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('tipoUsuario', tipoUsuario);

        if (titulo === "Inicio") {
            navigate(`/?tipoUsuario=${props.user}`);
        } else if (titulo === "Pesquisar") {
            navigate(`/pesquisar?tipoUsuario=${props.user}`);
        } else if (titulo === "Mensagens") {
            navigate(`/mensagens?tipoUsuario=${props.user}`);
        } else if (titulo === "Perfil") {
            navigate(`/perfil?tipoUsuario=${props.user}`);
        } else if (titulo === "Moderação") {
            navigate(`/moderacao?tipoUsuario=${props.user}`);
        } else if (titulo === "Notificação") {
            navigate("/notificacao");
        } else if (titulo === "Configuração") {
            navigate("/configuracao");
        } else if (titulo === "Entrar") {
            navigate("/login");
        } else if (titulo === "Cadastrar") {
            navigate("/cadastro");
        }
    }

    const [abaSelecionada, setAbaSelecionada] = useState("Inicio");
    const [mostrarCaixaDeEntrada, setMostrarCaixaDeEntrada] = useState(false);

    const handleSelecionarAba = (titulo) => {
        if (titulo === "Notificação") {
            setMostrarCaixaDeEntrada((prevState) => !prevState);
        } else {
            setMostrarCaixaDeEntrada(false);
        }
        setAbaSelecionada(titulo);
    };

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
                        {tipoUsuario == 'convidado' && (
                            <div className="Cadastro partMenu">
                                <div onClick={() => onNavegacao("Entrar")} className="CadEntrar">
                                    <p>Entrar</p>
                                </div>
                                <div onClick={() => onNavegacao("Cadastrar")} className="CadCad">
                                    <p>Cadastrar</p>
                                </div>
                            </div>
                        )}
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
                            {tipoUsuario !== 'convidado' && (
                                <>
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
                                        <User />
                                    </Aba>
                                </>
                            )}
                            {tipoUsuario === 'adm' && (
                                <>
                                    <hr />
                                    <Aba
                                        titulo="Moderação"
                                        selecionado={abaSelecionada === "Moderação"}
                                        onClick={() => handleSelecionarAba("Moderação")}
                                    >
                                        <TriangleAlert />
                                    </Aba>
                                </>
                            )}
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
                                onClick={() => handleSelecionarAba("Pesquisar")}
                            >
                                <Search />
                            </Aba>
                            <hr />
                            {tipoUsuario !== 'convidado' && (
                                <>
                                    <Aba
                                        selecionado={abaSelecionada === "Mensagens"}
                                        onClick={() => handleSelecionarAba("Mensagens")}
                                    >
                                        <Mail />
                                    </Aba>
                                    <hr />
                                    <Aba

                                        selecionado={abaSelecionada === "Perfil"}
                                        onClick={() => handleSelecionarAba("Perfil")}
                                    >
                                        <User />
                                    </Aba>
                                </>
                            )}
                            {tipoUsuario === 'adm' && (
                                <>
                                    <hr />
                                    <Aba

                                        selecionado={abaSelecionada === "Moderação"}
                                        onClick={() => handleSelecionarAba("Moderação")}
                                    >
                                        <TriangleAlert />
                                    </Aba>
                                </>
                            )}
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
                            onClick={() => handleSelecionarAba("Configuração")}
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

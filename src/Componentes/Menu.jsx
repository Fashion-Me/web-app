import React, {useLocation, useState } from 'react';
import Aba from "./Menu/Aba";
import Logo from "./Menu/Imagens/LogoTexto.png";
import logoSimples from "../Imagens/LogoSImples.png";
import "./Css/Menu.css";
import { House, Search, Mail, UserRound, TriangleAlert, Settings, Bell, ShieldAlert, UserRoundPlus, BookImage, BookA, BookUser,LogOut   } from 'lucide-react';
import { Link, Routes, useNavigate } from "react-router-dom";
import CaixaDeEntrada from "./Menu/CaixaDeEntrada";


export default (props) => {
    const navigate = useNavigate();


    function obterPagDirecao() {
        const urlAtual = window.location.pathname;

        if (urlAtual === "/home") {
            return "Inicio";
        } else if (urlAtual === "/pesquisar") {
            return "Pesquisar";
        } else if (urlAtual === "/mensagens") {
            return "Mensagens";
        } else if (urlAtual === "/meuPerfil" || urlAtual.includes("/perfil")) {
            return "Perfil";
        } else if (urlAtual === "/moderacao/perfils") {
            return "Perfils";
        } else if (urlAtual === "/moderacao/anuncios") {
            return "Anuncios";
        } else if (urlAtual === "/moderacao/posts") {
            return "Posts";
        } else if (urlAtual === "/moderacao/cadastro") {
            return "Cadastro";
        } else if (urlAtual.includes("/moderacao")) {
            return "Perfils";
        } else if (urlAtual.includes("/configuracao")) {
            return "Configuração";
        } else {
            return "Inicio";
        }
    }

    function onNavegacao(titulo) {
        if (titulo === "Inicio") {
            navigate(`/home`);
        } else if (titulo === "Pesquisar") {
            navigate(`/pesquisar`);
        } else if (titulo === "Mensagens") {
            navigate(`/mensagens`);
        } else if (titulo === "Perfil") {
            navigate(`/meuPerfil`);
        } else if (titulo === "Moderação") {
            navigate(`/moderacao`);
        } else if (titulo === "Configuração") {
            navigate(`/configuracao`);
        } else if (titulo === "Entrar") {
            navigate("/login");
        } else if (titulo === "Cadastrar") {
            navigate("/cadastro");
        }
        // Novas rotas para moderação
        else if (titulo === "Perfils") {
            navigate(`/moderacao/perfils`);
        } else if (titulo === "Anuncios") {
            navigate(`/moderacao/anuncios`);
        } else if (titulo === "Posts") {
            navigate("/moderacao/posts");
        } else if (titulo === "Cadastro") {
            navigate("/moderacao/cadastro");
        } else if (titulo === "Sair") {
            navigate("/login");
        }
    }

    const [abaSelecionada, setAbaSelecionada] = useState(obterPagDirecao());


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
                                    titulo="Perfils"
                                    selecionado={abaSelecionada === "Perfils"}
                                    onClick={() => {
                                        handleSelecionarAba("Perfils");
                                        onNavegacao("Perfils");
                                    }}
                                >
                                    <BookUser size={28}/>
                                </Aba>
                                <hr />
                                <Aba
                                    titulo="Anuncios"
                                    selecionado={abaSelecionada === "Anuncios"}
                                    onClick={() => {
                                        handleSelecionarAba("Anuncios");
                                        onNavegacao("Anuncios");
                                    }}
                                >
                                    <BookA size={28}/>
                                </Aba>
                                <hr />
                                <Aba
                                    titulo="Posts"
                                    selecionado={abaSelecionada === "Posts"}
                                    onClick={() => {
                                        handleSelecionarAba("Posts");
                                        onNavegacao("Posts");
                                    }}
                                >
                                    <BookImage size={28}/>
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
                                    <UserRoundPlus size={28} />
                                </Aba>
                                <hr />
                            </div>
                        </div>
                        <div className="conjAba partMenu inferior">
                            <hr />
                            <Aba
                                titulo="Sair"
                                selecionado={abaSelecionada === "Sair"}
                                onClick={() => {
                                    handleSelecionarAba("Sair");
                                    onNavegacao("Sair");
                                }}
                            >
                                <LogOut />
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
                                    selecionado={abaSelecionada === "Perfils"}
                                    onClick={() => {
                                        handleSelecionarAba("Perfils");
                                        onNavegacao("Perfils");
                                    }}
                                >
                                    <BookUser size={28}/>
                                </Aba>
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Anuncios"}
                                    onClick={() => {
                                        handleSelecionarAba("Anuncios");
                                        onNavegacao("Anuncios");
                                    }}
                                >
                                    <BookA size={28}/>
                                </Aba>
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Posts"}
                                    onClick={() => {
                                        handleSelecionarAba("Posts");
                                        onNavegacao("Posts");
                                    }}
                                >
                                    <BookImage size={28}/>
                                </Aba>
                                <hr />
                                <Aba
                                    selecionado={abaSelecionada === "Cadastro"}
                                    onClick={() => {
                                        handleSelecionarAba("Cadastro");
                                        onNavegacao("Cadastro");
                                    }}
                                >
                                    <UserRoundPlus size={28} />
                                </Aba>
                                <hr />
                            </div>
                        </div>
                        <div className="conjAba partMenu inferior">
                            <hr />
                            <Aba
                                selecionado={abaSelecionada === "Sair"}
                                onClick={() => {
                                    handleSelecionarAba("Sair");
                                    onNavegacao("Sair");
                                }}
                            >
                                <LogOut />
                            </Aba>
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
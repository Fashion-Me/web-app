import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";
import {Search, UserRoundPen, Star, Megaphone, KeyRound, ShoppingBag, ArrowLeft} from "lucide-react";
import FundoHome from "../Imagens/DetalheFundo.png";
import "../css/Mensagens.css"
import "../css/Configuracao.css"
import "../Componentes/CompConfig/CompConfig.css"
import EditarPerfil from "../Componentes/CompConfig/EditarPerfil";
import AnunCurtidos from "../Componentes/CompConfig/AnunCurtidos";
import AnunProprios from "../Componentes/CompConfig/AnunProprios";
import ConfigTrocarSenha from "../Componentes/CompConfig/ConfigTrocarSenha";


import FotoPerfil from "../Imagens/FotoPerfilAvatar.png"
import api from "../services/authApi";
const nomePerfil = "João Silva";



const Configuracao = () => {
    const {menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
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


    const handleLogout = async () => {
        try {
            // Chama a API de logout
            await api.post("/auth/logout");

            // Redireciona para a página de login
            navigate("/login");
        } catch (err) {
            console.error("Erro ao fazer logout:", err);
            alert("Erro ao sair da conta. Tente novamente.");
        } finally {
            setShowLogoutPopup(false);
        }
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu &&(
                    <HamburgerComponent  menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo" id="ConteudoConfig" style={{backgroundImage: `url(${FundoHome})`}}>
                {mostrarAbaConfig &&
                    <AbaConfig
                        setConteudoAtual={setConteudoAtual}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        setShowLogoutPopup={setShowLogoutPopup} // Passa a função para o AbaConfig
                    />
                }
                {mostrarAreaConfig &&
                    <AreaConfig
                        conteudoAtual={conteudoAtual}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                    />}
                {showLogoutPopup && (
                    <LogoutPopup
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogoutPopup(false)}
                    />
                )}
            </main>
        </div>
    );
};

export default Configuracao;

const ItemConfig = ({ icon, texto, onClick }) => (
    <div className="item-config" onClick={onClick}>
        <div className="item-esquerda">
            {icon}
            <span className="SpanItemConfig">{texto}</span>
        </div>
        <span className="seta">{'>'}</span>
    </div>
);

const AbaConfig = ({ setConteudoAtual, setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setShowLogoutPopup }) => (
    <div id="divConfig">
        <div className="divTituloCaixaEntrada">
            <h2 className="semibold">Configurações</h2>
        </div>

        {/* Campo de busca */}
        <div className="divConfigPesquisa">
            <div className="barraPesquisa">
                <input type="text" placeholder="Pesquisar" />
                <Search className="iconeLupa" size={24} color="#efefef" />
            </div>
        </div>

        {/* Seção: Sua conta */}
        <div className="linha-titulo">
            <span className="texto-linha">Sua conta</span>
        </div>
        <div className="ConjSuaConta">
            <ItemConfig
                icon={<UserRoundPen size={30} />}
                texto="Editar Perfil"
                onClick={() => {
                    setConteudoAtual('EditarPerfil');
                    if (window.innerWidth < 500) {
                        setMostrarAbaConfig(false);
                        setMostrarAreaConfig(true);
                        setMostrarMenu(false)
                    }
                }}
            />
            <ItemConfig
                icon={<KeyRound size={30} />}
                texto="Trocar a senha da conta"
                onClick={() => {
                    setConteudoAtual('ConfigTrocarSenha');
                    if (window.innerWidth < 500) {
                        setMostrarAbaConfig(false);
                        setMostrarAreaConfig(true);
                        setMostrarMenu(false)
                    }
                }}
            />
        </div>

        {/* Seção: Brechó */}
        <div className="linha-titulo">
            <span className="texto-linha">Brechó</span>
        </div>
        <div className="ConBrecho">
            <ItemConfig
                icon={<Star size={30} />}
                texto="Anúncios curtidos"
                onClick={() => {
                    setConteudoAtual('AnunCurtidos');
                    if (window.innerWidth < 500) {
                        setMostrarAbaConfig(false);
                        setMostrarAreaConfig(true);
                        setMostrarMenu(false)
                    }
                }}
            />
            <ItemConfig
                icon={<Megaphone size={30} />}
                texto="Seus anúncios"
                onClick={() => {
                    setConteudoAtual('AnunProprios');
                    if (window.innerWidth < 500) {
                        setMostrarAbaConfig(false);
                        setMostrarAreaConfig(true);
                        setMostrarMenu(false)
                    }
                }}
            />

            <ItemConfig
                icon={<ShoppingBag size={30} />}
                texto="Meus Pedidos"
                onClick={() => {
                    setConteudoAtual('AnunciarItem');
                    if (window.innerWidth < 500) {
                        setMostrarAbaConfig(false);
                        setMostrarAreaConfig(true);
                        setMostrarMenu(false)
                    }
                }}
            />
        </div>
        <hr />

        {/* Ações finais */}
        <div className="acoes-finais">
            <button className="btn-vermelho" onClick={() => setShowLogoutPopup(true)}>Sair da conta</button>
            <hr />
            <button className="btn-vermelho">Apagar conta</button>
        </div>
    </div>
);

const AreaConfig = ({ conteudoAtual,setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu }) => (
    <div className="AreaConfig" >
        {conteudoAtual === 'EditarPerfil' &&
            <>
                <div className="divTituloArea">
                    { window.innerWidth < 500 &&
                        <ArrowLeft size={30}
                                   strokeWidth={2.5}
                                   onClick={() => {
                                       setMostrarAreaConfig(false);
                                       setMostrarAbaConfig(true);
                                       setMostrarMenu(true)}
                                   }
                        />}
                    <h2 className="titulo">Editar Perfil</h2>
                </div>
                <EditarPerfil/>
            </>
        }
        {conteudoAtual === 'AnunCurtidos' &&
            <>
                <div className="divTituloArea">
                    { window.innerWidth < 500 &&
                        <ArrowLeft size={30}
                                   strokeWidth={2.5}
                                   onClick={() => {
                                       setMostrarAreaConfig(false);
                                       setMostrarAbaConfig(true);
                                       setMostrarMenu(true)}
                                   }
                        />}
                    <h2 className="titulo">Anúncios curtidos</h2>
                </div>
                <AnunCurtidos/>
            </>
        }
        {conteudoAtual === 'AnunProprios' &&
            <>
                <div className="divTituloArea">
                    { window.innerWidth < 500 &&
                        <ArrowLeft size={30}
                                   strokeWidth={2.5}
                                   onClick={() => {
                                       setMostrarAreaConfig(false);
                                       setMostrarAbaConfig(true);
                                       setMostrarMenu(true)}
                                   }
                        />}
                    <h2 className="titulo">Meus anúncios</h2>
                </div>
                <AnunProprios/>
            </>
        }
        {conteudoAtual === 'ConfigTrocarSenha' &&
            <>
                <div className="divTituloArea divTituloAreaSenha">
                    { window.innerWidth < 500 &&
                        <ArrowLeft size={30}
                                   strokeWidth={2.5}
                                   onClick={() => {
                                       setMostrarAreaConfig(false);
                                       setMostrarAbaConfig(true);
                                       setMostrarMenu(true)}
                                   }
                        />}
                    <h2 className="titulo">Trocar Senha</h2>
                </div>
                <ConfigTrocarSenha/>
            </>
        }
    </div>
);

// Novo componente para o pop-up de logout
const LogoutPopup = ({ onConfirm, onCancel}) => (
    <div className="logout-popup-overlay">
        <div className="logout-popup-content">
            <div className="user-info">
                <img src={FotoPerfil} alt="Avatar" className="user-avatar" /> {/* Substitua por imagem real */}
                <div>
                    <p className="user-name">{nomePerfil}</p>
                </div>
            </div>
            <p className="confirmation-message">Confirme que você quer sair do perfil <b> {nomePerfil} </b> para continuar</p>
            <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
             <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
    </div>
);
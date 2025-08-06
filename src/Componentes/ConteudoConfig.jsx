import React, { useState, useRef } from 'react';
import "./Css/ConteudoHomePadrao.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {Search, UserRoundPen, Star, Megaphone, KeyRound, ShoppingBag} from "lucide-react";
import FundoHome from "../Imagens/DetalheFundo.png";
import "../css/Mensagens.css"
import "../css/Configuracao.css"
import "./CompConfig/CompConfig.css"
import EditarPerfil from "./CompConfig/EditarPerfil";
import AnunCurtidos from "./CompConfig/AnunCurtidos";
import AnunProprios from "./CompConfig/AnunProprios";
import ConfigTrocarSenha from "./CompConfig/ConfigTrocarSenha";
import { useEffect } from 'react';
import fotoPerfil from "../Imagens/FotoPerfil.png";
import useCheckDisplay from "../hooks/useCheckDisplay()";

const ConteudoConfig = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    const [conteudoAtual, setConteudoAtual] = useState(''); // Estado para controlar o conteúdo exibido
    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true); // Estado para controlar a visibilidade da AbaConfig

    return (
        <main className="Conteudo" id="ConteudoConfig" style={{backgroundImage: `url(${FundoHome})`}}>
            {mostrarAbaConfig && <AbaConfig setConteudoAtual={setConteudoAtual} setMostrarAbaConfig={setMostrarAbaConfig} />}
            <AreaConfig conteudoAtual={conteudoAtual} setMostrarAbaConfig={setMostrarAbaConfig} />
        </main>
    );
};

export default ConteudoConfig;

const ItemConfig = ({ icon, texto, onClick }) => (
    <div className="item-config" onClick={onClick}>
        <div className="item-esquerda">
            {icon}
            <span className="SpanItemConfig">{texto}</span>
        </div>
        <span className="seta">{'>'}</span>
    </div>
);

const AbaConfig = ({ setConteudoAtual, setMostrarAbaConfig }) => (
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
                    if (window.innerWidth < 500) setMostrarAbaConfig(false); // Esconde a AbaConfig no mobile
                }}
            />
            <ItemConfig
                icon={<KeyRound size={30} />}
                texto="Trocar a senha da conta"
                onClick={() => {
                    setConteudoAtual('ConfigTrocarSenha');
                    if (window.innerWidth < 500) setMostrarAbaConfig(false); // Esconde a AbaConfig no mobile
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
                    if (window.innerWidth < 500) setMostrarAbaConfig(false);
                }}
            />
            <ItemConfig
                icon={<Megaphone size={30} />}
                texto="Seus anúncios"
                onClick={() => {
                    setConteudoAtual('AnunProprios');
                    if (window.innerWidth < 500) setMostrarAbaConfig(false);
                }}
            />

            <ItemConfig
                icon={<ShoppingBag size={30} />}
                texto="Anunciar item"
                onClick={() => setConteudoAtual('AnunciarItem')}
            />
        </div>
        <hr />

        {/* Ações finais */}
        <div className="acoes-finais">
            <button className="btn-vermelho">Sair da conta</button>
            <hr />
            <button className="btn-vermelho">Apagar conta</button>
        </div>
    </div>
);

const AreaConfig = ({ conteudoAtual, setMostrarAbaConfig }) => (
    <div className="AreaConfig  container-editar-perfil">
        {conteudoAtual === 'EditarPerfil' && <> <h2 className="titulo">Editar Perfil</h2>    <EditarPerfil/></>}
        {conteudoAtual === 'AnunCurtidos' && <> <h2 className="titulo">Anúncios curtidos</h2><AnunCurtidos/></>}
        {conteudoAtual === 'AnunProprios' && <> <h2 className="titulo">Meus anúncios</h2>     <AnunProprios/></>}
        {conteudoAtual === 'ConfigTrocarSenha' && <><h2 className="titulo">Trocar Senha</h2><ConfigTrocarSenha/></>}
        {/* Adicione outros componentes conforme necessário */}
    </div>
);


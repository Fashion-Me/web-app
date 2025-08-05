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
import fotoPerfil from "../Imagens/FotoPerfil.png";

const ConteudoConfig = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    const [conteudoAtual, setConteudoAtual] = useState(''); // Estado para controlar o conteúdo exibido

    return (
        <main className="Conteudo" id="ConteudoConfig" style={{backgroundImage: `url(${FundoHome})`}}>
            <AbaConfig setConteudoAtual={setConteudoAtual} />
            <AreaConfig conteudoAtual={conteudoAtual} />
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

const AbaConfig = ({ setConteudoAtual }) => (
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
                onClick={() => setConteudoAtual('EditarPerfil')}
            />
            <ItemConfig
                icon={<KeyRound size={30} />}
                texto="Trocar a senha da conta"
                onClick={() => setConteudoAtual('ConfigTrocarSenha')}
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
                onClick={() => setConteudoAtual('AnunCurtidos')}
            />
            <ItemConfig
                icon={<Megaphone size={30} />}
                texto="Seus anúncios"
                onClick={() => setConteudoAtual('AnunProprios')}
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

const AreaConfig = ({ conteudoAtual }) => (
    <>
        {conteudoAtual === 'EditarPerfil' && <EditarPerfil />}
        {conteudoAtual === 'AnunCurtidos' && <AnunCurtidos />}
        {conteudoAtual === 'AnunProprios' && <AnunProprios />}
        {conteudoAtual === 'ConfigTrocarSenha' && <ConfigTrocarSenha />}
        {/* Adicione outros componentes conforme necessário */}
    </>
);


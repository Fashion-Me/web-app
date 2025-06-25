import React, {useState} from 'react';
import "./Css/ConteudoHomePadrao.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {Search, X} from "lucide-react";
import FundoHome from "../Imagens/DetalheFundo.png";
import "../css/Mensagens.css"
import fotoPerfil from "../Imagens/FotoPerfil.png";

const ConteudoMensagens = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    return (
        <main className="Conteudo" id="ConteudoMensagens" style={{backgroundImage: `url(${FundoHome})`}}>
            <Mensagens/>
            <Conversa/>
        </main>
    );
};

export default ConteudoMensagens;


const Contatos = ({ nome, ultimaMensagem, numNovaMensagem }) => (
    <div className="Contato">
        <div className="imgContato"><img src={fotoPerfil} alt="Foto de Perfil"/></div>
        <div className="textoContato">
            <h3 className="semibold">{nome}</h3>
            <p className="ContatoP">{ultimaMensagem}</p>
        </div>
        {numNovaMensagem > 0 && (
            <div className="divNumNovaMensagem">
                <p className="numNovaMensagem">{numNovaMensagem}</p>
            </div>
        )}

    </div>
);

const Conversa = () => (
<div></div>
);

const Mensagens = () => (
    <div className="CaixaDeEntrada" id="divMensagens">
        <div className="divTituloCaixaEntrada">
            <h2 className="semibold">Mensagens</h2>
        </div>
        <div className="divMensagensPesquisa">
            <div className="barraPesquisa">
                <input type="text" placeholder="Pesquisar" />
                <Search className="iconeLupa" size={24} color="#efefef" />
            </div>
        </div>
        <div className="ListaNotificacoes">
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." numNovaMensagem={2} />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." numNovaMensagem={2} />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." numNovaMensagem={2} />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
            <Contatos nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." />
        </div>
    </div>
);
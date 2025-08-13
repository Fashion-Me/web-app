import React, {useState} from 'react';
import "./Css/ConteudoHomePadrao.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {ArrowLeft, Search, X} from "lucide-react";
import FundoHome from "../Imagens/DetalheFundo.png";
import "../css/Mensagens.css"
import fotoPerfil from "../Imagens/FotoPerfil.png";
import EditarPerfil from "./CompConfig/EditarPerfil";

const ConteudoMensagens = ({MostrarMenu,setMostrarMenu}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tipoUsuario = searchParams.get("tipoUsuario") || "convidado";

    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true);
    const [mostrarAreaConfig, setMostrarAreaConfig] = useState(true);
    const [contatoSelecionado, setContatoSelecionado] = useState({ nome: "", foto: "" }); // Estado para armazenar o contato selecionado




    return (
        <main className="Conteudo" id="ConteudoMensagens" style={{backgroundImage: `url(${FundoHome})`}}>
            {mostrarAbaConfig &&
                <AbaMensagens
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                    setContatoSelecionado={setContatoSelecionado} // Passa o setter para AbaMensagens
                />
            }
            {mostrarAreaConfig &&
                <AreaMensagens
                    ContatoNome={contatoSelecionado.nome} // Passa o nome do contato selecionado
                    ContatoFoto={contatoSelecionado.foto} // Passa a foto do contato selecionado
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />}
        </main>
    );
};

export default ConteudoMensagens;


const Contato = ({ nome, ultimaMensagem, numNovaMensagem, ContatoFoto, setMostrarAbaConfig , setMostrarAreaConfig, setMostrarMenu, setContatoSelecionado }) => (
    <div className="Contato"
         onClick={() => {
             if (window.innerWidth < 500) {
                 setMostrarAbaConfig(false);
                 setMostrarAreaConfig(true);
                 setMostrarMenu(false);
             }
             setContatoSelecionado({ nome, foto: ContatoFoto }); // Atualiza o contato selecionado
         }}
    >
        <div className="imgContato"><img src={ContatoFoto} alt="Foto de Perfil"/></div>
        <div className="textoContato">
            <h3 className="semibold">{nome}</h3>
            <p className="ContatoP">{ultimaMensagem}</p>
        </div>
        {numNovaMensagem && (
            <div className="divNumNovaMensagem">
            </div>
        )}

    </div>
);

const AbaMensagens = ({setMostrarAbaConfig , setMostrarAreaConfig, setMostrarMenu, setContatoSelecionado}) => (
    <div id="divConfig">
        <div className="divTituloCaixaEntrada">
            <h2 className="semibold">Mensagens</h2>
        </div>
        <div className="divConfigPesquisa">
            <div className="barraPesquisa">
                <input type="text" placeholder="Pesquisar" />
                <Search className="iconeLupa" size={24} color="#efefef" />
            </div>
        </div>
        <div className="linha-titulo">
            <span className="texto-linha">Suas Mensagens</span>
        </div>

        <div className="ListaNotificacoes">
            <Contato
                ContatoFoto={fotoPerfil}
                nome="Bombom"
                ultimaMensagem="18:22  hj vou estudar muito .."
                numNovaMensagem={true}
                setMostrarAbaConfig={setMostrarAbaConfig}
                setMostrarAreaConfig={setMostrarAreaConfig}
                setMostrarMenu={setMostrarMenu}
                setContatoSelecionado={setContatoSelecionado} // Passa o setter para Contato
            />
            <Contato
                ContatoFoto={fotoPerfil}
                nome="Bombom"
                ultimaMensagem="18:22  hj vou estudar muito .."
                numNovaMensagem={true}
                setMostrarAbaConfig={setMostrarAbaConfig}
                setMostrarAreaConfig={setMostrarAreaConfig}
                setMostrarMenu={setMostrarMenu}
                setContatoSelecionado={setContatoSelecionado} // Passa o setter para Contato
            />
            <Contato
                ContatoFoto={fotoPerfil}
                nome="Bombom"
                ultimaMensagem="18:22  hj vou estudar muito .."
                numNovaMensagem={true}
                setMostrarAbaConfig={setMostrarAbaConfig}
                setMostrarAreaConfig={setMostrarAreaConfig}
                setMostrarMenu={setMostrarMenu}
                setContatoSelecionado={setContatoSelecionado} // Passa o setter para Contato
            />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." numNovaMensagem={true} setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." numNovaMensagem={true} setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
            <Contato ContatoFoto={fotoPerfil} nome="Bombom" ultimaMensagem="18:22  hj vou estudar muito .." setContatoSelecionado={setContatoSelecionado} />
        </div>
    </div>
);

const AreaMensagens = ({ContatoNome,ContatoFoto,setMostrarAbaConfig , setMostrarAreaConfig, setMostrarMenu}) => (
<div className="AreaConfig  container-editar-perfil">
    {ContatoFoto !== '' &&
        <>
            <div className="divTituloAreaConfig">
                { window.innerWidth < 500 &&
                    <ArrowLeft size={30}
                               strokeWidth={2.5}
                               onClick={() => {
                                   setMostrarAreaConfig(false);
                                   setMostrarAbaConfig(true);
                                   setMostrarMenu(true)}
                               }
                    />
                }
                <div className="imgContato"><img src={ContatoFoto} alt="Foto de Perfil"/></div>
                <h2 className="titulo">{ContatoNome}</h2>
            </div>
            <Conversa/>
            <div className="divConfigPesquisa">
                <div className="barraPesquisa">
                    <input type="text" placeholder="Pesquisar" />
                    <Search className="iconeLupa" size={24} color="#efefef" />
                </div>
            </div>
        </>
    }

</div>
);
const Conversa = () => (
    <div>

    </div>
)


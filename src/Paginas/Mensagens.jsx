import React, {useEffect, useState} from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";
import FundoHome from "../Imagens/DetalheFundo.png";
import {ArrowLeft, Search, SendHorizontal,Image,CircleSmall  } from "lucide-react";
import api from "../services/authApi";

import fotoPerfil from "../Imagens/FotoPerfil.png";
import fotoPerfilEnzo from "../Imagens/FotoPerfilEnzo.png";
import fotoPerfilDaniel from "../Imagens/FotoDaniel.jpg";
import fotoPerfilCaue from "../Imagens/FotoPerfilCaue.jpg";
import fotoPerfilVH from "../Imagens/FotoPerfilVH.jpg";

const Mensagens = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);

    const navigate = useNavigate();

    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true);
    const [mostrarAreaConfig, setMostrarAreaConfig] = useState(true);
    const [contatoSelecionado, setContatoSelecionado] = useState({ nome: "", foto: "" }); // Estado para armazenar o contato selecionado
    const [mensagens, setMensagens] = useState([]); // Estado para armazenar as mensagens
    const [novaMensagem, setNovaMensagem] = useState(""); // Estado para armazenar o texto do input
    const [contatos, setContatos] = useState([]); // Estado para armazenar os contatos
    const [carregando, setCarregando] = useState(true); // Estado para loading

    const enviarMensagem = () => {
        if (novaMensagem.trim() !== "") {
            setMensagens((prevMensagens) => [
                ...prevMensagens,
                { MensagemLado: "remetente", TextoMensagem: novaMensagem }
            ]);
            setNovaMensagem(""); // Limpa o input após enviar
        }
    };

    const enviarImagem = (imagem) => {
        setMensagens((prevMensagens) => [
            ...prevMensagens,
            { MensagemLado: "remetente", ImagemMensagem: imagem }
        ]);
    };

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

    useEffect(() => {
        const buscarContatos = async () => {
            try {
                const response = await api.get("/chats");
                setContatos(response.data);
            } catch (err) {
                console.error("Erro ao buscar contatos:", err);
                alert("Erro ao carregar conversas");
            } finally {
                setCarregando(false);
            }
        };

        buscarContatos();
    }, []);


    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                mostrarMenu &&(
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                )
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <main className="Conteudo" id="ConteudoMensagens" style={{backgroundImage: `url(${FundoHome})`}}>
                {mostrarAbaConfig &&
                    <AbaMensagens
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        setContatoSelecionado={setContatoSelecionado}
                        contatos={contatos} // Passa os contatos
                        carregando={carregando} // Passa o estado de loading
                    />
                }
                {mostrarAreaConfig &&
                    <AreaMensagens
                        ContatoNome={contatoSelecionado.nome}
                        ContatoFoto={contatoSelecionado.foto}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        mensagens={mensagens} // Passa as mensagens para o componente
                        novaMensagem={novaMensagem} // Passa o texto do input
                        setNovaMensagem={setNovaMensagem} // Passa o setter do input
                        enviarMensagem={enviarMensagem} // Passa a função de envio
                        enviarImagem={enviarImagem} // Passa a função de envio de imagem
                    />
                }
            </main>
        </div>
    );
};

export default Mensagens;

const Contato = ({ nome, ultimaMensagem, numNovaMensagem, ContatoFoto, setMostrarAbaConfig , setMostrarAreaConfig, setMostrarMenu, setContatoSelecionado }) => (
    <div className="Contato"
         onClick={() => {
             if (window.innerWidth < 500) {
                 setMostrarAbaConfig(false);
                 setMostrarAreaConfig(true);
                 setMostrarMenu(false);
             }
             setContatoSelecionado({ nome, foto: ContatoFoto });
         }}
    >
        <div className="imgContato"><img src={ContatoFoto} alt="Foto de Perfil"/></div>
        <div className="textoContato">
            <h3 className="ContatoNome semibold">{nome}</h3>
            <p className="ContatoP">{ultimaMensagem}</p>
        </div>
        {numNovaMensagem && (
            <div className="divNovaMensagem">
                <CircleSmall size={16} stroke="#4066FF" fill="#4066FF" />
            </div>

        )}
    </div>
);

const AbaMensagens = ({setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setContatoSelecionado, contatos, carregando}) => (
    <div className="AbaMensagens">
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
        <div className="ListaContatos">
            {carregando ? (
                <p style={{textAlign: 'center', padding: '20px'}}>Carregando conversas...</p>
            ) : contatos.length > 0 ? (
                contatos.map((chat) => {
                    const ultimaMensagem = chat.last_message
                        ? (chat.last_message.body || "Imagem")
                        : "Sem mensagens";

                    const temNovasMensagens = false;

                    return (
                        <Contato
                            key={chat.conversation.id}
                            ContatoFoto={fotoPerfil}
                            nome={chat.peer.name || chat.peer.username}
                            ultimaMensagem={ultimaMensagem}
                            numNovaMensagem={temNovasMensagens}
                            setMostrarAbaConfig={setMostrarAbaConfig}
                            setMostrarAreaConfig={setMostrarAreaConfig}
                            setMostrarMenu={setMostrarMenu}
                            setContatoSelecionado={setContatoSelecionado}
                        />
                    );
                })
            ) : (
                <p style={{textAlign: 'center', padding: '20px'}}>Nenhuma conversa encontrada</p>
            )}
        </div>
    </div>
);
const AreaMensagens = ({ContatoNome, ContatoFoto, setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, mensagens, novaMensagem, setNovaMensagem, enviarMensagem, enviarImagem}) => (
    <div className="AreaMensagem">
        {ContatoFoto !== '' &&
            <>
                <div className="divTituloAreaMensagem">
                    { window.innerWidth < 500 &&
                        <div className="IconeVoltar">
                            <ArrowLeft
                                size={30}
                                strokeWidth={2.5}
                                onClick={() => {
                                    setMostrarAreaConfig(false);
                                    setMostrarAbaConfig(true);
                                    setMostrarMenu(true)}
                                }
                            />
                        </div>
                    }

                    <div className="divTituloContatoFoto"><img src={ContatoFoto} alt="Foto de Perfil"/></div>
                    <h2 className="tituloAreaMensagem">{ContatoNome}</h2>
                </div>
                <Conversa mensagens={mensagens} />
                <div className="divBarraMensagem">
                    <label>
                        <Image size={24} color="#efefef" />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        enviarImagem(reader.result); // Envia a imagem como base64
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }
                            }}
                        />
                    </label>
                    <div className="barraPesquisa">
                        <input
                            type="text"
                            placeholder="Mensagem..."
                            value={novaMensagem} // Controla o valor do input
                            onChange={(e) => setNovaMensagem(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    enviarMensagem(); // Envia a mensagem ao pressionar Enter
                                }
                            }}
                        />
                    </div>
                    <SendHorizontal size={24} color="#efefef" onClick={enviarMensagem} />
                </div>
            </>
        }
    </div>
);

const Conversa = ({mensagens}) => (
    <div className="divConversa">
        {mensagens.map((mensagem, index) => (
            <Mensagem
                key={index}
                MensagemLado={mensagem.MensagemLado}
                TextoMensagem={mensagem.TextoMensagem}
                ImagemMensagem={mensagem.ImagemMensagem}
            />
        ))}
    </div>
);

const Mensagem = ({ MensagemLado, TextoMensagem, ImagemMensagem }) => (
    <>
        {MensagemLado === 'remetente' &&
            <div className="divMensagemRemetente">
                {TextoMensagem && <p>{TextoMensagem}</p>}
                {ImagemMensagem && <img src={ImagemMensagem} alt="Imagem enviada" className="imagemMensagem" />}
            </div>
        }
        {MensagemLado === 'destinatario' &&
            <div className="divMensagemDestinatario">
                {TextoMensagem && <p>{TextoMensagem}</p>}
                {ImagemMensagem && <img src={ImagemMensagem} alt="Imagem recebida" className="imagemMensagem" />}
            </div>
        }
    </>
);


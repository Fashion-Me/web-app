import React, { useEffect, useState, useRef, useCallback } from 'react';
import Menu from '../Componentes/Menu';
import "../css/Home.css";
import "../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import {useNavigate} from "react-router-dom";
import HamburgerComponent from '../Componentes/Menu/Hamburger';
import useMenuTipo from "../hooks/useMenuTipo";
import useAuth from "../hooks/useAuth";
import FundoHome from "../Imagens/DetalheFundo.png";
import {ArrowLeft, Search, SendHorizontal, Image, CircleSmall} from "lucide-react";
import api from "../services/authApi";

import fotoPerfil from "../Imagens/FotoPerfil.png";

const Mensagens = () => {
    const { menuTipo, menuOpen, setMenuOpen} = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const navigate = useNavigate();
    const { user, isLoading: userLoading } = useAuth(); // Desestrutura corretamente

    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true);
    const [mostrarAreaConfig, setMostrarAreaConfig] = useState(true);
    const [contatoSelecionado, setContatoSelecionado] = useState({ nome: "", foto: "", conversationId: null });
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [contatos, setContatos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [carregandoMensagens, setCarregandoMensagens] = useState(false);

    const lastMessageIdRef = useRef(null);
    const pollIntervalRef = useRef(null);
    const conversaRef = useRef(null);

    const formatarMensagens = useCallback((apiMessages) => {
        if (!apiMessages || apiMessages.length === 0) return [];

        // função auxiliar para extrair id, sender_id e created_at com várias chaves possíveis
        const extract = (msg) => {
            const id = msg.id ?? msg.message?.id ?? msg.message_id ?? null;
            const senderId = msg.sender_id ?? msg.senderId ?? msg.sender?.id ?? msg.sender?.user_id ?? msg.user_id ?? null;
            const body = msg.body ?? msg.text ?? msg.message?.body ?? null;
            const image = msg.image_url ?? msg.imageUrl ?? msg.message?.image_url ?? msg.image ?? null;
            const created_at = msg.created_at ?? msg.createdAt ?? msg.created_at ?? msg.message?.created_at ?? null;
            return { id, senderId, body, image, created_at };
        };

        return apiMessages.map(raw => {
            const { id, senderId, body, image, created_at } = extract(raw);
            const isRemetente = user?.id != null && Number(senderId) === Number(user.id);
            return {
                id,
                MensagemLado: isRemetente ? "remetente" : "destinatario",
                TextoMensagem: body,
                ImagemMensagem: image,
                created_at
            };
        });
    }, [user?.id]);

    const buscarMensagens = async (conversationId) => {
        setCarregandoMensagens(true);
        try {
            const response = await api.get(`/chats/${conversationId}/messages`);
            const mensagensFormatadas = formatarMensagens(response.data);
            setMensagens(mensagensFormatadas);

            if (mensagensFormatadas.length > 0) {
                lastMessageIdRef.current = mensagensFormatadas[mensagensFormatadas.length - 1].id;
            }

            // Scroll automático para o final
            setTimeout(() => {
                if (conversaRef.current) {
                    conversaRef.current.scrollTop = conversaRef.current.scrollHeight;
                }
            }, 100);
        } catch (err) {
            console.error("Erro ao buscar mensagens:", err);
            alert("Erro ao carregar mensagens");
            setMensagens([]);
        } finally {
            setCarregandoMensagens(false);
        }
    };

    const pollNovasMensagens = async (conversationId) => {
        if (!conversationId) return;

        try {
            const params = lastMessageIdRef.current
                ? { after_id: lastMessageIdRef.current } // ajustar para after_id (compatível com backend)
                : {};

            const response = await api.get(
                `/chats/${conversationId}/messages`,
                { params }
            );

            const todasNovasMensagens = formatarMensagens(response.data);

            if (todasNovasMensagens.length > 0) {
                // evita duplicatas comparando ids existentes
                setMensagens(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const toAdd = todasNovasMensagens.filter(m => m.id != null && !existingIds.has(m.id));
                    if (toAdd.length === 0) return prev;
                    const novo = [...prev, ...toAdd];

                    // Scroll automático
                    setTimeout(() => {
                        if (conversaRef.current) {
                            conversaRef.current.scrollTop = conversaRef.current.scrollHeight;
                        }
                    }, 100);

                    return novo;
                });

                // atualiza lastMessageIdRef com o último id recebido
                const last = todasNovasMensagens[todasNovasMensagens.length - 1];
                if (last && last.id != null) {
                    lastMessageIdRef.current = last.id;
                }
            }
        } catch (error) {
            console.warn("Falha no polling de mensagens:", error);
        }
    };

    const enviarMensagem = useCallback(async () => {
        if (novaMensagem.trim() === "" || !contatoSelecionado.conversationId) return;

        const mensagemOtimista = {
            id: Date.now(),
            MensagemLado: "remetente",
            TextoMensagem: novaMensagem,
            ImagemMensagem: null
        };

        setMensagens(prev => [...prev, mensagemOtimista]);
        setNovaMensagem("");

        try {
            const response = await api.post(
                `/chats/${contatoSelecionado.conversationId}/messages`,
                { body: novaMensagem }
            );

            // atualiza lastMessageIdRef com o id retornado
            const servidorMsg = Array.isArray(response.data) ? response.data[0] : response.data;
            lastMessageIdRef.current = servidorMsg.id ?? lastMessageIdRef.current;

            // substitui a mensagem otimista (id temporário) pela mensagem formatada do servidor
            setMensagens(prev =>
                prev.map(msg =>
                    msg.id === mensagemOtimista.id
                        ? formatarMensagens([servidorMsg])[0]
                        : msg
                )
            );

            setTimeout(() => {
                if (conversaRef.current) {
                    conversaRef.current.scrollTop = conversaRef.current.scrollHeight;
                }
            }, 100);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            alert("Erro ao enviar mensagem");
            setMensagens(prev => prev.filter(msg => msg.id !== mensagemOtimista.id));
        }
    }, [novaMensagem, contatoSelecionado.conversationId, user, formatarMensagens]);

    const enviarImagem = useCallback((imagem) => {
        setMensagens((prevMensagens) => [
            ...prevMensagens,
            {
                id: Date.now(),
                MensagemLado: "remetente",
                ImagemMensagem: imagem,
                TextoMensagem: null
            }
        ]);
    }, []);

    // Efeito para iniciar/parar polling quando seleciona conversa
    useEffect(() => {
        if (contatoSelecionado.conversationId) {
            buscarMensagens(contatoSelecionado.conversationId);

            // Inicia polling passando o conversationId
            pollIntervalRef.current = setInterval(
                () => pollNovasMensagens(contatoSelecionado.conversationId),
                5000
            );
        }

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
            }
        };
    }, [contatoSelecionado.conversationId]);

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
                        contatos={contatos}
                        carregando={carregando}
                    />
                }
                {mostrarAreaConfig &&
                    <AreaMensagens
                        ContatoNome={contatoSelecionado.nome}
                        ContatoFoto={contatoSelecionado.foto}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        mensagens={mensagens}
                        novaMensagem={novaMensagem}
                        setNovaMensagem={setNovaMensagem}
                        enviarMensagem={enviarMensagem}
                        enviarImagem={enviarImagem}
                        carregandoMensagens={carregandoMensagens}
                        conversaRef={conversaRef}
                    />
                }
            </main>
        </div>
    );
};

export default Mensagens;

const Contato = ({ nome, ultimaMensagem, numNovaMensagem, ContatoFoto, conversationId, setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setContatoSelecionado }) => (
    <div className="Contato"
         onClick={() => {
             if (window.innerWidth < 500) {
                 setMostrarAbaConfig(false);
                 setMostrarAreaConfig(true);
                 setMostrarMenu(false);
             }
             setContatoSelecionado({ nome, foto: ContatoFoto, conversationId });
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
                            conversationId={chat.conversation.id}
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

const AreaMensagens = ({ContatoNome, ContatoFoto, setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, mensagens, novaMensagem, setNovaMensagem, enviarMensagem, enviarImagem, carregandoMensagens, conversaRef}) => (
    <div className="AreaMensagem">
        {ContatoFoto !== '' &&
            <>
                <div className="divTituloAreaMensagem">
                    {window.innerWidth < 500 &&
                        <div className="IconeVoltar">
                            <ArrowLeft
                                size={30}
                                strokeWidth={2.5}
                                onClick={() => {
                                    setMostrarAreaConfig(false);
                                    setMostrarAbaConfig(true);
                                    setMostrarMenu(true);
                                }}
                            />
                        </div>
                    }
                    <div className="divTituloContatoFoto"><img src={ContatoFoto} alt="Foto de Perfil"/></div>
                    <h2 className="tituloAreaMensagem">{ContatoNome}</h2>
                </div>
                {carregandoMensagens ? (
                    <div className="divConversa" style={{justifyContent: 'center', alignItems: 'center'}}>
                        <p>Carregando mensagens...</p>
                    </div>
                ) : (
                    <Conversa mensagens={mensagens} conversaRef={conversaRef} />
                )}
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
                                        enviarImagem(reader.result);
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
                            value={novaMensagem}
                            onChange={(e) => setNovaMensagem(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    enviarMensagem();
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

const Conversa = React.memo(({mensagens, conversaRef}) => (
    <div className="divConversa" ref={conversaRef}>
        {mensagens.map((mensagem) => (
            <Mensagem
                key={mensagem.id}
                MensagemLado={mensagem.MensagemLado}
                TextoMensagem={mensagem.TextoMensagem}
                ImagemMensagem={mensagem.ImagemMensagem}
            />
        ))}
    </div>
));

Conversa.displayName = 'Conversa';

const Mensagem = React.memo(({ MensagemLado, TextoMensagem, ImagemMensagem }) => (
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
));
Mensagem.displayName = 'Mensagem';

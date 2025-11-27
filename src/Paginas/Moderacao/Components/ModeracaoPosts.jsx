import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import "./ModeracaoPerfils.css";
import "./ModeracaoAnuncios.css";
import api from "../../../services/authApi";
import { useNavigate } from "react-router-dom";

const TITULO_PAGINA = "POSTS";
const OPCOES_FILTRO = ["Mais Recentes", "Conteúdo sexual/nudez", "Golpe", "Conteúdo ilícito", "Conteúdo pejorativo"];
const MENU_OPCOES = ["DENUNCIADOS", "PUNIDOS"];

const AnuncioDenuncia = ({ fotoAnuncio, tipoDenuncia, onVerMais }) => {
    return (
        <div className="anuncio-denuncia-card">
            <div className="anuncio-foto-container">
                <img src={fotoAnuncio} alt="Post denunciado" className="anuncio-foto" />
            </div>
            <div className="anuncio-denuncia-info">
                <p className="denuncia-titulo">DENUNCIADO POR:</p>
                <p className="denuncia-tipo">{tipoDenuncia}</p>
            </div>
            <button className="btn-ver-mais" onClick={onVerMais}>
                ver mais
            </button>
        </div>
    );
};

const ModeracaoPosts = () => {
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState(OPCOES_FILTRO[0]);
    const [menuAtivo, setMenuAtivo] = useState(MENU_OPCOES[0]);
    const [pesquisa, setPesquisa] = useState("");
    const [posts, setPosts] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        buscarPosts();
    }, [menuAtivo, filtroSelecionado]);

    const buscarPosts = async () => {
        try {
            setCarregando(true);

            // Buscar denúncias de posts
            const responseDenuncias = await api.get('/moderation/reports', {
                params: {
                    target_type: 'post',
                    skip: 0,
                    limit: 100
                }
            });

            console.log('Denúncias de posts:', responseDenuncias.data);

            let denunciasFiltradas = responseDenuncias.data;

            // Filtrar por tipo de denúncia se não for "Mais Recentes"
            if (filtroSelecionado !== "Mais Recentes") {
                const filtroMap = {
                    "Conteúdo sexual/nudez": "sexual",
                    "Golpe": "golpe",
                    "Conteúdo ilícito": "ilicito",
                    "Conteúdo pejorativo": "pejorativo"
                };
                const reasonFiltro = filtroMap[filtroSelecionado];
                denunciasFiltradas = denunciasFiltradas.filter(d => d.reason === reasonFiltro);
            }

            // Buscar dados completos dos posts
            const postsComDados = await Promise.all(
                denunciasFiltradas.map(async (denuncia) => {
                    try {
                        const responsePost = await api.get(`/posts/${denuncia.target_id}`);
                        const postData = responsePost.data;

                        return {
                            id: denuncia.id,
                            target_id: denuncia.target_id,
                            reason: denuncia.reason,
                            fotoPost: postData.medias?.[0]?.url || "/placeholder.png",
                            caption: postData.caption || ""
                        };
                    } catch (err) {
                        console.error(`Erro ao buscar post ${denuncia.target_id}:`, err);
                        return {
                            id: denuncia.id,
                            target_id: denuncia.target_id,
                            reason: denuncia.reason,
                            fotoPost: "/placeholder.png",
                            caption: ""
                        };
                    }
                })
            );

            setPosts(postsComDados);
        } catch (err) {
            const detalhe = err.response?.data?.detail || err.message;
            console.error("Erro ao buscar denúncias de posts:", err);
            console.error("Detalhes do erro:", detalhe);
        } finally {
            setCarregando(false);
        }
    };

    const obterPostsFiltrados = () => {
        let postsFiltrados = posts;

        if (pesquisa.trim()) {
            postsFiltrados = postsFiltrados.filter(post =>
                post.target_id.toString().includes(pesquisa) ||
                post.caption.toLowerCase().includes(pesquisa.toLowerCase())
            );
        }

        return postsFiltrados;
    };

    const mapearTipoDenuncia = (reason) => {
        const mapaDenuncias = {
            "sexual": "Conteúdo de cunho sexual, nudez",
            "golpe": "Conteúdo se trata à um golpe",
            "ilicito": "Conteúdo ilícito, fora da lei",
            "pejorativo": "Conteúdo pejorativo ou referente a política"
        };
        return mapaDenuncias[reason] || reason;
    };

    const handleVerMais = (targetId) => {
        console.log("Enviando para o post", targetId);
        navigate(`/moderacao/especPost/${targetId}`);
    };

    return (
        <div className="moderacao-anuncios-container">
            <h1 className="titulo-pagina">{TITULO_PAGINA}</h1>

            <div className="barra-pesquisa-container">
                <input
                    type="text"
                    placeholder="PESQUISAR"
                    className="input-pesquisa"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
                <div className="filtro-dropdown">
                    <button
                        className="filtro-button"
                        onClick={() => setFiltroAberto(!filtroAberto)}
                    >
                        {filtroSelecionado}
                        <ChevronDown size={20} />
                    </button>
                    {filtroAberto && (
                        <div className="filtro-opcoes">
                            {OPCOES_FILTRO.map((opcao) => (
                                <div
                                    key={opcao}
                                    className="filtro-opcao"
                                    onClick={() => {
                                        setFiltroSelecionado(opcao);
                                        setFiltroAberto(false);
                                    }}
                                >
                                    {opcao}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="menu-opcoes">
                {MENU_OPCOES.map((opcao) => (
                    <div
                        key={opcao}
                        className={`menu-opcao ${menuAtivo === opcao ? 'ativo' : ''}`}
                        onClick={() => setMenuAtivo(opcao)}
                    >
                        {opcao}
                    </div>
                ))}
            </div>

            {carregando ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#EFEFEF' }}>
                    Carregando denúncias...
                </div>
            ) : (
                <div className="lista-anunciosP">
                    {obterPostsFiltrados().map((post) => (
                        <AnuncioDenuncia
                            key={post.id}
                            fotoAnuncio={post.fotoPost}
                            tipoDenuncia={mapearTipoDenuncia(post.reason)}
                            onVerMais={() => handleVerMais(post.target_id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModeracaoPosts;
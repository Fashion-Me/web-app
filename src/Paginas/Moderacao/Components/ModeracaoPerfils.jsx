import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import "./ModeracaoPerfils.css";
import api from "../../../services/authApi";
import { useNavigate } from "react-router-dom";

const TITULO_PAGINA = "PERFILS";
const OPCOES_FILTRO = ["Ordem Alfabética", "Mais Denúncias", "Mais Recentes"];
const MENU_OPCOES = ["DENUNCIADOS", "PUNIDOS"];

const PerfilDenuncia = ({ fotoPerfil, nomePerfil, numDenuncias, tipoMenu, onVisualizar, onAcao }) => {
    return (
        <div className="anuncio-denuncia-item">
            <div className="anuncio-info">
                <img src={fotoPerfil} alt={nomePerfil} className="PerfilDenunciaFoto" />
                <div className="info-texto">
                    <h3>{nomePerfil}</h3>
                </div>
            </div>
            <div className="anuncio-acoes">
                <button className="btn-visualizar" onClick={onVisualizar}>
                    vizualizar perfil
                </button>
                <div className="denuncias-info">
                    <span className="denuncias-label">denuncias</span>
                    <span className="denuncias-numero">{numDenuncias}</span>
                </div>
                <div className="verificar-info" onClick={onAcao}>
                    <span>verificar</span>
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    );
};

const ModeracaoPerfil = () => {
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState(OPCOES_FILTRO[0]);
    const [menuAtivo, setMenuAtivo] = useState(MENU_OPCOES[0]);
    const [pesquisa, setPesquisa] = useState("");
    const [perfis, setPerfis] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        buscarPerfis();
    }, [menuAtivo]);

    const buscarPerfis = async () => {
        try {
            setCarregando(true);

            // Buscar denúncias de usuários
            const responseDenuncias = await api.get('/moderation/reports', {
                params: {
                    target_type: 'user',
                    skip: 0,
                    limit: 100
                }
            });

            console.log('Denúncias de perfis:', responseDenuncias.data);

            // Agrupar denúncias por target_id
            const denunciasAgrupadas = responseDenuncias.data.reduce((acc, denuncia) => {
                const id = denuncia.target_id;
                if (!acc[id]) {
                    acc[id] = {
                        id,
                        numDenuncias: 0,
                        denuncias: []
                    };
                }
                acc[id].numDenuncias++;
                acc[id].denuncias.push(denuncia);
                return acc;
            }, {});

            // Buscar dados completos dos usuários
            const perfisComDados = await Promise.all(
                Object.values(denunciasAgrupadas).map(async (perfil) => {
                    try {
                        const responseUsuario = await api.get(`/users/id/${perfil.id}`);
                        const usuarioData = responseUsuario.data;

                        return {
                            id: perfil.id,
                            numDenuncias: perfil.numDenuncias,
                            denuncias: perfil.denuncias,
                            fotoPerfil: usuarioData.profile_url || "/placeholder.png",
                            nomePerfil: usuarioData.username || `Usuário #${perfil.id}`,
                            name: usuarioData.name || ""
                        };
                    } catch (err) {
                        console.error(`Erro ao buscar usuário ${perfil.id}:`, err);
                        return {
                            id: perfil.id,
                            numDenuncias: perfil.numDenuncias,
                            denuncias: perfil.denuncias,
                            fotoPerfil: "/placeholder.png",
                            nomePerfil: `Usuário #${perfil.id}`,
                            name: ""
                        };
                    }
                })
            );

            setPerfis(perfisComDados);
        } catch (err) {
            console.error("Erro ao buscar denúncias de perfis:", err);
            const detalhe = err.response?.data?.detail || err.message;
            console.error("Detalhes do erro:", detalhe);
        } finally {
            setCarregando(false);
        }
    };

    const ordenarPerfis = (perfisLista) => {
        const perfisOrdenados = [...perfisLista];

        switch (filtroSelecionado) {
            case "Ordem Alfabética":
                return perfisOrdenados.sort((a, b) =>
                    a.nomePerfil.localeCompare(b.nomePerfil)
                );
            case "Mais Denúncias":
                return perfisOrdenados.sort((a, b) => b.numDenuncias - a.numDenuncias);
            case "Mais Recentes":
                return perfisOrdenados.sort((a, b) => b.id - a.id);
            default:
                return perfisOrdenados;
        }
    };

    const obterPerfisFiltrados = () => {
        let perfisFiltrados = perfis;

        if (pesquisa.trim()) {
            perfisFiltrados = perfisFiltrados.filter(perfil =>
                perfil.id.toString().includes(pesquisa) ||
                perfil.nomePerfil.toLowerCase().includes(pesquisa.toLowerCase())
            );
        }

        return ordenarPerfis(perfisFiltrados);
    };

    const handleVisualizar = (id) => {
        console.log("Visualizar perfil:", id);
        navigate(`/moderacao/verPerfil/${id}`);
    };

    const handleNavegacao = (id) => {
        console.log("Navegar perfil:", id);
        navigate(`/moderacao/especPerfil/${id}`);
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
                <div className="lista-anuncios">
                    {obterPerfisFiltrados().map((perfil) => (
                        <PerfilDenuncia
                            key={perfil.id}
                            fotoPerfil={perfil.fotoPerfil}
                            nomePerfil={perfil.nomePerfil}
                            numDenuncias={perfil.numDenuncias}
                            tipoMenu={menuAtivo}
                            onVisualizar={() => handleVisualizar(perfil.id)}
                            onAcao={() => handleNavegacao(perfil.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModeracaoPerfil;
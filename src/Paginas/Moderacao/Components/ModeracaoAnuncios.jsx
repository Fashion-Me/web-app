import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import "./ModeracaoPerfils.css";
import "./ModeracaoAnuncios.css";
import api from "../../../services/authApi";
import { useNavigate } from "react-router-dom";

const TITULO_PAGINA = "ANUNCIOS";
const OPCOES_FILTRO = ["Mais Recentes", "Conteúdo sexual", "Golpe", "Conteúdo ilícito", "Conteúdo pejorativo"];
const MENU_OPCOES = ["DENUNCIADOS", "PUNIDOS"];

const AnuncioDenuncia = ({ fotoAnuncio, tipoDenuncia, onVerMais }) => {
    return (
        <div className="anuncio-denuncia-card">
            <div className="anuncio-foto-container">
                <img src={fotoAnuncio} alt="Anúncio denunciado" className="anuncio-foto" />
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

const ModeracaoAnuncios = () => {
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState(OPCOES_FILTRO[0]);
    const [menuAtivo, setMenuAtivo] = useState(MENU_OPCOES[0]);
    const [pesquisa, setPesquisa] = useState("");
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        buscarAnuncios();
    }, [menuAtivo, filtroSelecionado]);

    const buscarAnuncios = async () => {
        try {
            setCarregando(true);

            // Buscar denúncias de listings
            const responseDenuncias = await api.get('/moderation/reports', {
                params: {
                    target_type: 'listing',
                    skip: 0,
                    limit: 100
                }
            });

            console.log('Denúncias de anúncios:', responseDenuncias.data);

            let denunciasFiltradas = responseDenuncias.data;

            // Filtrar por tipo de denúncia se não for "Mais Recentes"
            if (filtroSelecionado !== "Mais Recentes") {
                const filtroMap = {
                    "Conteúdo sexual": "sexual",
                    "Golpe": "golpe",
                    "Conteúdo ilícito": "ilicito",
                    "Conteúdo pejorativo": "pejorativo"
                };
                const reasonFiltro = filtroMap[filtroSelecionado];
                denunciasFiltradas = denunciasFiltradas.filter(d => d.reason === reasonFiltro);
            }

            // Buscar dados completos dos anúncios
            const anunciosComDados = await Promise.all(
                denunciasFiltradas.map(async (denuncia) => {
                    try {
                        const responseAnuncio = await api.get(`/listings/id/${denuncia.target_id}`);
                        const anuncioData = responseAnuncio.data;

                        return {
                            id: denuncia.id,
                            target_id: denuncia.target_id,
                            reason: denuncia.reason,
                            fotoAnuncio: anuncioData.medias?.[0]?.url || "/placeholder.png",
                            title: anuncioData.title || `Anúncio #${denuncia.target_id}`
                        };
                    } catch (err) {
                        console.error(`Erro ao buscar anúncio ${denuncia.target_id}:`, err);
                        return {
                            id: denuncia.id,
                            target_id: denuncia.target_id,
                            reason: denuncia.reason,
                            fotoAnuncio: "/placeholder.png",
                            title: `Anúncio #${denuncia.target_id}`
                        };
                    }
                })
            );

            setAnuncios(anunciosComDados);
        } catch (err) {
            const detalhe = err.response?.data?.detail || err.message;
            console.error("Erro ao buscar denúncias:", err);
            console.error("Detalhes do erro:", detalhe);
        } finally {
            setCarregando(false);
        }
    };

    const obterAnunciosFiltrados = () => {
        let anunciosFiltrados = anuncios;

        if (pesquisa.trim()) {
            anunciosFiltrados = anunciosFiltrados.filter(anuncio =>
                anuncio.target_id.toString().includes(pesquisa) ||
                anuncio.title.toLowerCase().includes(pesquisa.toLowerCase())
            );
        }

        return anunciosFiltrados;
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

    const handleVerMais = (reportId) => {
        console.log("Enviando para denúncia do anúncio", reportId);
        navigate(`/moderacao/especAnuncio/${reportId}`);
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
                    {obterAnunciosFiltrados().map((anuncio) => (
                        <AnuncioDenuncia
                            key={anuncio.id}
                            fotoAnuncio={anuncio.fotoAnuncio}
                            tipoDenuncia={mapearTipoDenuncia(anuncio.reason)}
                            onVerMais={() => handleVerMais(anuncio.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModeracaoAnuncios;
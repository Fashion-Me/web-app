import React, { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../PagAnuncio/PagAnuncio.css"
import "./ModeracaoEspecAnun.css"
import PerfilHistorico from './Components/PerfilHistorico';
import "@radix-ui/themes/styles.css";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { ArrowLeft, ArrowRight, MapPin, X } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/authApi";

const ModeracaoEspecAnun = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [menuHistorico, setMenuHistorico] = useState("");
    const [modalPenaAberto, setModalPenaAberto] = useState(false);
    const [opcaoPena, setOpcaoPena] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [denuncia, setDenuncia] = useState(null);
    const [anuncio, setAnuncio] = useState(null);
    const [vendedor, setVendedor] = useState(null);
    const [denuncias, setDenuncias] = useState([]);
    const navigate = useNavigate();
    const { reportId } = useParams();

    useEffect(() => {
        buscarDadosDenuncia();
    }, [reportId]);

    const buscarDadosDenuncia = async () => {
        try {
            setCarregando(true);
            console.log('Report ID recebido da URL:', reportId);
            console.log('Tipo do Report ID:', typeof reportId);

            // 1. Buscar dados da denúncia específica
            const urlDenuncia = `/moderation/reports/${reportId}`;
            console.log('URL da requisição:', urlDenuncia);

            const responseDenuncia = await api.get(urlDenuncia);
            const denunciaData = responseDenuncia.data;
            console.log('Dados da denúncia recebidos:', denunciaData);
            setDenuncia(denunciaData);

            // Verificar se target_type é 'listing'
            if (denunciaData.target_type !== 'listing') {
                console.error('Tipo de denúncia incorreto:', denunciaData.target_type);
                throw new Error('Esta denúncia não é de um anúncio');
            }

            // 2. Buscar dados do anúncio
            console.log('Target ID do anúncio:', denunciaData.target_id);
            const urlAnuncio = `/listings/id/${denunciaData.target_id}`;
            console.log('URL do anúncio:', urlAnuncio);

            const responseAnuncio = await api.get(urlAnuncio);
            const anuncioData = responseAnuncio.data;
            console.log('Dados do anúncio recebidos:', anuncioData);
            setAnuncio(anuncioData);

            // 3. Buscar dados do vendedor
            console.log('Seller ID:', anuncioData.seller_id);
            const urlVendedor = `/users/id/${anuncioData.seller_id}`;
            console.log('URL do vendedor:', urlVendedor);

            const responseVendedor = await api.get(urlVendedor);
            const vendedorData = responseVendedor.data;
            console.log('Dados do vendedor recebidos:', vendedorData);
            setVendedor(vendedorData);

            // 4. Buscar histórico de denúncias do vendedor
            await buscarHistoricoDenuncias(anuncioData.seller_id);

        } catch (err) {
            console.error("Erro completo:", err);
            console.error("Resposta do erro:", err.response);
            console.error("Status:", err.response?.status);
            console.error("Dados do erro:", err.response?.data);
            const detalhe = err.response?.data?.detail || err.message;
            console.error("Detalhes do erro:", detalhe);
        } finally {
            setCarregando(false);
        }
    };

    const buscarHistoricoDenuncias = async (sellerId) => {
        try {
            // Buscar denúncias de listings do vendedor
            const responseListings = await api.get('/moderation/reports', {
                params: {
                    target_type: 'listing',
                    skip: 0,
                    limit: 100
                }
            });

            // Buscar denúncias de posts do vendedor
            const responsePosts = await api.get('/moderation/reports', {
                params: {
                    target_type: 'post',
                    skip: 0,
                    limit: 100
                }
            });

            // Buscar denúncias do perfil
            const responsePerfil = await api.get('/moderation/reports', {
                params: {
                    target_type: 'user',
                    skip: 0,
                    limit: 100
                }
            });

            const denunciasListings = responseListings.data || [];
            const denunciasPosts = responsePosts.data || [];
            const denunciasPerfil = responsePerfil.data.filter(d => d.target_id === sellerId) || [];

            // Filtrar apenas denúncias relacionadas ao vendedor
            const denunciasVendedor = [
                ...denunciasPerfil.map(d => `Perfil denunciado por ${mapearMotivoDenuncia(d.reason)}`),
                ...denunciasListings.map(d => `Anúncio denunciado por ${mapearMotivoDenuncia(d.reason)}`),
                ...denunciasPosts.map(d => `Post denunciado por ${mapearMotivoDenuncia(d.reason)}`)
            ];

            setDenuncias(denunciasVendedor);

        } catch (err) {
            console.error("Erro ao buscar histórico de denúncias:", err);
        }
    };

    const mapearMotivoDenuncia = (reason) => {
        const mapaMotivos = {
            "sexual": "conteúdo de cunho sexual/nudez",
            "golpe": "golpe",
            "ilicito": "conteúdo ilícito",
            "pejorativo": "conteúdo pejorativo ou referente a política"
        };
        return mapaMotivos[reason] || reason;
    };

    const mapearCondicao = (condition) => {
        const mapaCondicoes = {
            "new": "NOVO",
            "used": "USADO",
            "like_new": "SEMINOVO"
        };
        return mapaCondicoes[condition] || condition?.toUpperCase();
    };

    const formatarPreco = (priceCents) => {
        const reais = priceCents / 100;
        return `R$ ${reais.toFixed(2).replace('.', ',')}`;
    };

    const proximaImagem = () => {
        if (anuncio?.medias) {
            setImagemAtual((prev) => (prev + 1) % anuncio.medias.length);
        }
    };

    const imagemAnterior = () => {
        if (anuncio?.medias) {
            setImagemAtual((prev) => (prev - 1 + anuncio.medias.length) % anuncio.medias.length);
        }
    };

    const selecionarImagem = (index) => {
        setImagemAtual(index);
    };

    const handleVerPerfil = () => {
        if (vendedor) {
            console.log("Ver perfil:", vendedor.id);
            navigate(`/moderacao/verPerfil/${vendedor.id}`);
        }
    };

    const handleRetirarDenuncia = async () => {
        try {
            // Implementar lógica para retirar denúncia
            console.log('Retirar denúncia:', reportId);
            // await api.delete(`/moderation/reports/${reportId}`);
            // navigate('/moderacao/anuncios');
        } catch (err) {
            console.error("Erro ao retirar denúncia:", err);
        }
    };

    const handleExcluirAnuncio = async () => {
        try {
            if (window.confirm('Tem certeza que deseja excluir este anúncio?')) {
                // Implementar lógica para excluir anúncio
                console.log('Excluir anúncio:', anuncio?.id);
                // await api.delete(`/listings/${anuncio?.id}`);
                // navigate('/moderacao/anuncios');
            }
        } catch (err) {
            console.error("Erro ao excluir anúncio:", err);
        }
    };

    if (carregando) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} acesso={"mod"} />
                )}
                <div className="conteudo-anuncio">
                    <div style={{ textAlign: 'center', padding: '40px', color: '#EFEFEF' }}>
                        Carregando dados da denúncia...
                    </div>
                </div>
            </div>
        );
    }

    if (!denuncia || !anuncio || !vendedor) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} acesso={"mod"} />
                )}
                <div className="conteudo-anuncio">
                    <div style={{ textAlign: 'center', padding: '40px', color: '#EFEFEF' }}>
                        Erro ao carregar dados. Tente novamente.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='PagAnuncio'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} acesso={"mod"} />
            )}
            <div className="conteudo-anuncio">
                <div className="FundoHamburguerCarrinho"></div>
                <div className="header-anuncio">
                    <button className="btn-voltar-Anuncio" onClick={() => window.history.back()}>
                        <ArrowLeft size={22} strokeWidth={3} />
                        VOLTAR
                    </button>
                </div>
                <div className="main-content">
                    <div className="carousel-container">
                        <div className="carousel-main">
                            <button onClick={imagemAnterior} className="carousel-btn prev">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="imagem-principal">
                                <img
                                    src={anuncio.medias[imagemAtual]?.url || "/placeholder.png"}
                                    alt="Produto"
                                />
                            </div>
                            <button onClick={proximaImagem} className="carousel-btn next">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        <div className="thumbnails">
                            {anuncio.medias.map((media, index) => (
                                <div
                                    key={media.id}
                                    className={`thumbnail ${index === imagemAtual ? 'active' : ''}`}
                                    onClick={() => selecionarImagem(index)}
                                >
                                    <img src={media.url} alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="produto-info">
                        <h1 className="produto-titulo">{anuncio.title}</h1>
                        <p className="produto-preco">{formatarPreco(anuncio.price_cents)}</p>

                        <div className="botoes-acao">
                            <button id="btnPunir" onClick={handleRetirarDenuncia}>
                                RETIRAR DENUNCIA
                            </button>
                            <button id="btnExcluir" onClick={handleExcluirAnuncio}>
                                EXCLUIR ANÚNCIO
                            </button>
                        </div>
                        <div className="descricao-section">
                            <h3>Descrição do produto</h3>
                            <p className="produto-descricao">{anuncio.description}</p>
                        </div>
                        <div className="descricao-section">
                            <h3>Motivo da denúncia</h3>
                            <p className="produto-descricao">
                                {mapearMotivoDenuncia(denuncia.reason)}
                                {denuncia.description && ` - ${denuncia.description}`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="info-adicional">
                    <div className="info-container">
                        <div className="info-produto">
                            <h3>Informações do produto</h3>
                            <div className="info-item">
                                <span className="info-label">Tamanho</span>
                                <span className="info-value">{anuncio.size || "Não informado"}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Estado</span>
                                <span className="info-value">{mapearCondicao(anuncio.condition)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Categoria</span>
                                <span className="info-value">{anuncio.category?.toUpperCase() || "Não informado"}</span>
                            </div>
                        </div>

                        <div className="info-vendedor" onClick={handleVerPerfil}>
                            <h3>Vendedor</h3>
                            <div className="vendedor-card">
                                <div className="vendedor-avatar">
                                    <img
                                        src={vendedor.profile_url || "/placeholder.png"}
                                        alt={vendedor.username}
                                    />
                                </div>
                                <div className="vendedor-detalhes">
                                    <div className="vendedor-nome">{vendedor.username}</div>
                                    <div className="vendedor-stats">
                                        Produtos anunciados: <strong>{vendedor.posts_count || 0}</strong>
                                    </div>
                                    <div className="vendedor-stats">
                                        Desde: <strong>{new Date(vendedor.created_at).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PerfilHistorico
                        denuncias={denuncias}
                        menuAtivo={menuHistorico}
                        setMenuAtivo={setMenuHistorico}
                    />

                    {modalPenaAberto && (
                        <div className="modalOverlay" onClick={() => setModalPenaAberto(false)}>
                            <div className="modalPena" onClick={(e) => e.stopPropagation()}>
                                <div className="modalHeader">
                                    <h2 className="textoBranco">Mudar Pena</h2>
                                    <button
                                        onClick={() => setModalPenaAberto(false)}
                                        className="btnFecharModal"
                                    >
                                        <X size={32} cor={'#efefef'} />
                                    </button>
                                </div>

                                <p className="modalDescricao">
                                    'Pena' se refere aos tipos de punições que a conta irá sofrer, podendo ser aplicado o banimento temporário ou permanente
                                </p>

                                <div className="modalOpcoes">
                                    <label className="opcaoPena">
                                        <input
                                            type="radio"
                                            name="pena"
                                            value="permanente"
                                            checked={opcaoPena === 'permanente'}
                                            onChange={(e) => setOpcaoPena(e.target.value)}
                                        />
                                        <p className={opcaoPena === 'permanente' ? 'textoVermelho' : 'textoBranco'}>
                                            Banimento Permanente
                                        </p>
                                    </label>

                                    <label className="opcaoPena">
                                        <input
                                            type="radio"
                                            name="pena"
                                            value="24h"
                                            checked={opcaoPena === '24h'}
                                            onChange={(e) => setOpcaoPena(e.target.value)}
                                        />
                                        <p className={opcaoPena === '24h' ? 'textoAzul' : 'textoBranco'}>
                                            Punido no periodo de 24h
                                        </p>
                                    </label>

                                    <label className="opcaoPena">
                                        <input
                                            type="radio"
                                            name="pena"
                                            value="72h"
                                            checked={opcaoPena === '72h'}
                                            onChange={(e) => setOpcaoPena(e.target.value)}
                                        />
                                        <p className={opcaoPena === '72h' ? 'textoAzul' : 'textoBranco'}>
                                            Punido no periodo de 72h
                                        </p>
                                    </label>

                                    <label className="opcaoPena">
                                        <input
                                            type="radio"
                                            name="pena"
                                            value="1semana"
                                            checked={opcaoPena === '1semana'}
                                            onChange={(e) => setOpcaoPena(e.target.value)}
                                        />
                                        <p className={opcaoPena === '1semana' ? 'textoAzul' : 'textoBranco'}>
                                            Punido no periodo de 1 semana
                                        </p>
                                    </label>
                                </div>

                                <div className="modalBotoes">
                                    <button
                                        className="btnConfirmar"
                                        disabled={!opcaoPena}
                                        onClick={() => {
                                            console.log('Pena aplicada:', opcaoPena);
                                            setModalPenaAberto(false);
                                            setOpcaoPena('');
                                        }}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModeracaoEspecAnun;
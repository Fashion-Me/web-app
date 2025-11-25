import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/authApi";
import Menu from '../../Componentes/Menu';
import "./PagAnuncio.css";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Star, MessagesSquare, CircleAlert, ArrowLeft, ArrowRight, X } from 'lucide-react';
import Carrinho from "../../Componentes/Carrinho";

const PagAnuncioVer = () => {
    const { id } = useParams();
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [modalDenunciaAberto, setModalDenunciaAberto] = useState(false);
    const [opcaoDenuncia, setOpcaoDenuncia] = useState('');
    const navigate = useNavigate();

    const [produto, setProduto] = useState(null);
    const [vendedor, setVendedor] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoritoCarregando, setFavoritoCarregando] = useState(false);
    const [adicionandoCarrinho, setAdicionandoCarrinho] = useState(false);
    const [iniciandoConversa, setIniciandoConversa] = useState(false);

    useEffect(() => {
        const buscarAnuncio = async () => {
            try {
                setCarregando(true);
                setErro(null);

                console.log('Buscando anúncio com ID:', id);
                const response = await api.get(`/listings/id/${id}`);
                console.log('Resposta da API:', response.data);

                if (!response.data) {
                    throw new Error('Anúncio não encontrado');
                }

                setProduto({
                    id: response.data.id,
                    seller_id: response.data.seller_id,
                    titulo: response.data.title,
                    preco: `R$ ${(response.data.price_cents / 100).toFixed(2).replace('.', ',')}`,
                    descricao: response.data.description,
                    tamanho: response.data.size,
                    estado: response.data.condition === 'new' ? 'NOVO' : 'USADO',
                    categoria: response.data.category.toUpperCase(),
                    imagens: response.data.medias?.length > 0
                        ? response.data.medias.sort((a, b) => a.position - b.position).map(m => m.url)
                        : ['https://via.placeholder.com/400x400?text=Sem+Imagem']
                });

                // Verificar se o anúncio já está favoritado
                setIsFavorited(response.data.is_liked || false);

                // Buscar informações do vendedor
                if (response.data.seller_id) {
                    try {
                        console.log('Buscando vendedor com ID:', response.data.seller_id);
                        const userIdResponse = await api.get(`/users/id/${response.data.seller_id}`);
                        console.log('Username do vendedor:', userIdResponse.data.username);

                        const vendedorResponse = await api.get(`/users/${userIdResponse.data.username}`);
                        console.log('Dados completos do vendedor:', vendedorResponse.data);

                        const formatarData = (dataISO) => {
                            if (!dataISO) return 'Data não disponível';
                            const data = new Date(dataISO);
                            const dia = String(data.getDate()).padStart(2, '0');
                            const mes = String(data.getMonth() + 1).padStart(2, '0');
                            const ano = data.getFullYear();
                            return `${dia}/${mes}/${ano}`;
                        };

                        if (vendedorResponse.data) {
                            setVendedor({
                                id: vendedorResponse.data.id,
                                nome: vendedorResponse.data.name || vendedorResponse.data.username || "Nome não disponível",
                                username: vendedorResponse.data.username,
                                avatar: vendedorResponse.data.profile_url || 'https://via.placeholder.com/80x80?text=Avatar',
                                produtosAnunciados: vendedorResponse.data.posts_count || 0,
                                dataCriacao: formatarData(vendedorResponse.data.created_at),
                            });
                        } else {

                            console.warn('Dados do vendedor vazios');
                            setVendedor(null);
                        }
                    } catch (vendedorErr) {
                        console.error("Erro ao buscar vendedor:", vendedorErr);
                        console.error("Status do erro:", vendedorErr.response?.status);
                        console.error("Dados do erro:", vendedorErr.response?.data);
                        setVendedor(null);
                    }
                }
            } catch (err) {
                console.error("Erro ao buscar anúncio:", err);
                console.error("Detalhes do erro:", err.response?.data);
                setErro(err.response?.data?.message || err.message || "Não foi possível carregar o anúncio.");
            } finally {
                setCarregando(false);
            }
        };

        if (id) {
            buscarAnuncio();
        } else {
            setErro("ID do anúncio não fornecido");
            setCarregando(false);
        }
    }, [id]);

    const handleFavoriteClick = async () => {
        if (favoritoCarregando) return;

        try {
            setFavoritoCarregando(true);

            if (isFavorited) {
                // Se já está favoritado, desfavoritar
                await api.delete(`/listings/${id}/like`);
                setIsFavorited(false);
                console.log('Anúncio desfavoritado');
            } else {
                // Se não está favoritado, favoritar
                await api.post(`/listings/${id}/like`);
                setIsFavorited(true);
                console.log('Anúncio favoritado');
            }
        } catch (err) {
            console.error("Erro ao favoritar/desfavoritar:", err);
            console.error("Detalhes do erro:", err.response?.data);

            // Se der erro de autenticação, pode redirecionar para login
            if (err.response?.status === 401) {
                alert('Você precisa estar logado para favoritar anúncios');
                navigate('/login');
            } else {
                alert('Erro ao favoritar o anúncio. Tente novamente.');
            }
        } finally {
            setFavoritoCarregando(false);
        }
    };

    const handleAdicionarCarrinho = async () => {
        if (adicionandoCarrinho) return;

        try {
            setAdicionandoCarrinho(true);

            console.log('Adicionando ao carrinho, listing_id:', produto.id);
            const response = await api.post('/cart/items', {
                listing_id: produto.id
            });

            console.log('Resposta ao adicionar ao carrinho:', response.data);

            // Exibir mensagem de sucesso
            alert('Produto adicionado ao carrinho com sucesso!');

        } catch (err) {
            console.error("Erro ao adicionar ao carrinho:", err);
            console.error("Detalhes do erro:", err.response?.data);

            if (err.response?.status === 401) {
                alert('Você precisa estar logado para adicionar ao carrinho');
                navigate('/login');
            } else if (err.response?.status === 400) {
                alert('Este produto já está no seu carrinho');
            } else {
                alert('Erro ao adicionar ao carrinho. Tente novamente.');
            }
        } finally {
            setAdicionandoCarrinho(false);
        }
    }

    const handleIniciarConversa = async () => {
        if (iniciandoConversa || !vendedor) return;

        try {
            setIniciandoConversa(true);

            console.log('Iniciando conversa com vendedor ID:', vendedor.id);
            await api.post('/chats', {
                other_user_id: vendedor.id
            });

            console.log('Conversa iniciada com sucesso');
            navigate('/mensagens');

        } catch (err) {
            console.error("Erro ao iniciar conversa:", err);
            console.error("Detalhes do erro:", err.response?.data);

            if (err.response?.status === 401) {
                alert('Você precisa estar logado para enviar mensagens');
                navigate('/login');
            } else if (err.response?.status === 400) {
                // Conversa já existe, apenas redirecionar
                console.log('Conversa já existe, redirecionando...');
                navigate('/mensagens');
            } else {
                alert('Erro ao iniciar conversa. Tente novamente.');
            }
        } finally {
            setIniciandoConversa(false);
        }
    };

    const handleLinkVendedor = () => {
        if (produto) {
            navigate(`/perfil`, { state: { userId: produto.seller_id } });
        }
    };

    const proximaImagem = () => {
        if (produto?.imagens) {
            setImagemAtual((prev) => (prev + 1) % produto.imagens.length);
        }
    };

    const imagemAnterior = () => {
        if (produto?.imagens) {
            setImagemAtual((prev) => (prev - 1 + produto.imagens.length) % produto.imagens.length);
        }
    };

    const selecionarImagem = (index) => {
        setImagemAtual(index);
    };

    if (carregando) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} />
                )}
                <div className="conteudo-anuncio">
                    <p style={{ textAlign: 'center', padding: '50px' }}>Carregando anúncio...</p>
                </div>
            </div>
        );
    }

    if (erro || !produto) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} />
                )}
                <div className="conteudo-anuncio">
                    <p style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                        {erro || "Anúncio não encontrado"}
                    </p>
                    <button onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </div>
        );
    }

    return (
        <div className='PagAnuncio'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <div className="conteudo-anuncio">
                <div className="FundoHamburguerCarrinho"></div>
                <Carrinho className="Clicavel"/>
                <div className="header-anuncio">
                    <button className="btn-voltar-Anuncio" onClick={() => window.history.back()}>
                        <ArrowLeft size={22} strokeWidth={3}/>
                        VOLTAR
                    </button>
                </div>
                <div className="main-content">
                    <div className="carousel-container">
                        <div className="carousel-main">
                            {produto.imagens.length > 1 && (
                                <button onClick={imagemAnterior} className="carousel-btn prev">
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <div className="imagem-principal">
                                <img src={produto.imagens[imagemAtual]} alt="Produto" />
                            </div>
                            {produto.imagens.length > 1 && (
                                <button onClick={proximaImagem} className="carousel-btn next">
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>
                        {produto.imagens.length > 1 && (
                            <div className="thumbnails">
                                {produto.imagens.map((imagem, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${index === imagemAtual ? 'active' : ''}`}
                                        onClick={() => selecionarImagem(index)}
                                    >
                                        <img src={imagem} alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="icons-middle">
                        <button
                            className="icon-btn"
                            onClick={handleFavoriteClick}
                            disabled={favoritoCarregando}
                            style={{ opacity: favoritoCarregando ? 0.6 : 1 }}
                        >
                            <Star
                                size={40}
                                fill={isFavorited ? "#4066FF" : "none"}
                                stroke={isFavorited ? "#4066FF" : "currentColor"}
                                style={{ cursor: favoritoCarregando ? 'wait' : 'pointer' }}
                            />
                        </button>
                        <button
                            className="icon-btn"
                            onClick={handleIniciarConversa}
                            disabled={iniciandoConversa || !vendedor}
                            style={{
                                opacity: (iniciandoConversa || !vendedor) ? 0.6 : 1,
                                cursor: (iniciandoConversa || !vendedor) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <MessagesSquare size={40} />
                        </button>
                        <button className="icon-btn" onClick={() => setModalDenunciaAberto(true)}>
                            <CircleAlert size={40} />
                        </button>
                    </div>

                    <div className="produto-info">
                        <h1 className="produto-titulo">{produto.titulo}</h1>
                        <p className="produto-preco">{produto.preco}</p>

                        <div className="botoes-acao">
                            <button className="btn-comprar">
                                COMPRAR AGORA
                            </button>
                            <button
                                className="btn-carrinho"
                                onClick={handleAdicionarCarrinho}
                                disabled={adicionandoCarrinho}
                                style={{
                                    opacity: adicionandoCarrinho ? 0.6 : 1,
                                    cursor: adicionandoCarrinho ? 'wait' : 'pointer'
                                }}
                            >
                                {adicionandoCarrinho ? 'ADICIONANDO...' : 'ADICIONAR AO CARRINHO'}
                            </button>
                        </div>

                        <div className="descricao-section">
                            <h3>Descrição do produto</h3>
                            <p className="produto-descricao">{produto.descricao}</p>
                        </div>
                    </div>
                </div>

                <div className="info-adicional">
                    <div className="info-container">
                        <div className="info-produto">
                            <h3>Informações do produto</h3>
                            <div className="info-item">
                                <span className="info-label">Tamanho</span>
                                <span className="info-value">{produto.tamanho}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Estado</span>
                                <span className="info-value">{produto.estado}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Categoria</span>
                                <span className="info-value">{produto.categoria}</span>
                            </div>
                        </div>

                        {vendedor && (
                            <div className="info-vendedor" onClick={handleLinkVendedor}>
                                <h3>Vendedor</h3>
                                <div className="vendedor-card">
                                    <div className="vendedor-avatar">
                                        <img src={vendedor.avatar} alt={vendedor.nome} />
                                    </div>
                                    <div className="vendedor-detalhes">
                                        <div className="vendedor-nome">{vendedor.nome}</div>
                                        <div className="vendedor-stats">
                                            Produtos anunciados: <strong>{vendedor.produtosAnunciados}</strong>
                                        </div>
                                        <div className="vendedor-stats">
                                            Desde: <strong>{vendedor.dataCriacao}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {modalDenunciaAberto && (
                        <div className="modal-overlay" onClick={() => setModalDenunciaAberto(false)}>
                            <div className="modal-denuncia" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <CircleAlert size={32} className="modal-icon" />
                                    <h2>Denunciar</h2>
                                    <button
                                        onClick={() => setModalDenunciaAberto(false)}
                                        style={{
                                            marginLeft: 'auto',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '8px'
                                        }}
                                    >
                                        <X size={32} cor={'#efefef'} />
                                    </button>
                                </div>

                                <p className="modal-descricao">
                                    Sua denúncia é anônima e não será notificada para a loja referente ao anúncio
                                </p>

                                <div className="modal-opcoes">
                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="sexual"
                                            checked={opcaoDenuncia === 'sexual'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo de cunho sexual, nudez
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="golpe"
                                            checked={opcaoDenuncia === 'golpe'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo se trata à um golpe
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="ilicito"
                                            checked={opcaoDenuncia === 'ilicito'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo ilícito, fora da lei
                                    </label>

                                    <label className="opcao-denuncia">
                                        <input
                                            type="radio"
                                            name="denuncia"
                                            value="pejorativo"
                                            checked={opcaoDenuncia === 'pejorativo'}
                                            onChange={(e) => setOpcaoDenuncia(e.target.value)}
                                        />
                                        Conteúdo pejorativo ou referente a política
                                    </label>
                                </div>

                                <div className="modal-botoes">
                                    <button
                                        className="btn-confirmar"
                                        disabled={!opcaoDenuncia}
                                        onClick={() => {
                                            console.log('Denúncia:', opcaoDenuncia);
                                            setModalDenunciaAberto(false);
                                            setOpcaoDenuncia('');
                                        }}
                                    >
                                        CONFIRMAR
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

export default PagAnuncioVer;


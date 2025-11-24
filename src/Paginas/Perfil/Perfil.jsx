import React , { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "../../css/Home.css"
import "@radix-ui/themes/styles.css";
import {useNavigate, useSearchParams, useParams} from "react-router-dom";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import '../Pesquisar/Pesquisar.css';
import './Perfil.css';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import Anuncio from '../../Componentes/ConjAnuncio/Anuncio';
import api from "../../services/authApi";

// Imagens padrão
import FundoPerfil from "../../Imagens/camisetas.png";
import fotoPerfil from "../../Imagens/FotoPerfil.png";
import imagemPadrao from "../../Imagens/AnuncioCasaco.png";


const Perfil = (props) => {
    const navigate = useNavigate();
    const { username: usernameUrl } = useParams();

    const [dadosPerfil, setDadosPerfil] = useState({
        id: null,
        username: '',
        profile_url: fotoPerfil,
        background_url: FundoPerfil,
        bio: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [carregandoAnuncios, setCarregandoAnuncios] = useState(true);

    // Estados para anúncios por categoria
    const [produtosUltimosProd, setProdutosUltimosProd] = useState([]);
    const [produtosCamisetas, setProdutosCamisetas] = useState([]);
    const [produtosCalcas, setProdutosCalcas] = useState([]);
    const [produtosCalcados, setProdutosCalcados] = useState([]);
    const [produtosAcessorios, setProdutosAcessorios] = useState([]);

    const [pesquisaPerfil, setPesquisaPerfil] = useState("");
    const [anunciosFiltrados, setAnunciosFiltrados] = useState([]);
    const [buscaAtiva, setBuscaAtiva] = useState(false);

    const calculateItemsToShow = () => {
        if (window.innerWidth <= 300)       { return 1; }
        else if (window.innerWidth <= 720) { return 2; }
        else if (window.innerWidth <= 1150) { return 3; }
        else if (window.innerWidth <= 1350) { return 4; }
        else if (window.innerWidth <= 1560) { return 5; }
        else { return 6; }
    };
    const [itemsToShow, setItemsToShow] = useState(calculateItemsToShow());

    const [startIndexUltimosProd, setStartIndexUltimosProd] = useState(0);
    const [startIndexCamisetas, setStartIndexCamisetas] = useState(0);
    const [startIndexCalcas, setStartIndexCalcas] = useState(0);
    const [startIndexCalcados, setStartIndexCalcados] = useState(0);
    const [startIndexAcessorios, setStartIndexAcessorios] = useState(0);

    useEffect(() => {
        const buscarDadosPerfil = async () => {
            try {
                setCarregando(true);
                let username = usernameUrl;

                // Se for perfil próprio, busca username do usuário logado
                if (props.minha) {
                    const responseMe = await api.get("/users/me");
                    username = responseMe.data.username;
                }

                // Busca dados completos do perfil
                const response = await api.get(`/users/${username}`);
                const { id, username: nome, profile_url, background_url, bio } = response.data;

                setDadosPerfil({
                    id,
                    username: nome,
                    profile_url: profile_url || fotoPerfil,
                    background_url: background_url || FundoPerfil,
                    bio: bio || ''
                });
            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
                // Mantém dados padrão em caso de erro
            } finally {
                setCarregando(false);
            }
        };

        buscarDadosPerfil();
    }, [props.minha, usernameUrl]);

    useEffect(() => {
        const buscarAnunciosPorCategoria = async () => {
            if (!dadosPerfil.id) return;

            try {
                setCarregandoAnuncios(true);

                // Mapear categorias para inglês
                const categorias = {
                    shirt: setProdutosCamisetas,
                    pants: setProdutosCalcas,
                    shoes: setProdutosCalcados,
                    accessories: setProdutosAcessorios
                };

                // Buscar anúncios gerais (últimos produtos)
                const responseGeral = await api.get(`/listings/${dadosPerfil.id}`);
                const anunciosGerais = (responseGeral.data || []).map(formatarAnuncio);
                setProdutosUltimosProd(anunciosGerais);

                // Buscar anúncios por categoria
                for (const [categoria, setEstado] of Object.entries(categorias)) {
                    try {
                        const response = await api.get(`/listings/${dadosPerfil.id}/category/${categoria}`);
                        const anuncios = (response.data || []).map(formatarAnuncio);
                        setEstado(anuncios);
                    } catch (err) {
                        console.error(`Erro ao buscar anúncios da categoria ${categoria}:`, err);
                        setEstado([]);
                    }
                }
            } catch (err) {
                console.error("Erro ao buscar anúncios:", err);
            } finally {
                setCarregandoAnuncios(false);
            }
        };

        buscarAnunciosPorCategoria();
    }, [dadosPerfil.id]);

    const buscarAnunciosDoUsuario = async (termoBusca) => {
        if (!dadosPerfil.id) return;

        try {
            setCarregandoAnuncios(true);

            const params = {
                seller_id: dadosPerfil.id
            };

            if (termoBusca.trim()) {
                params.q = termoBusca.trim();
            }

            const response = await api.get("/listings/search", { params });
            const anuncios = (response.data || []).map(formatarAnuncio);

            setAnunciosFiltrados(anuncios);
            setBuscaAtiva(true);
        } catch (err) {
            console.error("Erro ao buscar anúncios:", err);
            setAnunciosFiltrados([]);
        } finally {
            setCarregandoAnuncios(false);
        }
    };

    const handleBuscarPerfil = () => {
        if (pesquisaPerfil.trim()) {
            buscarAnunciosDoUsuario(pesquisaPerfil);
        } else {
            // Se a busca estiver vazia, limpa os resultados filtrados
            setBuscaAtiva(false);
            setAnunciosFiltrados([]);
        }
    };

    const handleKeyPressPerfil = (e) => {
        if (e.key === 'Enter') {
            handleBuscarPerfil();
        }
    };

    const limparBusca = () => {
        setPesquisaPerfil("");
        setBuscaAtiva(false);
        setAnunciosFiltrados([]);
    };

    const formatarAnuncio = (anuncio) => {
        const imagemPrincipal = anuncio.medias && anuncio.medias.length > 0
            ? anuncio.medias.sort((a, b) => a.position - b.position)[0].url
            : imagemPadrao;

        const precoReais = (anuncio.price_cents / 100).toFixed(2);

        return {
            id: anuncio.id,
            preco: precoReais,
            imagem: imagemPrincipal,
            onClick: props.minha
                ? () => navigate(`/AnuncioEdit/${anuncio.id}`)
                : () => navigate(`/anuncio/${anuncio.id}`)
        };
    };

    const handleNextUltimosProd = () => {
        if (startIndexUltimosProd + itemsToShow < produtosUltimosProd.length) {
            setStartIndexUltimosProd((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrevUltimosProd = () => {
        if (startIndexUltimosProd > 0) {
            setStartIndexUltimosProd((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextCamisetas = () => {
        if (startIndexCamisetas + itemsToShow < produtosCamisetas.length) {
            setStartIndexCamisetas((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrevCamisetas = () => {
        if (startIndexCamisetas > 0) {
            setStartIndexCamisetas((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextCalcas = () => {
        if (startIndexCalcas + itemsToShow < produtosCalcas.length) {
            setStartIndexCalcas((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrevCalcas = () => {
        if (startIndexCalcas > 0) {
            setStartIndexCalcas((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextCalcados = () => {
        if (startIndexCalcados + itemsToShow < produtosCalcados.length) {
            setStartIndexCalcados((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrevCalcados = () => {
        if (startIndexCalcados > 0) {
            setStartIndexCalcados((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextAcessorios = () => {
        if (startIndexAcessorios + itemsToShow < produtosAcessorios.length) {
            setStartIndexAcessorios((prevIndex) => prevIndex + 1);
        }
    };
    const handlePrevAcessorios = () => {
        if (startIndexAcessorios > 0) {
            setStartIndexAcessorios((prevIndex) => prevIndex - 1);
        }
    };

    const handleEditar = () => {
        navigate(`/configuracao/EditarPerfil`);
    };

    const handleDenunciar = () => {
        console.log("Denunciar perfil");
    };

    const isAtStartUltimosProd = startIndexUltimosProd === 0;
    const isAtEndUltimosProd = startIndexUltimosProd + itemsToShow >= produtosUltimosProd.length;

    const isAtStartCamisetas = startIndexCamisetas === 0;
    const isAtEndCamisetas = startIndexCamisetas + itemsToShow >= produtosCamisetas.length;

    const isAtStartCalcas = startIndexCalcas === 0;
    const isAtEndCalcas = startIndexCalcas + itemsToShow >= produtosCalcas.length;

    const isAtStartCalcados = startIndexCalcados === 0;
    const isAtEndCalcados = startIndexCalcados + itemsToShow >= produtosCalcados.length;

    const isAtStartAcessorios = startIndexAcessorios === 0;
    const isAtEndAcessorios = startIndexAcessorios + itemsToShow >= produtosAcessorios.length;

    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo();
    const [searchParams] = useSearchParams();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
            setItemsToShow(calculateItemsToShow());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (carregando) {
        return (
            <div className="Home">
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} acesso={props.acesso} />
                )}
                <main className="Conteudo ConteudoPerfil">
                    <p style={{ textAlign: 'center', padding: '50px' }}>Carregando perfil...</p>
                </main>
            </div>
        );
    }

    const renderSecaoAnuncios = (titulo, produtos, startIndex, handlePrev, handleNext, isAtStart, isAtEnd) => {
        if (carregandoAnuncios) {
            return (
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">{titulo}</h2>
                    <p style={{ textAlign: 'center', padding: '20px' }}>Carregando...</p>
                </section>
            );
        }

        if (produtos.length === 0) {
            return null; // Não renderiza a seção se não houver produtos
        }

        return (
            <section className="UltimosProdutos">
                <h2 className="TituloSecao">{titulo}</h2>
                <div className="CarrosselProdutos">
                    <button
                        className={`BotaoCarrossel Esquerda ${isAtStart ? 'desabilitado' : ''}`}
                        onClick={handlePrev}
                    >
                        <ArrowLeft size={24}/>
                    </button>
                    <div className="ConjAnuncioPerfil">
                        {produtos.slice(startIndex, startIndex + itemsToShow).map((produto) => (
                            <Anuncio
                                key={produto.id}
                                preco={produto.preco}
                                imgFundo={produto.imagem}
                                editar={props.minha}
                                onClick={produto.onClick}
                            />
                        ))}
                    </div>
                    <button
                        className={`BotaoCarrossel Direita ${isAtEnd ? 'desabilitado' : ''}`}
                        onClick={handleNext}
                    >
                        <ArrowRight size={24}/>
                    </button>
                </div>
            </section>
        );
    };

    return (
        <div className='Home'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} acesso={props.acesso} />
            )}
            <main className="Conteudo ConteudoPerfil">
                <div className="PerfilHeader" style={{ backgroundImage: `url(${dadosPerfil.background_url})` }}>
                </div>
                <div className="PerfilInfo">
                    <img
                        src={dadosPerfil.profile_url}
                        alt={`Foto de ${dadosPerfil.username}`}
                        className="FotoPerfil"
                        onError={(e) => { e.target.src = fotoPerfil; }}
                    />
                    <h1 className="NomeUsuario">{dadosPerfil.username}</h1>
                    <h2>Sobre</h2>
                    <p className="BioUsuario">{dadosPerfil.bio || "Nenhuma biografia disponível"}</p>
                    {props.minha ? (
                        <button
                            className="btnEditarPerfil"
                            onClick={handleEditar}
                        >
                            <p>Editar Perfil</p>
                        </button>
                    ) : (
                        <button
                            className="btnEditarPerfil"
                            onClick={handleDenunciar}
                        >
                            <p>Denunciar</p>
                        </button>
                    )}
                </div>
                <div className="divBarraPesquisa">
                    <div className="barraPesquisa">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={pesquisaPerfil}
                            onChange={(e) => setPesquisaPerfil(e.target.value)}
                            onKeyPress={handleKeyPressPerfil}
                        />
                        <Search
                            className="iconeLupa"
                            size={24}
                            color="#efefef"
                            onClick={handleBuscarPerfil}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {buscaAtiva ? (
                    <section className="UltimosProdutos">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className="TituloSecao">Resultados da busca "{pesquisaPerfil}"</h2>
                            <button
                                onClick={limparBusca}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '5px 10px',
                                    textDecoration: 'none',
                                    color: '#007BFF',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                Limpar busca
                            </button>
                        </div>
                        {carregandoAnuncios ? (
                            <p style={{ textAlign: 'center', padding: '20px' }}>Carregando...</p>
                        ) : anunciosFiltrados.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum anúncio encontrado</p>
                        ) : (
                            <div className="ConjAnuncioPerfil" style={{ flexWrap: 'wrap', gap: '10px' }}>
                                {anunciosFiltrados.map((produto) => (
                                    <Anuncio
                                        key={produto.id}
                                        preco={produto.preco}
                                        imgFundo={produto.imagem}
                                        editar={props.minha}
                                        onClick={produto.onClick}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ) : (
                    <>
                        {renderSecaoAnuncios(
                            "Meus Últimos Produtos",
                            produtosUltimosProd,
                            startIndexUltimosProd,
                            handlePrevUltimosProd,
                            handleNextUltimosProd,
                            isAtStartUltimosProd,
                            isAtEndUltimosProd
                        )}

                        {renderSecaoAnuncios(
                            "Suas Camisetas",
                            produtosCamisetas,
                            startIndexCamisetas,
                            handlePrevCamisetas,
                            handleNextCamisetas,
                            isAtStartCamisetas,
                            isAtEndCamisetas
                        )}

                        {renderSecaoAnuncios(
                            "Suas Calças",
                            produtosCalcas,
                            startIndexCalcas,
                            handlePrevCalcas,
                            handleNextCalcas,
                            isAtStartCalcas,
                            isAtEndCalcas
                        )}

                        {renderSecaoAnuncios(
                            "Seus Calçados",
                            produtosCalcados,
                            startIndexCalcados,
                            handlePrevCalcados,
                            handleNextCalcados,
                            isAtStartCalcados,
                            isAtEndCalcados
                        )}

                        {renderSecaoAnuncios(
                            "Seus Acessórios",
                            produtosAcessorios,
                            startIndexAcessorios,
                            handlePrevAcessorios,
                            handleNextAcessorios,
                            isAtStartAcessorios,
                            isAtEndAcessorios
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Perfil;


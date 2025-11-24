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
import imgAnuncioCamiseta from "../../Imagens/AnuncioCamisa.png";
import imgAnuncioCamiseta2 from "../../Imagens/CamisaPretaLisa.jpg";
import CamisetaVermelha from "../../Imagens/CamisetaVermelha1.webp";
import imgAnuncioCasaco from "../../Imagens/AnuncioCasaco.png";
import imgAnuncioCalca from "../../Imagens/AnuncioCalca.png";
import imgAnuncioCalca2 from "../../Imagens/CalcaPreta.webp";
import imgAnuncioCalcado from "../../Imagens/AnuncioCalcado.png";
import imgAnuncioCalcado2 from "../../Imagens/SapatoCouroMarrom.jpg";
import imgAnuncioAcessorio from "../../Imagens/AnuncioAcessorio.png";
import imgAnuncioAcessorio2 from "../../Imagens/FundoBtnAcessorios.png";

import FundoPerfil from "../../Imagens/camisetas.png";
import fotoPerfil from "../../Imagens/FotoPerfil.png";


const Perfil = (props) => {
    const navigate = useNavigate();
    const { username: usernameUrl } = useParams();

    const [dadosPerfil, setDadosPerfil] = useState({
        username: '',
        profile_url: fotoPerfil,
        background_url: FundoPerfil,
        bio: ''
    });
    const [carregando, setCarregando] = useState(true);

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
                const { username: nome, profile_url, background_url, bio } = response.data;

                setDadosPerfil({
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

    const produtosUltimosProd = [
        { preco: '450', imagem: CamisetaVermelha, onClick: () => navigate("/anuncioEdit") },
        { preco: '20', imagem: imgAnuncioCasaco },
        { preco: '30', imagem: imgAnuncioCalca },
        { preco: '40', imagem: imgAnuncioCalcado },
        { preco: '50', imagem: imgAnuncioAcessorio },
        { preco: '60', imagem: imgAnuncioCasaco },
        { preco: '70', imagem: imgAnuncioCalca },
        { preco: '80', imagem: imgAnuncioAcessorio },
        { preco: '90', imagem: imgAnuncioCamiseta },
        { preco: '100', imagem: imgAnuncioCalcado },
        { preco: '110', imagem: imgAnuncioCalca },
        { preco: '120', imagem: imgAnuncioCasaco },
        { preco: '130', imagem: imgAnuncioCamiseta },
        { preco: '140', imagem: imgAnuncioAcessorio },
        { preco: '150', imagem: imgAnuncioCalcado },
    ];

    const produtosCamisetas = [
        { preco: '450', imagem: CamisetaVermelha },
        { preco: '35', imagem: imgAnuncioCamiseta },
        { preco: '45', imagem: imgAnuncioCamiseta2 },
        { preco: '55', imagem: imgAnuncioCamiseta },
        { preco: '65', imagem: imgAnuncioCamiseta2 },
        { preco: '75', imagem: imgAnuncioCamiseta },
        { preco: '85', imagem: imgAnuncioCamiseta },
        { preco: '95', imagem: imgAnuncioCamiseta },
        { preco: '105', imagem: imgAnuncioCamiseta },
        { preco: '115', imagem: imgAnuncioCamiseta },
    ];

    const produtosCalcas = [
        { preco: '25', imagem: imgAnuncioCalca },
        { preco: '35', imagem: imgAnuncioCalca2 },
        { preco: '45', imagem: imgAnuncioCalca },
        { preco: '55', imagem: imgAnuncioCalca2 },
        { preco: '65', imagem: imgAnuncioCalca },
        { preco: '75', imagem: imgAnuncioCalca2 },
        { preco: '85', imagem: imgAnuncioCalca },
        { preco: '95', imagem: imgAnuncioCalca2 },
    ];

    const produtosCalcados = [
        { preco: '25', imagem: imgAnuncioCalcado },
        { preco: '35', imagem: imgAnuncioCalcado2 },
        { preco: '45', imagem: imgAnuncioCalcado },
        { preco: '55', imagem: imgAnuncioCalcado2 },
        { preco: '65', imagem: imgAnuncioCalcado },
        { preco: '75', imagem: imgAnuncioCalcado2 },
        { preco: '85', imagem: imgAnuncioCalcado },
        { preco: '95', imagem: imgAnuncioCalcado },
    ];

    const produtosAcessorios = [
        { preco: '25', imagem: imgAnuncioAcessorio },
        { preco: '35', imagem: imgAnuncioAcessorio2 },
        { preco: '45', imagem: imgAnuncioAcessorio },
        { preco: '55', imagem: imgAnuncioAcessorio2 },
        { preco: '65', imagem: imgAnuncioAcessorio },
        { preco: '75', imagem: imgAnuncioAcessorio2 },
        { preco: '85', imagem: imgAnuncioAcessorio },
        { preco: '95', imagem: imgAnuncioAcessorio },
    ];

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
        console.log("Ver perfil");
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
                Carregando perfil...
            </main>
            </div>
        );
    }

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
                        <input type="text" placeholder="Pesquisar..."/>
                        <Search className="iconeLupa" size={24} color="#efefef" />
                    </div>
                </div>
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Meus Últimos Produtos</h2>
                    <div className="CarrosselProdutos">
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStartUltimosProd ? 'desabilitado' : ''}`}
                            onClick={handlePrevUltimosProd}
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <div className="ConjAnuncioPerfil">
                            {produtosUltimosProd.slice(startIndexUltimosProd, startIndexUltimosProd + itemsToShow).map((produto, index) => (
                                <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} editar={props.minha} onClick={produto.onClick}/>
                            ))}
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEndUltimosProd ? 'desabilitado' : ''}`}
                            onClick={handleNextUltimosProd}
                        >
                            <ArrowRight size={24}/>
                        </button>
                    </div>
                </section>
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Suas Camisetas</h2>
                    <div className="CarrosselProdutos">
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStartCamisetas ? 'desabilitado' : ''}`}
                            onClick={handlePrevCamisetas}
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <div className="ConjAnuncioPerfil">
                            {produtosCamisetas.slice(startIndexCamisetas, startIndexCamisetas + itemsToShow).map((produto, index) => (
                                <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} editar={props.minha}/>
                            ))}
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEndCamisetas ? 'desabilitado' : ''}`}
                            onClick={handleNextCamisetas}
                        >
                            <ArrowRight size={24}/>
                        </button>
                    </div>
                </section>
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Suas Calças</h2>
                    <div className="CarrosselProdutos">
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStartCalcas ? 'desabilitado' : ''}`}
                            onClick={handlePrevCalcas}
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <div className="ConjAnuncioPerfil">
                            {produtosCalcas.slice(startIndexCalcas, startIndexCalcas + itemsToShow).map((produto, index) => (
                                <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} editar={props.minha}/>
                            ))}
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEndCalcas ? 'desabilitado' : ''}`}
                            onClick={handleNextCalcas}
                        >
                            <ArrowRight size={24}/>
                        </button>
                    </div>
                </section>
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Seus Calçados</h2>
                    <div className="CarrosselProdutos">
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStartCalcados ? 'desabilitado' : ''}`}
                            onClick={handlePrevCalcados}
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <div className="ConjAnuncioPerfil">
                            {produtosCalcados.slice(startIndexCalcados, startIndexCalcados + itemsToShow).map((produto, index) => (
                                <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} editar={props.minha}/>
                            ))}
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEndCalcados ? 'desabilitado' : ''}`}
                            onClick={handleNextCalcados}
                        >
                            <ArrowRight size={24}/>
                        </button>
                    </div>
                </section>
                <section className="UltimosProdutos">
                    <h2 className="TituloSecao">Seus Acessórios</h2>
                    <div className="CarrosselProdutos">
                        <button
                            className={`BotaoCarrossel Esquerda ${isAtStartAcessorios ? 'desabilitado' : ''}`}
                            onClick={handlePrevAcessorios}
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <div className="ConjAnuncioPerfil">
                            {produtosAcessorios.slice(startIndexAcessorios, startIndexAcessorios + itemsToShow).map((produto, index) => (
                                <Anuncio key={index} preco={produto.preco} imgFundo={produto.imagem} editar={props.minha}/>
                            ))}
                        </div>
                        <button
                            className={`BotaoCarrossel Direita ${isAtEndAcessorios ? 'desabilitado' : ''}`}
                            onClick={handleNextAcessorios}
                        >
                            <ArrowRight size={24}/>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Perfil;
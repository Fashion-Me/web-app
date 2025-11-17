import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import "./ModeracaoPerfils.css"
import PerfilHistorico from './PerfilHistorico';

import imgPerfilEnzo from "../../../Imagens/FotoPerfilEnzo.png"
import imgPerfilVH from "../../../Imagens/FotoPerfilVH.jpg"
import imgPerfil from "../../../Imagens/FotoPerfil.png"
import imgPerfilDaniel from "../../../Imagens/FotoDaniel.jpg"
import imgPerfilCaue from "../../../Imagens/FotoPerfilCaue.jpg"
import imgPerfilAvatar from "../../../Imagens/FotoPerfilAvatar.png"
import {useNavigate} from "react-router-dom";


const TITULO_PAGINA = "PERFILS";
const OPCOES_FILTRO = ["Ordem Alfabética", "Mais Denúncias", "Mais Recentes"];
const MENU_OPCOES = ["DENUNCIADOS", "PUNIDOS"];

const PerfilDenuncia = ({ fotoPerfil, nomePerfil, descricao, numDenuncias, tipoMenu, onVisualizar, onAcao }) => {
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
    const navigate = useNavigate();

    const ordenarPerfis = (perfis) => {
        const perfisOrdenados = [...perfis];

        switch (filtroSelecionado) {
            case "Ordem Alfabética":
                return perfisOrdenados.sort((a, b) =>
                    a.nomePerfil.localeCompare(b.nomePerfil)
                );
            case "Mais Denúncias":
                return perfisOrdenados.sort((a, b) =>
                    b.numDenuncias - a.numDenuncias
                );
            case "Mais Recentes":
                return perfisOrdenados.sort((a, b) =>
                    b.id - a.id
                );
            default:
                return perfisOrdenados;
        }
    };

    const obterAnunciosPorMenu = () => {
        let perfis = [];
        if (menuAtivo === "DENUNCIADOS") {
            perfis = anunciosExemploDenunciados;
        } else if (menuAtivo === "PUNIDOS") {
            perfis = anunciosExemploExcluidos;
        }

        // Aplicar filtro de pesquisa
        if (pesquisa.trim()) {
            perfis = perfis.filter(perfil =>
                perfil.nomePerfil.toLowerCase().includes(pesquisa.toLowerCase())
            );
        }

        return ordenarPerfis(perfis);
    };

    // Dados de exemplo - substituir pela API real
    const anunciosExemploDenunciados = [
        {
            id: 1,
            fotoPerfil: imgPerfilEnzo ,
            nomePerfil: "Enzo deu o Medico",
            numDenuncias: 80
        },
        {
            id: 2,
            fotoPerfil: imgPerfilVH ,
            nomePerfil: "Victor Hugo",
            numDenuncias: 80
        },
        {
            id: 3,
            fotoPerfil:  imgPerfil,
            nomePerfil: "Luiz Ricardo",
            numDenuncias: 55
        },
        {
            id: 4,
            fotoPerfil:  imgPerfilDaniel,
            nomePerfil: "Daniel I AmaMoto",
            numDenuncias: 3456
        },
        {
            id: 5,
            fotoPerfil:  imgPerfilCaue,
            nomePerfil: "Caue",
            numDenuncias: 800
        },
        {
            id: 6,
            fotoPerfil:  imgPerfilAvatar,
            nomePerfil: "Carlos Abe_rto",
            numDenuncias: 80
        },
        // Adicionar mais anúncios conforme necessário
    ];
    const anunciosExemploExcluidos = [
        {
            id: 1,
            fotoPerfil: imgPerfilVH  ,
            nomePerfil: "Jacinto Leite",
            numDenuncias: 80
        },
        {
            id: 2,
            fotoPerfil: imgPerfilEnzo ,
            nomePerfil: "Atual do VH",
            numDenuncias: 80
        },
        {
            id: 3,
            fotoPerfil:  imgPerfil,
            nomePerfil: "Luis Ricardo",
            numDenuncias: 55
        },
        {
            id: 4,
            fotoPerfil:  imgPerfilCaue,
            nomePerfil: "K.U.E",
            numDenuncias: 3456
        },
        {
            id: 5,
            fotoPerfil: imgPerfilDaniel,
            nomePerfil: "Amor ao Davi",
            numDenuncias: 800
        },
        {
            id: 6,
            fotoPerfil:  imgPerfilAvatar,
            nomePerfil: "Tomas Urbano",
            numDenuncias: 80
        },
        // Adicionar mais anúncios conforme necessário
    ];

    const handleVisualizar = (id) => {
        // Navegar para o perfil
        console.log("Visualizar anúncio:", id);
        navigate(`/moderacao/verPerfil`);
    };
    const handleNavegacao = (id) => {
        console.log("Navegar anúncio:", id);
        navigate(`/moderacao/especPerfil`);
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

            <div className="lista-anuncios">
                {obterAnunciosPorMenu().map((anuncio) => (
                    <PerfilDenuncia
                        key={anuncio.id}
                        fotoPerfil={anuncio.fotoPerfil}
                        nomePerfil={anuncio.nomePerfil}
                        descricao={anuncio.descricao}
                        numDenuncias={anuncio.numDenuncias}
                        tipoMenu={menuAtivo}
                        onVisualizar={() => handleVisualizar(anuncio.id)}
                        onAcao={() => handleNavegacao(anuncio.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ModeracaoPerfil;
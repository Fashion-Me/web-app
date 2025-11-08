import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import "./ModeracaoPerfils.css"

import imgPerfilEnzo from "../../../Imagens/FotoPerfilEnzo.png"
import imgPerfilVH from "../../../Imagens/FotoPerfilVH.jpg"
import imgPerfil from "../../../Imagens/FotoPerfil.png"
import imgPerfilDaniel from "../../../Imagens/FotoDaniel.jpg"
import imgPerfilCaue from "../../../Imagens/FotoPerfilCaue.jpg"
import {useNavigate} from "react-router-dom";


const TITULO_PAGINA = "PERFILS";
const OPCOES_FILTRO = ["Ordem Alfabética", "Mais Denúncias", "Mais Recentes"];
const MENU_OPCOES = ["DENUNCIADOS", "EXCLUÍDOS"];

const PerfilDenuncia = ({ fotoPerfil, nomePerfil, descricao, numDenuncias, tipoMenu, onVisualizar, onAcao }) => {
    return (
        <div className="anuncio-denuncia-item">
            <div className="anuncio-info">
                <img src={fotoPerfil} alt={nomePerfil} className="foto-perfil" />
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

    // Dados de exemplo - substituir pela API real
    const anunciosExemplo = [
        {
            id: 1,
            fotoPerfil: imgPerfilEnzo ,
            nomePerfil: "Enzo del Medico",
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
            nomePerfil: "Luis",
            numDenuncias: 80
        },
        {
            id: 4,
            fotoPerfil:  imgPerfilDaniel,
            nomePerfil: "Daniel E_Ama_A_Moto",
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
            fotoPerfil:  imgPerfil,
            nomePerfil: "Luis",
            numDenuncias: 80
        },
        {
            id: 1,
            fotoPerfil: imgPerfilEnzo ,
            nomePerfil: "Enzo del Medico",
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
            nomePerfil: "Luis",
            numDenuncias: 80
        },
        {
            id: 4,
            fotoPerfil:  imgPerfilDaniel,
            nomePerfil: "Daniel E_Ama_A_Moto",
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
            fotoPerfil:  imgPerfil,
            nomePerfil: "Luis",
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
                {anunciosExemplo.map((anuncio) => (
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
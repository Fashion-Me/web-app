import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import "./ModeracaoPerfils.css"
import "./ModeracaoAnuncios.css"

import imgPerfilEnzo from "../../../Imagens/FotoPerfilEnzo.png"
import imgPerfilVH from "../../../Imagens/FotoPerfilVH.jpg"
import imgPerfil from "../../../Imagens/FotoPerfil.png"

import imgAnuncioCamiseta from "../../../Imagens/AnuncioCamisa.png";
import imgAnuncioCasaco from "../../../Imagens/FotoPerfilCaue.jpg";
import imgAnuncioCalcado from "../../../Imagens/FotoDaniel.jpg";
import {useNavigate} from "react-router-dom";

const TITULO_PAGINA = "POSTS";
const OPCOES_FILTRO = ["Mais Recentes","Conteúdo sexual/nudez" ,"Golpe", "Conteúdo ilícito", "Conteúdo pejorativo"];
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
            fotoAnuncio: imgPerfilVH ,
            TipoDenuncia: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 2,
            fotoAnuncio: imgPerfilEnzo ,
            TipoDenuncia: "Conteúdo se trata à um golpe",
        },
        {
            id: 3,
            fotoAnuncio: imgPerfil,
            TipoDenuncia: "Conteúdo ilícito",
        },
        {
            id: 4,
            fotoAnuncio: imgAnuncioCamiseta ,
            TipoDenuncia: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 5,
            fotoAnuncio: imgAnuncioCasaco ,
            TipoDenuncia: "Conteúdo de cunho sexual, nudez",
        },
        {
            id: 6,
            fotoAnuncio: imgAnuncioCalcado,
            TipoDenuncia: "Conteúdo ilícito",
        },

        // Adicionar mais anúncios conforme necessário
    ];

    const handleVerMais = (id) => {
        // Navegar para o perfil
        console.log("Enviando para o anuncio", id);
        navigate(`/moderacao/especPost`);
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

            <div className="lista-anunciosP">
                {anunciosExemplo.map((anuncio) => (
                    <AnuncioDenuncia
                        key={anuncio.id}
                        fotoAnuncio={anuncio.fotoAnuncio}
                        tipoDenuncia={anuncio.TipoDenuncia}
                        onVerMais={() => handleVerMais(anuncio.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ModeracaoPerfil;
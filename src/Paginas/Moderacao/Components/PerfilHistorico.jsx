import React from 'react';
import {  Clock4 } from 'lucide-react';
import './ModeracaoPerfils.css';

const MENU_HISTORICO = ["PERFIL", "ANUNCIOS", "POSTS"];

const PerfilHistorico = ({ denuncias, menuAtivo, setMenuAtivo }) => {
    return (
        <div className="perfilHistorico">
            <div className="historicoHeader">
                <div className="historicoTitulo">
                    <Clock4 size={24} />
                    <h2>HISTÓRICO</h2>
                </div>
                <div className="historicoMenu">
                    {MENU_HISTORICO.map((opcao) => (
                        <button
                            key={opcao}
                            className={`menuBtn ${menuAtivo === opcao ? 'ativo' : ''}`}
                            onClick={() => setMenuAtivo(opcao)}
                        >
                            {opcao}
                        </button>
                    ))}
                </div>
            </div>
            <div className="historicoLista">
                {denuncias.map((denuncia, index) => (
                    <div key={index} className="denunciaItem">
                        <div className="denunciaBolinha"></div>
                        <p className="denunciaTexto">{denuncia}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerfilHistorico;
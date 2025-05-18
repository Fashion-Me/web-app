import React from 'react';
import "../Css/Menu.css"

const estilo = {
    selecionado: {
        stroke: "#4066FF",
        color: "#4066FF",
        borderLeft: "2px solid #4066FF",// Azul
    },
    naoSelecionado: {
        stroke: "#FFFFFF",
        color: "#FFFFFF",
        borderLeft: "none",// Branco
    }
};

export default (params) => {
    const estiloReal = params.selecionado ? estilo.selecionado : estilo.naoSelecionado;
    return (
        <div className="Aba" style={{ borderLeft: estiloReal.borderLeft }} onClick={params.onClick}>
            <div className="divAbaIcone">
                {params.children && React.isValidElement(params.children)
                    ? React.cloneElement(params.children, { stroke: estiloReal.stroke })
                    : null}
            </div>
            <div className="divAbaTexto">
                <p style={{ color: estiloReal.color }}> {params.titulo} </p>
            </div>
        </div>
    );
};
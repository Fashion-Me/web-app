import React from 'react';
import "./Anuncio.css"
import {SquarePen} from "lucide-react";

export default (params) => {
    return (
        <div onClick={params.onClick} className="Anuncio Clicavel" style={{ backgroundImage: `url(${params.imgFundo})`, position: 'relative' }}>
            {params.preco && (
                <div className="divPreco">
                    <p className="semibold">R$ {params.preco}</p>
                </div>
            )}
            {params.editar && (
                <div style={{ position: 'absolute', top: '5px', right: '4px' }}>
                    <SquarePen size={40} strokeWidth={1.5} color={'#fff'} className="IconeEditar"/>
                </div>
            )}
        </div>
    );
};

// export default ({preco,tituloAnuncio,imagemAnun,editar,onClick}) => {
//     return (
//         <div className="anuncio-card" onClick={onClick}>
//             <div className="anuncioFotoContainer">
//                 <img src={imagemAnun} className="anuncioFoto" />
//                 <div className="divPreco">
//                     <p className="preco-texto semibold">R$ {preco}</p>
//                 </div>
//                 {editar && (
//                     <div className="iconeEditarContainer">
//                         <SquarePen size={40} strokeWidth={1.5} className="IconeEditar"/>
//                     </div>
//                 )}
//             </div>
//             <div className="anuncioDenunciaInfo">
//                 <p className="denunciaTitulo">{tituloAnuncio}</p>
//             </div>
//
//         </div>
//     );
// };

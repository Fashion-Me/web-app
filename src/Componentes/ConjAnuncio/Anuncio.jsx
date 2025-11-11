import React from 'react';
import "./Anuncio.css"
import {SquarePen} from "lucide-react";

export default (params) => {
    return (
        <div className="Anuncio Clicavel" style={{ backgroundImage: `url(${params.imgFundo})` }}>
            {params.preco && (
                <div className="divPreco">
                    <p className="semibold">R$ {params.preco}</p>
                </div>
            )}
            {params.editar && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100%', padding: '2px' }}>
                    <SquarePen size={40} strokeWidth={1.5} className="IconeEditar"/>
                </div>
            )}
        </div>
    );
};

// export default (params) => {
//     return (
//         <div className="anuncio-denuncia-card">
//             <div className="anuncio-foto-container">
//                 <img src={params.imgFundo} alt="Anúncio denunciado" className="anuncio-foto" />
//                 <div className="divPreco">
//                     <p className="semibold">R$ {params.preco}</p>
//                 </div>
//                 {params.editar && (
//                     <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100%', padding: '2px' }}>
//                         <SquarePen size={40} strokeWidth={1.5} className="IconeEditar"/>
//                     </div>
//                 )}
//             </div>
//             <div className="anuncio-denuncia-info">
//                 <p className="denuncia-titulo">{params.titulo}</p>
//             </div>
//
//         </div>
//     );
// };

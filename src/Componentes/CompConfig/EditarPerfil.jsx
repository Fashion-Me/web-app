import React, {useRef, useState} from 'react';
import { SquarePen } from 'lucide-react';
import AvatarPadrão from '../../Imagens/FotoPerfil.png'
import FundoPadrão from '../../Imagens/FundoConjCamisetas2.png'

export default () => {
    const [nome, setNome] = useState('');
    const [biografia, setBiografia] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(AvatarPadrão);
    const [fotoFundo, setFotoFundo] = useState(FundoPadrão);

    const inputPerfilRef = useRef(null);
    const inputFundoRef = useRef(null);

    const handleFotoPerfilChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPerfil(URL.createObjectURL(file));
        }
    };

    const handleFotoFundoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoFundo(URL.createObjectURL(file));
        }
    };

    const handleSalvar = () => {
        alert('Perfil salvo!');
        console.log({ nome, biografia, fotoPerfil, fotoFundo });
    };


    return (
        <>
            <div className="ConfigAreaFotoCampo">
                <div className="ConfigAreaFotoPerfil">
                    <div
                        className="foto-perfil"
                        onClick={() => inputPerfilRef.current.click()}
                        style={{ backgroundImage: `url(${fotoPerfil})`,}}
                    >
                        <SquarePen size={48} strokeWidth={1.5} className="IconeEditar"/>
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputPerfilRef}
                            onChange={handleFotoPerfilChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="ConfigAreaCampo">
                    <div className="campo">
                        <h3>Nome:</h3>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite seu nome"
                        />
                    </div>

                    <div className="campo">
                        <h3>Bibliografia:</h3>
                        <textarea
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                            placeholder="Digite sua bibliografia"
                        />
                    </div>
                </div>
            </div>
            <div
                className="foto-fundo"
                onClick={() => inputFundoRef.current.click()}
                style={{ backgroundImage: `url(${fotoFundo})` }}
            >
                <h2 className="Config-H2">CLIQUE PARA MUDAR FOTO DE FUNDO</h2>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputFundoRef}
                    onChange={handleFotoFundoChange}
                    style={{ display: 'none' }}
                />
            </div>

            <button className="botao-salvar" onClick={handleSalvar}> <h2>Salvar</h2> </button>
        </>
    );

};
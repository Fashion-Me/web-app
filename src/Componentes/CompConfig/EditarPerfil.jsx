import React, {useRef, useState} from 'react';

export default () => {
    const [nome, setNome] = useState('');
    const [biografia, setBiografia] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [fotoFundo, setFotoFundo] = useState('');

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
        <div className="AreaConfig  container-editar-perfil">
            <h2 className="titulo">Editar Perfil</h2>

            <div className="foto-perfil" onClick={() => inputPerfilRef.current.click()}>
                <img src={fotoPerfil} alt="Foto de perfil" className="imagem-perfil" />
                <h2 className="Config-H2">CLIQUE PARA MUDAR FOTO DE PERFIL</h2>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputPerfilRef}
                    onChange={handleFotoPerfilChange}
                    style={{ display: 'none' }}
                />
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

            <button className="botao-salvar" onClick={handleSalvar}> <h2>Salvar</h2> </button>
        </div>
    );

};
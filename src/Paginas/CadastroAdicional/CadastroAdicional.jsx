import React, {useRef, useState, useEffect} from 'react';
import "../../css/Cadastro.css"
import "./CadastroAdicional..css"
import api from "../../services/authApi";
import {useNavigate} from "react-router-dom";

import Logo from "../../Componentes/Menu/Imagens/LogoTexto.png";
import {SquarePen} from "lucide-react";
import AvatarPadrão from "../../Imagens/FotoPerfilAvatar.png";
import FundoLuiz from "../../Imagens/FundoConjCamisetas2.png";
import FundoPadrão from "../../Imagens/FundoConjAcessorios.png";
import AvatarPerfil from "../../Imagens/FotoPerfil.png";

const Cadastro = () => {
    const navigate = useNavigate();

    const [biografia, setBiografia] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(AvatarPadrão);
    const [fotoFundo, setFotoFundo] = useState(FundoPadrão);
    const [fotoPerfilFile, setFotoPerfilFile] = useState(null);
    const [fotoFundoFile, setFotoFundoFile] = useState(null);
    const [preferenciaRoupa, setPreferenciaRoupa] = useState('Unissex');

    const opcoesRoupa = ['Masculino', 'Feminino', 'Unissex'];
    const inputPerfilRef = useRef(null);
    const inputFundoRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                preencherAutomatico();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const preencherAutomatico = () => {
        setBiografia('Professor de Desenvolvimento de sistemas, Luiz Ricardo.');
        setPreferenciaRoupa('Masculino');
        setFotoPerfil(AvatarPerfil);
        setFotoFundo(FundoLuiz);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFotoPerfilChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPerfilFile(file);
            setFotoPerfil(URL.createObjectURL(file));
        }
    };

    const handleFotoFundoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoFundoFile(file);
            setFotoFundo(URL.createObjectURL(file));
        }
    };

    const handleSalvar = async () => {
        try {
            // Mapeamento das preferências
            const genderMap = {
                'Masculino': 'MALE',
                'Feminino': 'FEMALE',
                'Unissex': 'UNISEX'
            };

            const data = {
                bio: biografia || null,
                clothing_gender: genderMap[preferenciaRoupa] || 'UNISEX',
                profile_image: null,
                banner_image: null
            };

            if (fotoPerfilFile) {
                data.profile_image = await fileToBase64(fotoPerfilFile);
            }

            if (fotoFundoFile) {
                data.banner_image = await fileToBase64(fotoFundoFile);
            }

            await api.patch("/users/me/profile", data);

            navigate("/home");
        } catch (err) {
            console.error("Erro ao salvar perfil:", err);
            alert("Erro ao salvar perfil: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <main className="divCadLogin">
            <div className="divFormulario ConfigAreaFotoCampo">
                <div
                    className="divfotoPerfilCadastro"
                    onClick={() => inputPerfilRef.current.click()}
                    style={{backgroundImage: `url(${fotoPerfil})`,}}
                >
                    <SquarePen size={48} color={"#efefef"} strokeWidth={1.5} className="IconeEditar"/>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputPerfilRef}
                        onChange={handleFotoPerfilChange}
                        style={{display: 'none'}}
                    />
                </div>

                <div className="campoCadastro">
                    <h2>Bibliografia:</h2>
                    <textarea
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        placeholder="Digite sua biografia"
                    />
                </div>
                <div className="divPrefRoupa">
                    <h2>Preferencia de roupa</h2>
                    <div className="divPrefRoupaEscolhas">
                        {opcoesRoupa.map((opcao) => (
                            <div
                                key={opcao}
                                className={`escolha ${opcao === preferenciaRoupa ? 'selecionado' : ''}`}
                                onClick={() => setPreferenciaRoupa(opcao)}
                            >
                                <h3>{opcao}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="divAddFotoFundo"
                    onClick={() => inputFundoRef.current.click()}
                    style={{backgroundImage: `url(${fotoFundo})`}}
                >
                    <p>CLIQUE PARA MUDAR FOTO DE FUNDO</p>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFundoRef}
                        onChange={handleFotoFundoChange}
                        style={{display: 'none'}}
                    />
                </div>
                <button className="btnConfirmar" onClick={handleSalvar}><h2>Confirmar</h2></button>
            </div>
        </main>
    );
}

export default Cadastro;
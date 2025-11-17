import React, {useRef, useState, useEffect} from 'react';
import "../../css/Cadastro.css"
import "./CadastroAdicional..css"
import api from "../../services/authApi";
import {useNavigate} from "react-router-dom";

/* Puxar do Banco */
import Logo from "../../Componentes/Menu/Imagens/LogoTexto.png";
import {SquarePen} from "lucide-react";
import AvatarPadrão from "../../Imagens/FotoPerfilAvatar.png";
import FundoLuiz from "../../Imagens/FundoConjCamisetas2.png";
import FundoPadrão from "../../Imagens/FundoConjAcessorios.png";
import AvatarPerfil from "../../Imagens/FotoPerfil.png";

const Cadastro = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(e.target.senha.value === e.target.ConfirmarSenha.value){
            const username = e.target.username.value.trim();
            const email = e.target.email.value.trim();
            const password = e.target.senha.value.trim();
            const name = e.target.nome.value.trim();
            const phone = e.target.fone.value.trim();
            const birth_date = e.target.dataNasc.value.trim();
            try {
                await api.post("/users", { username,email, password,name,phone,birth_date });
                navigate(`/login`);   // login ok → home
            } catch (err) {
                alert("Erro na API: " + err.message);
            }
        } else {
            alert("Senhas Incompatíveis ");
        }
    };


    const [nome, setNome] = useState('');
    const [biografia, setBiografia] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(AvatarPadrão);
    const [fotoFundo, setFotoFundo] = useState(FundoPadrão);

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
        console.log({ nome, biografia, fotoPerfil, fotoFundo });
        navigate("/login")
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
                                // Adiciona a classe 'selecionado' se a opção atual for a que está no estado
                                className={`escolha ${opcao === preferenciaRoupa ? 'selecionado' : ''}`}
                                // Ao clicar, atualiza o estado com a nova opção
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
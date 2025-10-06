import React, {useRef, useState} from 'react';
import "../../css/Cadastro.css"
import "./CadastroAdicional..css"
import api from "../../services/authApi";
import {useNavigate} from "react-router-dom";

/* Puxar do Banco */
import Logo from "../../Componentes/Menu/Imagens/LogoTexto.png";
import {SquarePen} from "lucide-react";
import AvatarPadrão from "../../Imagens/FotoPerfil.png";
import FundoPadrão from "../../Imagens/FundoConjCamisetas2.png";

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
                    <h2>Nome:</h2>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </div>

                <div className="campoCadastro">
                    <h2>Bibliografia:</h2>
                    <textarea
                        value={biografia}
                        onChange={(e) => setBiografia(e.target.value)}
                        placeholder="Digite sua bibliografia"
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
                    <h2 className="Config-H2">CLIQUE PARA MUDAR FOTO DE FUNDO</h2>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFundoRef}
                        onChange={handleFotoFundoChange}
                        style={{display: 'none'}}
                    />
                </div>
                <button className="btnConfirmar" onClick={handleSalvar}><h2>Salvar</h2></button>
            </div>
        </main>
    );
}

export default Cadastro;
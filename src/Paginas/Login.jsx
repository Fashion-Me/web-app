import "../css/Login.css";
import api from "../services/authApi";
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import Google from "../Imagens/iconeGoogle.png";

const Login = () => {

    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                preencherAutomatico();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const preencherAutomatico = () => {
        document.getElementById('nome').value = 'luiz_ricardo';
        document.getElementById('senha').value = 'Luiz#04rr';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.nome.value.trim();
        const password = e.target.senha.value.trim();
        try {
            await api.post("/auth/login", { username, password });
            navigate(`/home`);// login ok → home
        } catch (err) {
             alert("Usuário ou senha inválidos");
        }
    };

    return (
        <main className="divCadLogin">
            <div className="divFormulario">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Entrar na conta</h1>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Nome de Usuário" required/>

                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            className="CadLogInput comIcone"
                            type={mostrarSenha ? "text" : "password"}
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {mostrarSenha ? <EyeOff size={20} color={'#000'} /> : <Eye size={20} color={'#000'} />}
                        </button>
                    </div>

                    <button className="CadLogButton" type="submit">Entrar</button>
                    <p onClick={() => {navigate("/esquecerSenha")}} >Esqueceu a senha?</p>
                </form>
                <div className="divFacaLogin" >
                    <div className="divLinha">
                        <hr/>
                        <p>Faça login com</p>
                        <hr/>
                    </div>
                    <div className="divIcones">
                        <img className="ImgIcone" src={Google} alt="Logo Fashion-me"/>
                    </div>
                </div>
                <div className="divbtnCadastrar">
                    <p> Caso não tenha uma conta criada: </p>
                    <button onClick={() => {navigate("/cadastro")}}  className="CadLogButton" type="submit">Cadastre-se</button>
                </div>
            </div>
        </main>
    );
}

export default Login;

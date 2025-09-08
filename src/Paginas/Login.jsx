import React from 'react';
import "../css/Login.css";
import api from "../services/authApi";
import {useNavigate} from "react-router-dom";

import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import Google from "../Imagens/iconeGoogle.png";
const Nomes = ["adm", "usuario"];
const Senhas = ["123456", "654321"];

const Login = () => {

    const navigate = useNavigate();

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
                    <input className="CadLogInput" type="password" id="senha" name="senha" placeholder="Senha"
                           required/>
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


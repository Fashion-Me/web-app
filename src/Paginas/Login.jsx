import React from 'react';
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import Google from "../Imagens/iconeGoogle.png";
import "../css/Login.css";
import {useNavigate} from "react-router-dom";

const Nomes = ["adm", "usuario"];
const Senhas = ["123456", "654321"];

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        const nome = e.target.nome.value.trim();
        const senha = e.target.senha.value.trim();

        const indexNome = Nomes.indexOf(nome);
        const indexSenha = Senhas.indexOf(senha);

        if (indexNome !== -1 && indexNome === indexSenha) {
            const tipoUsuario = nome === "adm" ? "adm" : "user";
            onNavegacaoConjAnuncio(tipoUsuario);
        } else {
            alert("Nome ou senha inválidos!");
        }
    };

    function onNavegacaoConjAnuncio(tipoUsuario) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('tipoUsuario', tipoUsuario);
        navigate(`/?${queryParams.toString()}`);
    }

    return (
        <main className="divCadLogin">
            <div className="divFormulario">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Entrar na conta</h1>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Email ou Telefone" required/>
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
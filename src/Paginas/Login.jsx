import React from 'react';
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import Google from "../Imagens/iconeGoogle.png";
import "../css/Login.css";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    return (
        <main className="divCadLogin">
            <div className="divFormulario">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Entrar na conta</h1>
                <form className="formLogin">
                    <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Email, Telefone ou Nome de perfil" required/>
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
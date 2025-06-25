import React, {useState} from "react";
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import "../css/Cadastro.css";
import "../css/EsquecerSenha.css"
import {useNavigate} from "react-router-dom";


const NovaSenha = () => {
    const navigate = useNavigate();

    return (
        <main className="divCadLogin">
            <div className="divFormulario PageEsquecerSenha">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Nova senha</h1>
                <form className="formLogin" onSubmit={(e) => {
                    e.preventDefault();
                    const senha = e.target.senha[0].value;
                    const confirmarSenha = e.target.senha[1].value;
                    if (senha.length < 6) {
                        alert("A senha deve ter pelo menos 6 caracteres.");
                    } else if (senha === confirmarSenha) {
                        alert("Senha redefinida com sucesso!");
                        navigate("/login");
                    } else {
                        alert("As senhas não coincidem. Por favor, tente novamente.");
                    }
                }}>
                    <input className="CadLogInput" type="password" id="senha" name="senha"
                           placeholder="Nova senha ( minimo 6 caracteres)" required/>
                    <input className="CadLogInput" type="password" id="senha" name="senha"
                           placeholder="Confirme a senha" required/>
                    <button className="CadLogButton" type="submit">Redefinir Senha</button>
                </form>
            </div>
        </main>
    );
}

export default NovaSenha;
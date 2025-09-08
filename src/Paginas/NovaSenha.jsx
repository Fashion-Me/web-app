import React from "react";
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import "../css/Cadastro.css";
import "../css/EsquecerSenha.css"
import {useNavigate} from "react-router-dom";
import api from "../services/authApi";


const NovaSenha = () => {
    const navigate = useNavigate();
    const handleSubmit = async e => {
        const new_password = e.target.senha.value;
        const confirmarSenha = e.target.senhaVerificacao.value;
        const reset_token = localStorage.getItem("token");
        if (new_password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
        } else if (new_password === confirmarSenha) {
            try {
                await api.post("/auth/reset-password", {new_password, reset_token});
            }catch(err) {
                alert("Erro ao redefinir a senha");
                console.error(err)
            }

            alert("Senha redefinida com sucesso!");
            navigate("/login");
        } else {
            alert("As senhas não coincidem. Por favor, tente novamente.");
        }
    };

    return (
        <main className="divCadLogin">
            <div className="divFormulario PageEsquecerSenha">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Nova senha</h1>
                <form className="formLogin" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <input className="CadLogInput" type="password" id="senha" name="senha"
                           placeholder="Nova senha ( minimo 6 caracteres)" required/>
                    <input className="CadLogInput" type="password" id="senhaVerificacao" name="senhaVerificacao"
                           placeholder="Confirme a senha" required/>
                    <button className="CadLogButton" type="submit">Redefinir Senha</button>
                </form>
            </div>
        </main>
    );
}

export default NovaSenha;
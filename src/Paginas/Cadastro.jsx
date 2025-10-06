import React from 'react';
import "../css/Cadastro.css"
import api from "../services/authApi";
import {useNavigate} from "react-router-dom";

/* Puxar do Banco */
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";

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
                navigate(`/cadastroAdicional`);   // login ok → home
            } catch (err) {
                alert("Erro na API: " + err.message);
            }
        } else {
            alert("Senhas Incompatíveis ");
        }

    };

    return (
        <main className="divCadLogin">
            <div className="divFormulario">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                    <h1>Crie sua conta</h1>
                <form
                    className="formCad"
                    onSubmit={handleSubmit}
                >
                    <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Nome Completo" required/>
                    <input className="CadLogInput" type="text" id="username" name="username" placeholder="Nome de Usuário" required/>
                    <input className="CadLogInput" type="email" id="email" name="email" placeholder="Email" required/>
                    <input className="CadLogInput" type="tel" id="fone" name="fone" placeholder="Número de Telefone" required/>
                    <input className="CadLogInput" type="date" id="dataNasc" required/>
                    <input className="CadLogInput" type="password" id="senha" name="senha" placeholder="Senha" required/>
                    <input className="CadLogInput" type="password" id="ConfirmarSenha" name="ConfirmarSenha" placeholder="Confirmar Senha" required/>
                    <button className="CadLogButton" type="submit">Cadastrar</button>
                    <p onClick={() => {navigate("/login")}}>Já possui uma conta?</p>
                </form>
            </div>
        </main>
    );
}

export default Cadastro;


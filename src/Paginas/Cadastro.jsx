import React from 'react';
import "../css/Cadastro.css"


/* Puxar do Banco */
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import {useNavigate} from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate();


    return (
        <main className="divCadLogin">
            <div className="divFormulario">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                    <h1>Crie sua conta</h1>
                <form
                    className="formCad"
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Formulário enviado com sucesso!");
                    navigate("/login");
                    }}
                >
                    <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Nome" required/>
                    <input className="CadLogInput" type="text" id="apelido" name="apelido" placeholder="Apelido"
                           required/>
                    <input className="CadLogInput" type="date" id="dataNasc" required/>
                    <input className="CadLogInput" type="email" id="email" name="email" placeholder="Email" required/>
                    <input className="CadLogInput" type="tel" id="telefone" name="telefone"
                           placeholder="Número de Telefone" required/>
                    <input className="CadLogInput" type="password" id="senha" name="senha" placeholder="Senha"
                           required/>
                    <button className="CadLogButton" type="submit">Cadastrar</button>
                    <p onClick={() => {navigate("/login")}}>Já possui uma conta?</p>
                </form>
            </div>
        </main>
    );
}

export default Cadastro;


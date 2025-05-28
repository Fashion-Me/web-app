import React, { useState } from "react";
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import "../css/Cadastro.css";
import "../css/EsquecerSenha.css"
import {useNavigate} from "react-router-dom";


const EsquecerSenha = () => {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("Email");

    return (
        <main className="divCadLogin">
            <div className="divFormulario PageEsquecerSenha">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Esqueci minha senha</h1>
                <div className="divbtnTrocar">
                    <button
                        className={`btnTrocar ${selectedButton === "Email" ? "selected" : ""}`}
                        onClick={() => setSelectedButton("Email")}
                    >
                        Email
                    </button>
                    <button
                        className={`btnTrocar ${selectedButton === "Telefone" ? "selected" : ""}`}
                        onClick={() => setSelectedButton("Telefone")}
                    >
                        Telefone
                    </button>
                </div>
                <form className="formLogin"
                      onSubmit={(e) => {
                          e.preventDefault();
                          navigate("/novaSenha");
                      }}
                >
                    {selectedButton === "Email" ? (
                        <input className="CadLogInput" type="email" id="email" name="email" placeholder="Email" required/>
                    )  : (
                        <input className="CadLogInput" type="tel" id="tel" name="tel" placeholder="Telefone" required/>
                    )  }
                    <input className="CadLogInput" type="text" id="Codigo" name="Codigo" placeholder="Codigo"
                           required/>
                    <button className="CadLogButton" type="submit">Próximo</button>
                    <p onClick={() => {alert("Código enviado")}} > Enviar codigo</p>
                </form>
            </div>
        </main>
    );
}

export default EsquecerSenha;
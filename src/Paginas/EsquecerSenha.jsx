import React, {useState} from "react";
import Logo from "../Componentes/Menu/Imagens/LogoTexto.png";
import "../css/Cadastro.css";
import "../css/EsquecerSenha.css"
import {useNavigate} from "react-router-dom";
import api from "../services/authApi";

const EsquecerSenha = () => {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState("Email");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = e.target.Codigo.value.trim();
        const email = e.target.email.value.trim();
        console.log(code);
        try {
            var res = await api.post("/auth/verify-reset-code", {email, code});
            if (res.status === 200) {
                localStorage.setItem("token", res.data.reset_token);
                navigate("/novaSenha");
            } else {
                alert("Erro: Código inválido");
            }
        } catch (err) {
            console.log(err.message);
            alert("Erro");
        }

    }

    const handleSendCode = async (e) => {
        e.preventDefault();
        const email = document.querySelector("#menu > main > div > form").email.value.trim();

        try {
            var res = await api.post("/auth/forgot-password", {email});
            alert("Código enviado")
        } catch (err) {
            alert("Erro");
            console.error(err);
        }
    }
    return (
        <main className="divCadLogin">
            <div className="divFormulario PageEsquecerSenha">
                <div className="divLogo">
                    <img src={Logo} alt="Logo Fashion-me"/>
                </div>
                <h1>Esqueci minha senha</h1>
                {/*<div className="divbtnTrocar">*/}
                {/*    <button*/}
                {/*        className={`btnTrocar ${selectedButton === "Email" ? "selected" : ""}`}*/}
                {/*        onClick={() => setSelectedButton("Email")}*/}
                {/*    >*/}
                {/*        Email*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className={`btnTrocar ${selectedButton === "Telefone" ? "selected" : ""}`}*/}
                {/*        onClick={() => setSelectedButton("Telefone")}*/}
                {/*    >*/}
                {/*        Telefone*/}
                {/*    </button>*/}
                {/*</div>*/}
                <form className="formLogin"
                      onSubmit={(e) => {
                          handleSubmit(e);
                          e.preventDefault();
                      }}
                >
                    {selectedButton === "Email" ? (
                        <input className="CadLogInput" type="email" id="email" name="email" placeholder="Email"
                               required/>
                    ) : (
                        <input className="CadLogInput" type="tel" id="tel" name="tel" placeholder="Telefone"
                               required/>
                    )}
                    <input className="CadLogInput" type="text" id="Codigo" name="Codigo" placeholder="Codigo"
                           required/>
                    <button className="CadLogButton" type="submit">Próximo</button>
                    <p onClick={(e) => {
                        handleSendCode(e)
                    }}> Enviar codigo</p>
                </form>
            </div>
        </main>
    );
}
export default EsquecerSenha;

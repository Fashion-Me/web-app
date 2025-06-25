import React from "react";
import Hamburger from "hamburger-react";
import "../Css/Menu.css";
import { X } from "lucide-react";


const Notificacao = ({ texto, hora }) => (
    <div className="Notificacao">
        <p>{texto}</p>
        <h3>{hora}</h3>
    </div>
);

const CaixaDeEntrada = ({setMostrarCaixaDeEntrada}) => (
    <div className="CaixaDeEntrada">
        <div className="divTituloCaixaEntrada">
            <h2>Caixa de entrada</h2>
            <X className="IconFecharCaixa"
               size={28}
               color="#ffffff"
               onClick={() => setMostrarCaixaDeEntrada(false)}
            />
        </div>
        <div className="ListaNotificacoes">
            <Notificacao texto="O usuário Luiz Ricardo comprou 5 itens da sua loja, envie até 24h após a confirmação compra" hora="10:00 AM" />
            <Notificacao texto="Notificação 2" hora="11:00 AM" />
            <Notificacao texto="Notificação 3" hora="12:00 PM" />
            <Notificacao texto="O usuário Luiz Ricardo comprou 5 itens da sua loja, envie até 24h após a confirmação compra" hora="10:00 AM" />
            <Notificacao texto="Notificação 2" hora="11:00 AM" />
            <Notificacao texto="Notificação 3" hora="12:00 PM" />
            <Notificacao texto="O usuário Luiz Ricardo comprou 5 itens da sua loja, envie até 24h após a confirmação compra" hora="10:00 AM" />
            <Notificacao texto="Notificação 2" hora="11:00 AM" />
            <Notificacao texto="Notificação 3" hora="12:00 PM" />
            {/* Adicione mais notificações conforme necessário */}
        </div>
    </div>
);

export default CaixaDeEntrada;
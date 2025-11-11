import React, { useState } from "react";
import { X, Search } from "lucide-react";
import "../Css/CaixaDeEntrada.css";

import foto1 from '../../Imagens/FotoAnuncioTigrinho.png';
import foto2 from '../../Imagens/AnuncioCasaco.png';
import foto3 from '../../Imagens/camisetas.png';
import foto4 from '../../Imagens/FotoPerfil.png';
import foto7 from '../../Imagens/FotoPerfilEnzo.png';
import foto6 from '../../Imagens/FotoPerfilCaue.jpg';
import foto8 from '../../Imagens/FotoPerfilVH.jpg';
import foto9 from '../../Imagens/FotoPerfilAvatar.png';

// --- DADOS DE EXEMPLO COM DATAS REAIS ---
// Funções auxiliares para criar datas de teste
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const thisWeek = new Date();
thisWeek.setDate(today.getDate() - 3); // 3 dias atrás
const thisMonth = new Date();
thisMonth.setDate(today.getDate() - 10); // 10 dias atrás
const thisYear = new Date();
thisYear.setMonth(today.getMonth() - 2); // 2 meses atrás
const lastYear = new Date();
lastYear.setFullYear(today.getFullYear() - 1); // 1 ano atrás



const initialNotifications = [
    { id: 1, date: today, user: 'Luis Ricardo', text: "postou um outfit no app.", time: 'Há cerca de 30 minutos', avatar: foto4, isRead: false },
    { id: 2, date: yesterday, user: 'Enzo, O lindo', text: "curtiu seu comentário.", time: 'Há cerca de 20 horas', avatar: foto7, isRead: true },
    { id: 3, date: thisWeek, user: 'Carlos Souza', text: "começou a seguir você.", time: 'Há 3 dias', avatar: foto9, isRead: false },
    // Adicionado para o teste de pesquisa "lu..."
    { id: 7, date: thisWeek, user: 'K.U.E', text: "enviou uma nova mensagem.", time: 'Há 4 dias', avatar: foto6, isRead: false },
    { id: 4, date: thisMonth, user: 'Luis Ricardo', text: "postou um outfit no app.", time: 'Há 1 semana', avatar: foto4, isRead: false },
    { id: 5, date: thisYear, user: 'Ana Pereira', text: "comentou na sua foto.", time: 'Há 2 meses', avatar: foto8, isRead: true },
    { id: 6, date: lastYear, user: 'Luis Ricardo', text: "postou um outfit no app.", time: 'Há 1 ano', avatar: foto4, isRead: true },
];

// --- ⭐️ LÓGICA DE AGRUPAMENTO DE DATAS ⭐️ ---

// Helper 1: Verifica se duas datas são o mesmo dia
const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};



// Helper 2: Retorna o nome do grupo para uma data
function getNotificationGroup(date) {
    const notificationDate = new Date(date);
    const today = new Date();

    // Normaliza datas para 00:00 para comparações justas
    today.setHours(0, 0, 0, 0);
    notificationDate.setHours(0, 0, 0, 0);

    // 1. Hoje
    if (isSameDay(notificationDate, today)) {
        return 'Hoje';
    }

    // 2. Ontem
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (isSameDay(notificationDate, yesterday)) {
        return 'Ontem';
    }

    // 3. Essa Semana
    const startOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // 0 (Dom) - 6 (Sáb)
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Início na Segunda
    startOfWeek.setDate(diff);

    if (notificationDate >= startOfWeek) {
        return 'Essa Semana';
    }

    // 4. Esse Mês
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (notificationDate >= startOfMonth) {
        return 'Esse Mês';
    }

    // 5. Esse Ano
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    if (notificationDate >= startOfYear) {
        return 'Esse Ano';
    }

    // Fallback
    return 'Mais Antigo';
}

// --- Componente Notificação (Sem mudanças) ---
const Notificacao = ({ notification, onClick }) => {
    const { user, text, time, avatar, isRead } = notification;
    const itemClass = isRead ? 'Notificacao read' : 'Notificacao unread';

    return (
        <div className={itemClass} onClick={onClick}>
            <img src={avatar} alt="avatar" className="avatar" />
            <div className="notification-content">
                <p className="notification-text">
                    <strong>{user}</strong> {text}
                </p>
                <span className="notification-time">{time}</span>
            </div>
        </div>
    );
};

// --- Componente Principal (Modificado) ---
const CaixaDeEntrada = ({ setMostrarCaixaDeEntrada }) => {
    const [notifications, setNotifications] = useState(initialNotifications);

    // ⭐️ 1. ADICIONA ESTADO PARA O TERMO DE PESQUISA
    const [searchTerm, setSearchTerm] = useState("");

    const handleNotificationClick = (id) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            )
        );
    };

    // ⭐️ 2. FILTRA AS NOTIFICAÇÕES ANTES DE AGRUPAR
    const filteredNotifications = notifications.filter(notification =>
        // Verifica se o nome do usuário inclui o termo pesquisado (ignorando maiúsculas/minúsculas)
        notification.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ⭐️ 3. AGRUPA AS NOTIFICAÇÕES JÁ FILTRADAS
    const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
        const group = getNotificationGroup(notification.date);
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(notification);
        return acc;
    }, {});

    // Define a ordem correta dos grupos
    const groupOrder = ['Hoje', 'Ontem', 'Essa Semana', 'Esse Mês', 'Esse Ano', 'Mais Antigo'];

    return (
        <div className="CaixaDeEntrada">
            <div className="divTituloCaixaEntrada">
                <h1 className="semibold">Notificações</h1>
                <X className="IconFecharCaixa"
                   size={28}
                   color="#ffffff"
                   onClick={() => setMostrarCaixaDeEntrada(false)}
                />
            </div>

            <div className="search-bar">
                <Search className="search-icon" size={18} color="#888" />
                {/* ⭐️ 4. CONECTA O INPUT AO ESTADO E ATUALIZA O ESTADO 'onChange' ⭐️ */}
                <input
                    type="text"
                    placeholder="pesquisar por usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* ⭐️ RENDERIZA OS GRUPOS NA ORDEM CORRETA ⭐️ */}
            <div className="ListaNotificacoes">

                {/* Adiciona uma mensagem se a busca não retornar nada */}
                {filteredNotifications.length === 0 && searchTerm.length > 0 && (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
                        Nenhuma notificação encontrada para "{searchTerm}"
                    </p>
                )}

                {groupOrder.map(groupName => {
                    // Usa a lista filtrada para encontrar os itens
                    const items = groupedNotifications[groupName];

                    // Pula se o grupo não tiver itens
                    if (!items || items.length === 0) return null;

                    return (
                        <div className="time-group" key={groupName}>
                            <h3>{groupName}</h3>
                            {items.map(notification => (
                                <Notificacao
                                    key={notification.id}
                                    notification={notification}
                                    onClick={() => handleNotificationClick(notification.id)}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CaixaDeEntrada;
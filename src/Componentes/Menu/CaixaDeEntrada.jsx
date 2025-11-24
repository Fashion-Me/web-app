import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import "../Css/CaixaDeEntrada.css";
import api from "../../services/authApi";
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

// Função para formatar as notificações a partir dos pedidos
const formatOrdersToNotifications = (orders) => {
    return orders.map(order => {
        const orderDate = new Date(order.created_at);
        const timeAgo = getTimeAgo(orderDate);

        // Gera texto baseado no status do pedido
        let notificationText = '';
        switch(order.status) {
            case 'paid':
                notificationText = 'realizou um pedido.';
                break;
            case 'shipped':
                notificationText = 'teve seu pedido enviado.';
                break;
            case 'delivered':
                notificationText = 'recebeu seu pedido.';
                break;
            case 'canceled':
                notificationText = 'cancelou um pedido.';
                break;
            default:
                notificationText = 'tem uma atualização de pedido.';
        }

        return {
            id: order.id,
            date: orderDate,
            user: order.ship_recipient || 'Cliente',
            text: notificationText,
            time: timeAgo,
            avatar: foto9,
            isRead: false,
            orderId: order.id,
            orderStatus: order.status
        };
    });
};

// Função auxiliar para calcular tempo decorrido
const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMins < 60) return `Há cerca de ${diffMins} minutos`;
    if (diffHours < 24) return `Há cerca de ${diffHours} horas`;
    if (diffDays < 7) return `Há ${diffDays} dias`;
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`;
    if (diffMonths < 12) return `Há ${diffMonths} meses`;
    return `Há ${diffYears} anos`;
};

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
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar pedidos da API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await api.get('/orders');
                const formattedNotifications = formatOrdersToNotifications(response.data);
                setNotifications(formattedNotifications);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar pedidos:', err);
                setError('Erro ao carregar notificações');
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleNotificationClick = (id) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            )
        );
    };

    const filteredNotifications = notifications.filter(notification =>
        notification.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
        const group = getNotificationGroup(notification.date);
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(notification);
        return acc;
    }, {});

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
                <input
                    type="text"
                    placeholder="pesquisar por usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="ListaNotificacoes">
                {loading && (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
                        Carregando notificações...
                    </p>
                )}

                {error && (
                    <p style={{ color: '#ff6b6b', textAlign: 'center', marginTop: '20px' }}>
                        {error}
                    </p>
                )}

                {!loading && filteredNotifications.length === 0 && searchTerm.length > 0 && (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
                        Nenhuma notificação encontrada para "{searchTerm}"
                    </p>
                )}

                {!loading && filteredNotifications.length === 0 && searchTerm.length === 0 && !error && (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
                        Nenhuma notificação no momento
                    </p>
                )}

                {!loading && groupOrder.map(groupName => {
                    const items = groupedNotifications[groupName];
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

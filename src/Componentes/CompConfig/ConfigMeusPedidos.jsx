import React, { useState, useEffect } from 'react';
import './ConfigMeusPedidos.css';
import { useNavigate } from "react-router-dom";
import api from '../../services/authApi';

export default () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [imagensProdutos, setImagensProdutos] = useState({});

    useEffect(() => {
        buscarPedidos();
    }, []);

    const buscarImagemProduto = async (listingId) => {
        try {
            const response = await api.get(`/listings/id/${listingId}`);
            const primeiraImagem = response.data.medias?.[0]?.url || null;
            return primeiraImagem;
        } catch (err) {
            console.error(`Erro ao buscar imagem do produto ${listingId}:`, err);
            return null;
        }
    };

    const buscarPedidos = async () => {
        try {
            setCarregando(true);
            setErro(null);
            console.log('Buscando pedidos...');
            const response = await api.get('/orders');
            console.log('Pedidos recebidos:', response.data);
            setPedidos(response.data);

            // Buscar imagens de todos os produtos de todos os pedidos
            const todosListingIds = new Set();
            response.data.forEach(pedido => {
                pedido.items.forEach(item => {
                    todosListingIds.add(item.listing_id);
                });
            });

            const imagensPromises = Array.from(todosListingIds).map(async (listingId) => {
                const imagem = await buscarImagemProduto(listingId);
                return { listingId, imagem };
            });

            const imagensResultados = await Promise.all(imagensPromises);
            const imagensMap = {};
            imagensResultados.forEach(({ listingId, imagem }) => {
                imagensMap[listingId] = imagem;
            });
            setImagensProdutos(imagensMap);

        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
            console.error("Detalhes do erro:", err.response?.data);
            setErro(err.response?.data?.message || "Erro ao carregar pedidos");
        } finally {
            setCarregando(false);
        }
    };

    const handleVerEntrega = (pedido) => {
        console.log('Ver entrega do pedido:', pedido);
        navigate("/MeusPedidos", { state: { pedido } });
    };

    if (carregando) {
        return (
            <div className="listaPedidos">
                <div style={{ padding: '20px', textAlign: 'center', color: '#ccc' }}>
                    Carregando pedidos...
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="listaPedidos">
                <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                    {erro}
                </div>
            </div>
        );
    }

    if (!pedidos || pedidos.length === 0) {
        return (
            <div className="listaPedidos">
                <div style={{ padding: '20px', textAlign: 'center', color: '#ccc' }}>
                    Você ainda não fez nenhum pedido
                </div>
            </div>
        );
    }

    return (
        <div className="listaPedidos">
            {pedidos.map((pedido) => (
                pedido.items.map((item, itemIndex) => (
                    <div key={`${pedido.id}-${itemIndex}`} className="itemPedido">
                        <div className="infoPedido">
                            <img
                                src={imagensProdutos[item.listing_id] || 'https://via.placeholder.com/100x100?text=Sem+Imagem'}
                                alt={item.title_snapshot}
                                className="imagemProduto"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100x100?text=Sem+Imagem';
                                }}
                            />
                            <div className="detalhesPedido">
                                <h3>{item.title_snapshot}</h3>
                                <p className="vendedor">Pedido #{pedido.id}</p>
                                <p className="preco">R$ {(item.unit_price_cents / 100).toFixed(2).replace('.', ',')}</p>
                                <p className="frete">Frete: R$ {(pedido.shipping_cents / 100).toFixed(2).replace('.', ',')}</p>
                                <p className="status" style={{ color: getStatusColor(pedido.status) }}>
                                    Status: {getStatusText(pedido.status)}
                                </p>
                            </div>
                        </div>
                        <button
                            className="btnEntrega"
                            onClick={() => handleVerEntrega(pedido)}
                        >
                            Ver entrega
                        </button>
                    </div>
                ))
            ))}
        </div>
    );
};

const getStatusText = (status) => {
    const statusMap = {
        'paid': 'Pago',
        'pending': 'Pendente',
        'shipped': 'Enviado',
        'delivered': 'Entregue',
        'canceled': 'Cancelado'
    };
    return statusMap[status] || status;
};

const getStatusColor = (status) => {
    const colorMap = {
        'paid': '#4CAF50',
        'pending': '#FFC107',
        'shipped': '#2196F3',
        'delivered': '#4CAF50',
        'canceled': '#F44336'
    };
    return colorMap[status] || '#ccc';
};
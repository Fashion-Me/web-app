import React, { useState } from 'react';
import api from '../services/authApi';

const ItemCarrinho = ({ imgAnuncio, nomeProduto, nomeVendedor, preco, itemId, onRemove }) => {
    const [removendo, setRemovendo] = useState(false);

    const handleRemover = async () => {
        if (removendo) return;

        try {
            setRemovendo(true);

            console.log('Removendo item do carrinho, item_id:', itemId);
            await api.delete(`/cart/items/${itemId}`);
            console.log('Item removido com sucesso');

            // Chama o callback para atualizar o carrinho
            if (onRemove) {
                onRemove();
            }

        } catch (err) {
            console.error("Erro ao remover item do carrinho:", err);
            console.error("Detalhes do erro:", err.response?.data);

            if (err.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
            } else if (err.response?.status === 404) {
                alert('Item não encontrado no carrinho');
                if (onRemove) {
                    onRemove();
                }
            } else {
                alert('Erro ao remover item. Tente novamente.');
            }
        } finally {
            setRemovendo(false);
        }
    };

    return (
        <div className="ItemCarrinho">
            <img
                src={imgAnuncio}
                alt="Anuncio"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=Sem+Imagem';
                }}
            />
            <div className="DetalhesAnuncio">
                <h2 className="bold">{nomeProduto}</h2>
                <h3>{nomeVendedor}</h3>
                <h3>R$ {preco.toFixed(2).replace('.', ',')}</h3>
                <h3
                    className="bold"
                    style={{
                        color: 'red',
                        cursor: removendo ? 'wait' : 'pointer',
                        opacity: removendo ? 0.6 : 1
                    }}
                    onClick={handleRemover}
                >
                    {removendo ? 'REMOVENDO...' : 'EXCLUIR'}
                </h3>
            </div>
        </div>
    );
}

export default ItemCarrinho;
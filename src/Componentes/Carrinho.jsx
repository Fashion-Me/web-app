import fotoPerfil from "../Imagens/FotoPerfilAvatar.png";
import {ShoppingCart} from "lucide-react";
import React, {useState, useEffect} from "react";
import {X} from 'lucide-react';
import "./Css/Carrinho.css"
import ItemCarrinho from "./ItemCarrinho"
import {useNavigate} from "react-router-dom";
import api from "../services/authApi";

const Carrinho = () => {
    const navigate = useNavigate();
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);
    const [imagemPerfil, setImagemPerfil] = useState(fotoPerfil);
    const [carrinhoData, setCarrinhoData] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const buscarDadosUsuario = async () => {
            try {
                const response = await api.get("/users/me");
                if (response.data.profile_url) {
                    setImagemPerfil(response.data.profile_url);
                }
            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
            }
        };

        buscarDadosUsuario();
    }, []);

    useEffect(() => {
        if (carrinhoAberto) {
            buscarCarrinho();
        }
    }, [carrinhoAberto]);

    const buscarCarrinho = async () => {
        try {
            setCarregando(true);
            setErro(null);

            console.log('Buscando carrinho...');
            const response = await api.get("/cart");
            console.log('Dados do carrinho:', response.data);

            setCarrinhoData(response.data);
        } catch (err) {
            console.error("Erro ao buscar carrinho:", err);
            console.error("Detalhes do erro:", err.response?.data);
            setErro(err.response?.data?.message || "Erro ao carregar o carrinho");
        } finally {
            setCarregando(false);
        }
    };

    const handlePagamento = () => {
        if (!carrinhoData || carrinhoData.total_items === 0) {
            alert('Seu carrinho está vazio');
            return;
        }
        setCarrinhoAberto(false);
        navigate("/Pagamento");
    };

    const formatarPreco = (centavos) => {
        return (centavos / 100).toFixed(2).replace('.', ',');
    };

    return (
        <>
            {!carrinhoAberto ? (
                <div className='divCarinho' onClick={() => setCarrinhoAberto(true)}>
                    <div className="imgPerfil">
                        <img
                            src={imagemPerfil}
                            alt="Foto de Perfil"
                            onError={(e) => {
                                e.target.src = fotoPerfil;
                            }}
                        />
                    </div>
                    <div className="IconeCarinho">
                        <ShoppingCart stroke={"#fefefe"}/>
                    </div>
                </div>
            ) : (
                <div className='divCarrinhoAberto'>
                    <div className="TituloCarinho">
                        <h1 style={{ fontWeight: "bold" }}>Carrinho</h1>
                        <X onClick={() => setCarrinhoAberto(false)}/>
                    </div>

                    {carregando ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            Carregando carrinho...
                        </div>
                    ) : erro ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                            {erro}
                        </div>
                    ) : !carrinhoData || carrinhoData.total_items === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            Seu carrinho está vazio
                        </div>
                    ) : (
                        <>
                            <div className="ItensCarrinho">
                                {carrinhoData.items.map((item) => (
                                    <ItemCarrinho
                                        key={item.id}
                                        imgAnuncio={item.listing_image_url || 'https://via.placeholder.com/100x100?text=Sem+Imagem'}
                                        nomeProduto={item.listing_title}
                                        nomeVendedor={`Vendedor ID: ${item.listing_seller_id}`}
                                        preco={item.listing_price_cents / 100}
                                        itemId={item.id}
                                        listingId={item.listing_id}
                                        onRemove={buscarCarrinho}
                                    />
                                ))}
                            </div>
                            <div className="ResultadoCarrinho">
                                <div className="divValoresPesquisa">
                                    <div>
                                        <h2>Produtos:</h2>
                                        <h2>R$ {formatarPreco(carrinhoData.subtotal_cents)}</h2>
                                    </div>
                                    <div>
                                        <h2>Total Frete:</h2>
                                        <h2>R$ {formatarPreco(carrinhoData.shipping_total_cents)}</h2>
                                    </div>
                                    <div>
                                        <h2>Total:</h2>
                                        <h2 className="bold">R$ {formatarPreco(carrinhoData.total_cents)}</h2>
                                    </div>
                                </div>
                            </div>
                            <button className="btnComprarAgora" onClick={handlePagamento}>
                                Comprar agora
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Carrinho;
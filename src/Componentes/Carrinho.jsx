import fotoPerfil from "../Imagens/FotoPerfil.png";
import imgAnuncioCamiseta from "../Imagens/Anuncio_Titulo_1.png";
import {Search, ShoppingCart} from "lucide-react";
import React, {useState, useMemo} from "react";
import {X, Check } from 'lucide-react';
import "./Css/Carrinho.css"
import ItemCarrinho from "./ItemCarrinho"
import {useNavigate} from "react-router-dom";

import foto1 from "../Imagens/CamisetaPreta1.webp";
import foto2 from "../Imagens/calcados1.webp";
import foto3 from "../Imagens/calcas1.webp";
import foto4 from "../Imagens/AnuncioTituloCasacos1.png";

const Carrinho = () => {
    const navigate = useNavigate();
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    const itensCarrinho = [
        { imgAnuncio: foto1, nomeProduto: "Camisa preta lisa", nomeVendedor: "Caue Santos", preco: 45, frete: 15.00 },
        { imgAnuncio: foto2, nomeProduto: "Sapato de couro marrom", nomeVendedor: "Luiza mel", preco: 82, frete: 25.00 },
        { imgAnuncio: foto3, nomeProduto: "Calça preta", nomeVendedor: "Carlos biritno", preco: 65, frete: 20.00 },
        { imgAnuncio: foto4, nomeProduto: "Casaco preto para motos", nomeVendedor: "Fabricio antonio", preco: 83, frete: 14.00 }
    ];

    const valorProdutos = useMemo(() => {
        return itensCarrinho.reduce((total, item) => total + item.preco, 0);
    }, [itensCarrinho]);

    const valorFreteTotal = useMemo(() => {
        return itensCarrinho.reduce((total, item) => total + item.frete, 0);
    }, [itensCarrinho]);

    const valorTotal = useMemo(() => {
        return valorProdutos + valorFreteTotal;
    }, [valorProdutos, valorFreteTotal]);

    const handlePagamento = () => {
        setCarrinhoAberto(false);
        navigate("/Pagamento");
    }

    return (
        <>
            {!carrinhoAberto ? (
                <div className='divCarinho' onClick={() => setCarrinhoAberto(true)}>
                    <div className="imgPerfil"><img src={fotoPerfil} alt="Foto de Perfil"/></div>
                    <div className="IconeCarinho"><ShoppingCart  stroke={"#fefefe"}/></div>
                </div>
            ) : (
                <div className='divCarrinhoAberto'>
                    <div className="TituloCarinho">
                        <h1 style={{ fontWeight: "bold" }}>Carrinho</h1>
                        <X onClick={() => setCarrinhoAberto(false)}/>
                    </div>
                    <div className="ItensCarrinho">
                        {itensCarrinho.map((item, index) => (
                            <ItemCarrinho
                                key={index}
                                imgAnuncio={item.imgAnuncio}
                                nomeProduto={item.nomeProduto}
                                nomeVendedor={item.nomeVendedor}
                                preco={item.preco}
                            />
                        ))}
                    </div>
                    <div className="ResultadoCarrinho">
                        <div className="divValoresPesquisa">
                            <div>
                                <h2>Produtos:</h2>
                                <h2>R$ {valorProdutos.toFixed(2).replace('.', ',')}</h2>
                            </div>
                            <div>
                                <h2>Total Frete:</h2>
                                <h2>R$ {valorFreteTotal.toFixed(2).replace('.', ',')}</h2>
                            </div>
                            <div>
                                <h2>Total:</h2>
                                <h2 className="bold">R$ {valorTotal.toFixed(2).replace('.', ',')}</h2>
                            </div>
                        </div>
                    </div>
                    <button className="btnComprarAgora" onClick={handlePagamento}>Comprar agora</button>
                </div>
            )}
        </>
    );
};
export default Carrinho;

import React, { useState, useEffect } from 'react';
import '../css/Pesquisar.css';
import { Search } from 'lucide-react';
import Anuncio from './ConjAnuncio/Anuncio';
import imgAnuncioCamiseta from "../Imagens/AnuncioCamisa.png";
import FundoHome from "../Imagens/DetalheFundo.png";
import Carrinho from "./Carrinho";


const Pesquisar = () => {
    const [buscasRecentes, setBuscasRecentes] = useState(["camisetas", "rosa"]);
    const categorias = ["camisetas", "casacos", "calças", "calçados", "acessórios"];
    const produtos = Array(10).fill({ preco: "R$ 14" });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main className="Conteudo Pesquisar" style={{backgroundImage: `url(${FundoHome})`}}>
            <div className="FundoHamburguerCarrinho">
            </div>
            <Carrinho className="Clicavel"/>
            {/* Campo de pesquisa */}
            <div className="barraPesquisaContainer">
                <div className="barraPesquisa">
                    <input type="text" placeholder="pesquisar" />
                    <Search className="iconeLupa" size={24} color="#000" />
                </div>
            </div>

            {/* Buscas recentes */}
            <div className="recentes">
                <h3>buscas recentes</h3>
                <div className="tags">
                    {buscasRecentes.map((item, i) => (
                        <div key={i} className="tag">
                            {item}
                            <span className="fechar">×</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categorias */}
            <div className="categorias">
                <h3>categorias</h3>
                <div className="listaCategorias">
                    {categorias.map((cat, i) => (
                        <div key={i} className="categoriaCard">{cat}</div>
                    ))}
                </div>
            </div>

            {/* Produtos */}
            <div className="produtos">
                {produtos.map((prod, i) => (
                    <Anuncio 
                        key={i}
                        imgFundo={imgAnuncioCamiseta}
                        preco={prod.preco} 
                    />
                ))}
            </div>
        </main>
    );
};

export default Pesquisar;

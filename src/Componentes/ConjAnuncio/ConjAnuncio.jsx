import React, { useState, useEffect } from 'react';
import Anuncio from './Anuncio';
import "./Anuncio.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/authApi";
import imagemPadrao from "../../Imagens/AnuncioCasaco.png";

const CATEGORIA_MAP = {
    "CAMISETAS": "shirt",
    "CASACOS": "coat",
    "CALÇAS": "pants",
    "CALÇADOS": "shoes",
    "ACESSÓRIOS": "accessories"
};

export default (params) => {
    const navigate = useNavigate();
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarAnuncios = async () => {
            const categoriaIngles = CATEGORIA_MAP[params.titulo];
            if (!categoriaIngles) {
                console.error("Categoria não mapeada:", params.titulo);
                setCarregando(false);
                return;
            }

            try {
                const response = await api.get(`/listings/category/${categoriaIngles}`);
                setAnuncios(response.data || []);
            } catch (err) {
                console.error("Erro ao buscar anúncios:", err);
                setAnuncios([]);
            } finally {
                setCarregando(false);
            }
        };

        if (params.func !== "add") {
            buscarAnuncios();
        }
    }, [params.titulo, params.func]);

    function onNavegacaoConjAnuncio() {
        if (params.titulo === "CASACOS") {
            navigate("/home/Casacos");
        } else if (params.titulo === "CALÇAS") {
            navigate("/home/Calcas");
        } else if (params.titulo === "CALÇADOS") {
            navigate("/home/Calcados");
        } else if (params.titulo === "ACESSÓRIOS") {
            navigate("/home/Acessorios");
        } else {
            navigate("/home/Camisetas");
        }
    }

    function onCliqueAnuncio(anuncio) {
        navigate(`/anuncio/${anuncio.id}`);
    }

    return (
        <div className="ConjAnuncio">
            {params.func !== "add" && (
                <div className="Superior Clicavel" style={{ backgroundImage: `url(${params.imgFundoTitulo})` }} onClick={() => onNavegacaoConjAnuncio()}>
                    <div className="ConjAnuncioTitulo">
                        <h2 className="bold"> {params.titulo} </h2>
                    </div>
                </div>
            )}
            <div className="Inferior">
                {carregando ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Carregando...</p>
                ) : anuncios.length > 0 ? (
                    anuncios.slice(0, 10).map((anuncio) => {
                        const imagemPrincipal = anuncio.medias && anuncio.medias.length > 0
                            ? anuncio.medias.sort((a, b) => a.position - b.position)[0].url
                            : params.imgAnuncio;

                        const precoReais = (anuncio.price_cents / 100).toFixed(2);

                        return (
                            <Anuncio
                                key={anuncio.id}
                                preco={precoReais}
                                imgFundo={imagemPrincipal || imagemPadrao}
                                onClick={() => onCliqueAnuncio(anuncio)}
                            />
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum anúncio encontrado</p>
                )}
            </div>
        </div>
    );
};
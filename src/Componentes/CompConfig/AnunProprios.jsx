import React, { useState, useEffect } from 'react';
import Anuncio from '../ConjAnuncio/Anuncio';
import './CompConfig.css';
import { useNavigate } from "react-router-dom";
import api from "../../services/authApi";
import imagemPadrao from "../../Imagens/AnuncioCasaco.png";
import CamisetaVermelha from "../../Imagens/CamisetaVermelha1.webp";

const AnunciosProprios = () => {
    const navigate = useNavigate();
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarAnunciosProprios = async () => {
            try {
                const userResponse = await api.get("/users/me");
                const userId = userResponse.data.id;

                const response = await api.get(`/listings/${userId}`);
                setAnuncios(response.data || []);
            } catch (err) {
                console.error("Erro ao buscar anúncios próprios:", err);
                setAnuncios([]);
            } finally {
                setCarregando(false);
            }
        };

        buscarAnunciosProprios();
    }, []);

    const onCliqueAnuncio = (anuncio) => {
        navigate(`/AnuncioEdit/${anuncio.id}`);
    };

    return (
        <div className="ConjAnuncio ConjAnuncioConfig">
            <div className="Inferior">
                {carregando ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Carregando...</p>
                ) : anuncios.length > 0 ? (
                    anuncios.map((anuncio) => {
                        const imagemPrincipal = anuncio.medias && anuncio.medias.length > 0
                            ? anuncio.medias.sort((a, b) => a.position - b.position)[0].url
                            : imagemPadrao;

                        const precoReais = (anuncio.price_cents / 100).toFixed(2);

                        return (
                            <>
                                <Anuncio
                                    key={anuncio.id}
                                    preco={precoReais}
                                    imgFundo={imagemPrincipal || imagemPadrao}
                                    editar={true}
                                    onClick={() => onCliqueAnuncio(anuncio)}
                                />
                            </>
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum anúncio próprio</p>
                )}
            </div>
        </div>
    );
};

export default AnunciosProprios;
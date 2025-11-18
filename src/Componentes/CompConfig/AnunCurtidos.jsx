import React, { useState, useEffect } from 'react';
import Anuncio from '../ConjAnuncio/Anuncio';
import './CompConfig.css';
import { useNavigate } from "react-router-dom";
import api from "../../services/authApi";
import imagemPadrao from "../../Imagens/AnuncioCasaco.png";

const AnunciosCurtidos = () => {
    const navigate = useNavigate();
    const [anuncios, setAnuncios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarAnunciosCurtidos = async () => {
            try {
                const response = await api.get("/listings/me/liked");
                setAnuncios(response.data || []);
            } catch (err) {
                console.error("Erro ao buscar anúncios curtidos:", err);
                setAnuncios([]);
            } finally {
                setCarregando(false);
            }
        };

        buscarAnunciosCurtidos();
    }, []);

    const onCliqueAnuncio = (anuncio) => {
        navigate(`/anuncio/${anuncio.id}`);
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
                            : '';

                        const precoReais = (anuncio.price_cents / 100).toFixed(2);

                        return (
                            <Anuncio
                                key={anuncio.id}
                                preco={precoReais}
                                imgFundo={imagemPrincipal || imagemPadrao}
                                editar={false}
                                onClick={() => onCliqueAnuncio(anuncio)}
                            />
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>Nenhum anúncio curtido</p>
                )}
            </div>
        </div>
    );
};

export default AnunciosCurtidos;
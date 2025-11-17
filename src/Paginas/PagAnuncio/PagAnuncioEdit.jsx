import React, { useState } from 'react';
import Menu from '../../Componentes/Menu';
import "./PagAnuncio.css";
import "./PagAnuncioAdd.css";
import "@radix-ui/themes/styles.css";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { ArrowLeft, ArrowRight, Camera, MapPin, Pencil, Plus } from 'lucide-react';
import Carrinho from "../../Componentes/Carrinho";
import foto1 from "../../Imagens/CamisetaVermelha1.webp";
import foto2 from "../../Imagens/CamisetaVermelha2.webp";
import foto3 from "../../Imagens/CamisetaVermelha3.webp";
import {useNavigate} from "react-router-dom";

const produtoExemplo = {
    id: 1,
    titulo: "Camisa vermelha AVENUE",
    preco: "450",
    descricao: "Apresentamos a Camisa Avenue vermelha, perfeita para adicionar um toque de estilo ao seu visual! Com um design moderno e vibrante, esta camisa é ideal para diversas ocasiões. Combine conforto e elegância com esta peça única.",
    estado: "Usado",
    categoria: "Camiseta",
    tamanho: 'GG',
    marca: "AVENUE",
    localizacao: "AV BRASIL 700",
    imagens: [foto1, foto2, foto3]
};

const PagAnuncioEdit = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [imagens, setImagens] = useState(produtoExemplo.imagens);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: produtoExemplo.titulo,
        preco: `R$ ${produtoExemplo.preco}`,
        descricao: produtoExemplo.descricao,
        categoria: produtoExemplo.categoria,
        tamanho: produtoExemplo.tamanho,
        tamanhoNumerico: '',
        estado: produtoExemplo.estado,
        marca: produtoExemplo.marca,
        localizacao: produtoExemplo.localizacao
    });

    const categorias = ['Camiseta', 'Casaco', 'Calça', 'Calçados', 'Acessórios'];
    const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];
    const estados = ['Novo','Seminovo', 'Bom estado','Usado'];

    const precisaTamanhoTexto = () => {
        return ['Camiseta', 'Casaco', 'Calça'].includes(formData.categoria);
    };

    const precisaApenasTamanhoNumerico = () => {
        return ['Calçados', 'Acessórios'].includes(formData.categoria);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const novasImagens = files.map(file => URL.createObjectURL(file));
        const imagensAtualizadas = [...imagens, ...novasImagens].slice(0, 5);
        setImagens(imagensAtualizadas);
    };

    const proximaImagem = () => {
        setImagemAtual((prev) => (prev + 1) % imagens.length);
    };

    const imagemAnterior = () => {
        setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
    };

    const selecionarImagem = (index) => {
        setImagemAtual(index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'preco') {
            const numeros = value.replace(/[^\d]/g, '');
            const valorFormatado = numeros ? `R$ ${numeros}` : '';
            setFormData(prev => ({
                ...prev,
                [name]: valorFormatado
            }));
            return;
        }
        if (name === 'tamanho') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                tamanhoNumerico: ''
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNumericInput = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({
            ...prev,
            tamanhoNumerico: value,
            tamanho: value ? '' : prev.tamanho
        }));
    };

    const handleSubmit = () => {
        console.log('Dados atualizados do anúncio:', formData);
        console.log('Imagens:', imagens);
        navigate(`/home`);
    };

    return (
        <div className='PagAnuncio'>
            {menuTipo === "mobile" ? (
                <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            ) : (
                <Menu tipo={menuTipo} />
            )}
            <div className="conteudo-anuncio">
                <div className="FundoHamburguerCarrinho"></div>
                <Carrinho className="Clicavel"/>
                <div className="header-anuncio">
                    <button className="btn-voltar-Anuncio" onClick={() => window.history.back()}>
                        <ArrowLeft size={22} strokeWidth={3}/>
                        VOLTAR
                    </button>
                </div>
                <div className="main-content">
                    <div className="carousel-container">
                        <div className="carousel-main">
                            {imagens.length > 1 && (
                                <button onClick={imagemAnterior} className="carousel-btn prev">
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            {imagens.length > 0 ? (
                                <div className="imagem-principal">
                                    <img src={imagens[imagemAtual]} alt="Produto" />
                                </div>
                            ) : (
                                <div className="imagem-principal upload-placeholder-main">
                                    <label htmlFor="upload-main" className="upload-label-main">
                                        <Camera size={50} />
                                        <span>Adicionar imagem principal</span>
                                    </label>
                                    <input
                                        id="upload-main"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}
                            {imagens.length > 1 && (
                                <button onClick={proximaImagem} className="carousel-btn next">
                                    <ArrowRight size={20} />
                                </button>
                            )}
                        </div>

                        <div className="thumbnails">
                            {imagens.map((imagem, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${index === imagemAtual ? 'active' : ''}`}
                                    onClick={() => selecionarImagem(index)}
                                >
                                    <img src={imagem} alt={`Thumbnail ${index + 1}`} />
                                    <label htmlFor={`upload-thumb-${index}`} className="thumbnail-edit-overlay">
                                        <Camera size={20} />
                                        <input
                                            id={`upload-thumb-${index}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const novaImagem = URL.createObjectURL(file);
                                                    const imagensAtualizadas = [...imagens];
                                                    imagensAtualizadas[index] = novaImagem;
                                                    setImagens(imagensAtualizadas);
                                                }
                                            }}
                                            style={{ display: 'none' }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </label>
                                </div>
                            ))}
                            {imagens.length < 5 && (
                                <label htmlFor="upload-imagem-thumb" className="thumbnail thumbnail-placeholder">
                                    <Plus size={24} />
                                    <input
                                        id="upload-imagem-thumb"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="produto-info">
                        <div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    placeholder="Adicionar nome do produto"
                                    className="input-add"
                                />
                                <Pencil size={20} className="input-icon" />
                            </div>

                            <div className="input-group input-preco-group">
                                <input
                                    type="text"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={handleInputChange}
                                    placeholder="Preço do produto"
                                    className="input-add input-preco-add"
                                />
                                <Pencil size={20} className="input-icon" />
                            </div>
                        </div>
                        <div className="descricao-section descricao-section-Add">
                            <h3>Descrição do produto</h3>
                            <div className="input-group input-descricao-group">
                                <textarea
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    placeholder="Descreva seu produto..."
                                    className="input-add input-descricao-add"
                                    rows={6}
                                />
                                <Pencil size={20} className="input-icon icon-descricao" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-adicional">
                    <div className="info-container">
                        <div className="info-produto">
                            <h3>Informações do produto</h3>

                            <div className="info-item-add">
                                <span className="info-label">CATEGORIA</span>
                                <div className="opcoes-container">
                                    {categorias.map((cat) => (
                                        <button
                                            key={cat}
                                            className={`opcao-btn ${formData.categoria === cat ? 'ativo' : ''}`}
                                            onClick={() => handleInputChange({ target: { name: 'categoria', value: cat } })}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {formData.categoria && (
                                <div className="info-item-add">
                                    <span className="info-label">TAMANHO</span>
                                    <div className="opcoes-container">
                                        {precisaTamanhoTexto() && tamanhos.map((tam) => (
                                            <button
                                                key={tam}
                                                className={`opcao-btn ${formData.tamanho === tam ? 'ativo' : ''}`}
                                                onClick={() => handleInputChange({ target: { name: 'tamanho', value: tam } })}
                                            >
                                                {tam}
                                            </button>
                                        ))}
                                        {(precisaTamanhoTexto() || precisaApenasTamanhoNumerico()) && (
                                            <div className="input-numerico-container">
                                                <input
                                                    type="text"
                                                    value={formData.tamanhoNumerico}
                                                    onChange={handleNumericInput}
                                                    placeholder="00"
                                                    className="input-numerico"
                                                />
                                                <Pencil size={16} className="input-icon-numerico" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="info-item-add">
                                <span className="info-label">ESTADO</span>
                                <div className="opcoes-container">
                                    {estados.map((est) => (
                                        <button
                                            key={est}
                                            className={`opcao-btn ${formData.estado === est ? 'ativo' : ''}`}
                                            onClick={() => handleInputChange({ target: { name: 'estado', value: est } })}
                                        >
                                            {est}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="info-item-add">
                                <span className="info-label">MARCA</span>
                                <div className="input-marca-container">
                                    <input
                                        type="text"
                                        name="marca"
                                        value={formData.marca}
                                        onChange={handleInputChange}
                                        placeholder="Digite a marca"
                                        className="input-marca"
                                    />
                                    <Pencil size={16} className="input-icon-marca" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info-localizacao">
                        <h3>Localização</h3>
                        <div className="localizacao-input-container">
                            <MapPin size={24} className="localizacao-icon" />
                            <input
                                type="text"
                                name="localizacao"
                                value={formData.localizacao}
                                onChange={handleInputChange}
                                placeholder="CLIQUE PARA ADICIONAR SUA LOCALIZAÇÃO"
                                className="input-localizacao"
                            />
                        </div>
                    </div>

                    <div className="info-btn">
                        <button className="btn-Publicar" onClick={handleSubmit}>
                            SALVAR ALTERAÇÕES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagAnuncioEdit;
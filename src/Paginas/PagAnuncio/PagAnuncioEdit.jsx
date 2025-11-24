import React, { useState, useEffect } from 'react';
import Menu from '../../Componentes/Menu';
import "./PagAnuncio.css";
import "./PagAnuncioAdd.css";
import "@radix-ui/themes/styles.css";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { ArrowLeft, ArrowRight, Camera, Pencil, Plus } from 'lucide-react';
import Carrinho from "../../Componentes/Carrinho";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/authApi";

const PagAnuncioEdit = () => {
    const { id } = useParams();
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [imagemAtual, setImagemAtual] = useState(0);
    const [imagens, setImagens] = useState([]);
    const [imagensParaUpload, setImagensParaUpload] = useState([]);
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState(null);

    const [formData, setFormData] = useState({
        titulo: '',
        preco: '',
        descricao: '',
        categoria: '',
        tamanho: '',
        tamanhoNumerico: '',
        estado: '',
        marca: '',
        status: 'active'
    });

    const categorias = ['CAMISETA', 'CASACO', 'CALÇA', 'CALÇADOS', 'ACESSÓRIOS'];
    const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];
    const estados = ['Novo','Seminovo', 'Bom estado','Usado'];

    useEffect(() => {
        const buscarAnuncio = async () => {
            try {
                setCarregando(true);
                setErro(null);

                const response = await api.get(`/listings/id/${id}`);
                const anuncio = response.data;

                setFormData({
                    titulo: anuncio.title || '',
                    preco: `R$ ${(anuncio.price_cents / 100).toFixed(2).replace('.', ',')}`,
                    descricao: anuncio.description || '',
                    categoria: anuncio.category?.toUpperCase() || '',
                    tamanho: anuncio.size || '',
                    tamanhoNumerico: '',
                    estado: anuncio.condition === 'new' ? 'NOVO' : 'USADO',
                    marca: '',
                    status: anuncio.status || 'active'
                });

                if (anuncio.medias && anuncio.medias.length > 0) {
                    const imagensOrdenadas = anuncio.medias
                        .sort((a, b) => a.position - b.position)
                        .map(m => m.url);
                    setImagens(imagensOrdenadas);
                }

            } catch (err) {
                console.error("Erro ao buscar anúncio:", err);
                setErro("Não foi possível carregar o anúncio.");
            } finally {
                setCarregando(false);
            }
        };

        if (id) {
            buscarAnuncio();
        }
    }, [id]);

    const precisaTamanhoTexto = () => {
        return ['CAMISETA', 'CASACO', 'CALÇA'].includes(formData.categoria);
    };

    const precisaApenasTamanhoNumerico = () => {
        return ['CALÇADOS', 'ACESSÓRIOS'].includes(formData.categoria);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const novasImagens = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file
        }));

        const imagensAtualizadas = [...imagens.map(url => ({ url, file: null })), ...novasImagens].slice(0, 5);
        setImagens(imagensAtualizadas.map(img => img.url));
        setImagensParaUpload([...imagensParaUpload, ...novasImagens.filter(img => img.file)]);
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
            const valorFormatado = numeros ? `R$ ${(parseInt(numeros) / 100).toFixed(2).replace('.', ',')}` : '';
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
            tamanho: value ? value : prev.tamanho
        }));
    };

    const handleSubmit = async () => {
        try {
            setSalvando(true);

            const precoNumeros = formData.preco.replace(/[^\d]/g, '');
            const priceCents = parseInt(precoNumeros);

            const tamanhoFinal = formData.tamanhoNumerico || formData.tamanho;

            // Validações básicas
            if (!formData.titulo) {
                alert('Por favor, preencha o título do produto');
                return;
            }
            if (!priceCents || priceCents <= 0) {
                alert('Por favor, informe um preço válido');
                return;
            }
            if (!tamanhoFinal) {
                alert('Por favor, selecione um tamanho');
                return;
            }
            if (!formData.categoria) {
                alert('Por favor, selecione uma categoria');
                return;
            }
            if (!formData.descricao) {
                alert('Por favor, preencha a descrição do produto');
                return;
            }

            // Mapear categorias para inglês
            const categoryMap = {
                'CAMISETA': 'shirt',
                'CASACO': 'coat',
                'CALÇA': 'pants',
                'CALÇADOS': 'shoes',
                'ACESSÓRIOS': 'accessories'
            };

            // Mapear condição para o enum do backend
            const conditionMap = {
                'NOVO': 'new',
                'USADO': 'used'
            };

            const categoriaEmIngles = categoryMap[formData.categoria] || formData.categoria.toLowerCase();
            const condicaoEmIngles = conditionMap[formData.estado] || 'used';

            const dadosAtualizacao = {
                title: formData.titulo,
                description: formData.descricao,
                size: tamanhoFinal,
                category: categoriaEmIngles,
                condition: condicaoEmIngles,
                price_cents: priceCents,
                status: formData.status
            };

            console.log('Dados para atualização:', dadosAtualizacao);
            console.log('URL da requisição:', `/listings/${id}`);

            // Usar PUT ao invés de PATCH
            const response = await api.put(`/listings/${id}`, dadosAtualizacao);

            console.log('Resposta da API:', response.data);

            alert('Anúncio atualizado com sucesso!');
            navigate(`/anuncio/${id}`);
        } catch (err) {
            console.error("Erro ao atualizar anúncio:", err);
            console.error("Status:", err.response?.status);
            console.error("Detalhes:", err.response?.data);
            console.error("Mensagem:", err.message);

            let mensagemErro = 'Erro ao atualizar anúncio. ';

            if (err.response) {
                // Erro de resposta da API
                if (err.response.status === 401) {
                    mensagemErro += 'Você precisa estar logado.';
                } else if (err.response.status === 403) {
                    mensagemErro += 'Você não tem permissão para editar este anúncio.';
                } else if (err.response.status === 404) {
                    mensagemErro += 'Anúncio não encontrado.';
                } else if (err.response.status === 422) {
                    mensagemErro += 'Dados inválidos. Verifique todos os campos.';
                    if (err.response.data?.detail) {
                        mensagemErro += '\n' + JSON.stringify(err.response.data.detail);
                    }
                } else {
                    mensagemErro += err.response.data?.message || 'Erro desconhecido.';
                }
            } else if (err.request) {
                // Requisição foi feita mas não houve resposta
                mensagemErro += 'Sem resposta do servidor. Verifique sua conexão.';
            } else {
                // Erro ao configurar a requisição
                mensagemErro += err.message;
            }

            alert(mensagemErro);
        } finally {
            setSalvando(false);
        }
    };

    if (carregando) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} />
                )}
                <div className="conteudo-anuncio">
                    <p style={{ textAlign: 'center', padding: '50px' }}>Carregando anúncio...</p>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div className='PagAnuncio'>
                {menuTipo === "mobile" ? (
                    <HamburgerComponent menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                ) : (
                    <Menu tipo={menuTipo} />
                )}
                <div className="conteudo-anuncio">
                    <p style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{erro}</p>
                    <button onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </div>
        );
    }

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
                        </div>
                    </div>

                    <div className="info-btn">
                        <button
                            className="btn-Publicar"
                            onClick={handleSubmit}
                            disabled={salvando}
                            style={{ opacity: salvando ? 0.6 : 1 }}
                        >
                            {salvando ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagAnuncioEdit;
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from '../../Componentes/Menu';
import "../../css/Home.css";
import "../../css/Mensagens.css";
import "@radix-ui/themes/styles.css";
import "../../Componentes/CompConfig/CompConfig.css"
import "../../css/Configuracao.css"
import "./EnderecosCadastrados.css"
import "./EnderecosNovos.css"
import "../../Componentes/Css/Carrinho.css"

import api from "../../services/authApi";
import useAuth from "../../hooks/useAuth";
import HamburgerComponent from '../../Componentes/Menu/Hamburger';
import useMenuTipo from "../../hooks/useMenuTipo";
import { Search, UserRoundPen, Star, Megaphone, KeyRound, ShoppingBag, ArrowLeft, Check, ShoppingCart, X, ArrowRight} from "lucide-react";
import FundoHome from "../../Imagens/DetalheFundo.png";


import fotoPerfil from "../../Imagens/FotoPerfil.png";
import imgAnuncioCamiseta from "../../Imagens/Anuncio_Titulo_1.png";
import ItemCarrinho from "../../Componentes/ItemCarrinho"
import foto1 from "../../Imagens/CamisaPretaLisa.jpg";
import foto2 from "../../Imagens/SapatoCouroMarrom.jpg";
import foto3 from "../../Imagens/CalcaPreta.webp";
import foto4 from "../../Imagens/AnuncioTituloCasacos1.png";

const Configuracao = () => {
    const { menuTipo, menuOpen, setMenuOpen } = useMenuTipo(false);
    const [mostrarMenu, setMostrarMenu] = useState(true);
    const navigate = useNavigate();
    const [conteudoAtual, setConteudoAtual] = useState('EnderecoCadastrados'); //pagina Padrao
    const [mostrarAbaConfig, setMostrarAbaConfig] = useState(true);
    const [mostrarAreaConfig, setMostrarAreaConfig] = useState(true);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Novo estado para o pop-up

    useEffect(() => {
        let previousWidth = window.innerWidth;

        const handleResize = () => {
            const currentWidth = window.innerWidth;

            if (currentWidth > 500) {
                setMostrarAbaConfig(true);
                setMostrarAreaConfig(true);
                setMostrarMenu(true);
            } else if (previousWidth > 500 && currentWidth <= 500) {
                setMostrarAreaConfig((prevState) => prevState ? false : prevState);
            }

            previousWidth = currentWidth;
        }
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='Home'>
            <main className="Conteudo" id="ConteudoConfig">
                {mostrarAbaConfig &&
                    <AbaConfig
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                    />
                }

                {mostrarAreaConfig &&
                    <AreaConfig
                        setConteudoAtual={setConteudoAtual}
                        conteudoAtual={conteudoAtual}
                        setMostrarAbaConfig={setMostrarAbaConfig}
                        setMostrarAreaConfig={setMostrarAreaConfig}
                        setMostrarMenu={setMostrarMenu}
                        mostrarAreaConfig={mostrarAreaConfig} // ← adicionado
                    />}


            </main>
        </div>
    );
};

export default Configuracao;

const AbaConfig = ({ setMostrarAbaConfig, setMostrarAreaConfig }) => {
    const [carrinhoData, setCarrinhoData] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        buscarCarrinho();
    }, []);

    const buscarCarrinho = async () => {
        try {
            setCarregando(true);
            setErro(null);
            const response = await api.get("/cart");
            setCarrinhoData(response.data);
        } catch (err) {
            console.error("Erro ao buscar carrinho:", err);
            setErro(err.response?.data?.message || "Erro ao carregar o carrinho");
        } finally {
            setCarregando(false);
        }
    };

    const formatarPreco = (centavos) => {
        return (centavos / 100).toFixed(2).replace('.', ',');
    };

    if (carregando) {
        return (
            <div id="ResumoCompra">
                <div className='divResumoCompraAberto'>
                    <div className="TituloResumoCompra">
                        <h1 style={{ fontWeight: "bold" }}>Carregando...</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (erro) {
        return (
            <div id="ResumoCompra">
                <div className='divResumoCompraAberto'>
                    <div className="TituloResumoCompra">
                        <h1 style={{ fontWeight: "bold", color: 'red' }}>{erro}</h1>
                    </div>
                </div>
            </div>
        );
    }

    if (!carrinhoData || carrinhoData.total_items === 0) {
        return (
            <div id="ResumoCompra">
                <div className='divResumoCompraAberto'>
                    <div className="TituloResumoCompra">
                        <h1 style={{ fontWeight: "bold" }}>Carrinho vazio</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="ResumoCompra">
            <div className='divResumoCompraAberto'>
                <div id='TopTitulo'>
                    <div className="TituloResumoCompra">
                        <h1 style={{ fontWeight: "bold" }}>Resumo da Compra</h1>
                    </div>
                    <div className="divValoresPesquisa">
                        <h2 id='produtos'>Produtos:</h2>
                        <h2 id='preco'>R$ {formatarPreco(carrinhoData.subtotal_cents)}</h2>
                    </div>
                </div>
                <div className="ItensComprados">
                    {carrinhoData.items.map((item) => (
                        <ItemCarrinho
                            key={item.id}
                            imgAnuncio={item.listing_image_url || 'https://via.placeholder.com/100x100?text=Sem+Imagem'}
                            nomeProduto={item.listing_title}
                            nomeVendedor={`Vendedor ID: ${item.listing_seller_id}`}
                            preco={item.listing_price_cents / 100}
                        />
                    ))}
                </div>
                <div className="ResultadoResumoCompra">
                    <div className="divMensagensPesquisa divConfigPesquisa">
                    </div>
                    <div className="divValoresColumn">
                        <div className='Frete Fretetotal'>
                            <h2>Frete Total:</h2>
                            <h2 className="bold">R$ {formatarPreco(carrinhoData.shipping_total_cents)}</h2>
                        </div>
                    </div>
                    <div className="divValores">
                        <h2>Total:</h2>
                        <h2 className="bold">R$ {formatarPreco(carrinhoData.total_cents)}</h2>
                    </div>
                    <div id='buttonResumo'>
                        <button
                            className="btnResumoCompra"
                            onClick={() => {
                                setMostrarAbaConfig(false);
                                setMostrarAreaConfig(true);
                            }}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AreaConfig = ({
                        conteudoAtual,
                        setMostrarAbaConfig,
                        setMostrarAreaConfig,
                        setMostrarMenu,
                        setConteudoAtual,
                        mostrarAreaConfig // ← adicione aqui
                    }) => (

    <div className="AreaTotal" >
        {conteudoAtual === 'EnderecosNovos' &&
            <EnderecosNovos
                setConteudoAtual={setConteudoAtual}
                setMostrarAbaConfig={setMostrarAbaConfig}
                setMostrarAreaConfig={setMostrarAreaConfig}
                setMostrarMenu={setMostrarMenu}
                mostrarAreaConfig={mostrarAreaConfig} // ← adicionado
            />
        }


        {conteudoAtual === 'EnderecoCadastrados' &&
            <>
                <EnderecoCadastrados
                    setConteudoAtual={setConteudoAtual}
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />
            </>
        }
        {conteudoAtual === 'FormaPagamento' &&
            <>
                <FormaPagamento
                    setConteudoAtual={setConteudoAtual}
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />
            </>
        }
        {conteudoAtual === 'FinalizarPedido' &&
            <>
                <FinalizarPedido
                    setConteudoAtual={setConteudoAtual}
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />
            </>
        }
        {conteudoAtual === 'PedidoFinalizado' &&
            <>
                <PedidoFinalizado
                    setConteudoAtual={setConteudoAtual}
                    setMostrarAbaConfig={setMostrarAbaConfig}
                    setMostrarAreaConfig={setMostrarAreaConfig}
                    setMostrarMenu={setMostrarMenu}
                />
            </>
        }
    </div>
);



const EnderecosNovos = ({
                            setMostrarAbaConfig,
                            setMostrarAreaConfig,
                            setMostrarMenu,
                            setConteudoAtual,
                            mostrarAreaConfig // ← adicionado
                        }) => {


    const [formData, setFormData] = useState({
        cep: "",
        rua: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        nome: "",
    });

    const [formValido, setFormValido] = useState(false);

    useEffect(() => {
        // Verifica se todos os campos estão preenchidos
        const tudoPreenchido = Object.values(formData).every((valor) => valor.trim() !== "");
        setFormValido(tudoPreenchido);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`AreaTotal ${mostrarAreaConfig ? "mostrarArea" : ""}`}>

            <>
                <div className="divEspacoTodo">
                    <h2 className="titulo">Adicionar Novo Endereço</h2>

                    <div className="address-form AreaEnderecos">
                        <div className="form-row">
                            <label>CEP</label>
                            <input
                                type="text"
                                name="cep"
                                placeholder="01234-012"
                                value={formData.cep}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row">
                            <label>RUA</label>
                            <input
                                type="text"
                                name="rua"
                                placeholder="Estrada das Tulipas"
                                value={formData.rua}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row double">
                            <div className="input-group">
                                <label>COMPLEMENTO</label>
                                <input
                                    type="text"
                                    name="complemento"
                                    placeholder="Bloco A, apt 1"
                                    value={formData.complemento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>BAIRRO</label>
                                <input
                                    type="text"
                                    name="bairro"
                                    placeholder="Linaúva"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-row double">
                            <div className="input-group">
                                <label>CIDADE</label>
                                <input
                                    type="text"
                                    name="cidade"
                                    placeholder="Xique-Xique"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>ESTADO</label>
                                <input
                                    type="text"
                                    name="estado"
                                    placeholder="BA"
                                    value={formData.estado}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>NOME</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Apelido do Endereço"
                                value={formData.nome}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="BotoesEndereco">
                        <button className="btnCancelar" onClick={() => setConteudoAtual("EnderecoCadastrados")}>
                            Cancelar
                        </button>
                        <button
                            className={`btnProximo ${!formValido ? "desativado" : ""}`}
                            disabled={!formValido}
                            onClick={() => {
                                if (formValido) setConteudoAtual("EnderecoCadastrados");
                            }}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};

const EnderecoCadastrados = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const navigate = useNavigate();
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [enderecosCadastrados, setEnderecosCadastrados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        buscarEnderecos();
    }, []);

    const buscarEnderecos = async () => {
        try {
            setCarregando(true);
            setErro(null);
            const response = await api.get("/addresses");
            setEnderecosCadastrados(response.data);
        } catch (err) {
            console.error("Erro ao buscar endereços:", err);
            setErro(err.response?.data?.message || "Erro ao carregar endereços");
        } finally {
            setCarregando(false);
        }
    };

    if (carregando) {
        return (
            <div className="AreaTotal">
                <div className="divEspacoTodo">
                    <h2 className="titulo">Carregando endereços...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="AreaTotal">
            <>
                <div className="divEspacoTodo">

                    <div className="lines">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                    </div>

                    <h2 className="titulo">Endereço(s) Cadastrado(s)</h2>

                    {erro && (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                            {erro}
                        </div>
                    )}

                    <div id="AreaEnderecos">
                        {enderecosCadastrados.map((endereco) => (
                            <div key={endereco.id} className="Endereco">
                                <div className="botaoselecionar">
                                    <input
                                        type="radio"
                                        className="concordo"
                                        name="endereco"
                                        id={`endereco-${endereco.id}`}
                                        value={endereco.id}
                                        checked={enderecoSelecionado === endereco.id}
                                        onChange={() => setEnderecoSelecionado(endereco.id)}
                                    />
                                </div>
                                <div className="informacoesendereco">
                                    <h2 className="bold">{endereco.label}</h2>
                                    <p>{endereco.line1}</p>
                                    {endereco.line2 && <p>{endereco.line2}</p>}
                                    <p>{endereco.neighborhood}, {endereco.city} - {endereco.state}</p>
                                    <p>{endereco.postal_code}</p>
                                </div>
                                <div className="editarendereco">
                                    <ArrowRight/>
                                </div>
                            </div>
                        ))}

                        <div className="EnderecoAdicionar" onClick={() => setConteudoAtual("EnderecosNovos")}>
                            <div className="botaoselecionar"></div>
                            <div className="informacoesendereco">
                                <h2 className="bold">Adicionar Novo Endereço</h2>
                            </div>
                            <div className="editarendereco">
                                <ArrowRight/>
                            </div>
                        </div>
                    </div>
                    <div className="BotoesEndereco">
                        <button className="btnCancelar" onClick={() => navigate("/home")}>
                            Cancelar
                        </button>
                        <button
                            className={`btnProximo ${!enderecoSelecionado ? "desativado" : ""}`}
                            disabled={!enderecoSelecionado}
                            onClick={() => {
                                if (enderecoSelecionado) setConteudoAtual("FormaPagamento");
                            }}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};


const FormaPagamento = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const [metodo, setMetodo] = useState("");
    const [pixCopiado, setPixCopiado] = useState(false);
    const [dadosCartao, setDadosCartao] = useState({
        numero: "",
        nome: "",
        mes: "",
        ano: "",
        parcelas: ""
    });

    const handleSelecionar = (e) => {
        setMetodo(e.target.id);
        setPixCopiado(false); // se trocar de método, reseta o estado do Pix
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosCartao((prev) => ({ ...prev, [name]: value }));
    };

    // Verifica se todos os campos do cartão estão preenchidos
    const todosPreenchidos =
        dadosCartao.numero.trim() &&
        dadosCartao.nome.trim() &&
        dadosCartao.mes.trim() &&
        dadosCartao.ano.trim() &&
        dadosCartao.parcelas.trim();

    // Controla a liberação do botão "Próximo"
    const podeContinuar =
        (metodo === "cartao" && todosPreenchidos) ||
        (metodo === "pix" && pixCopiado);

    const handleCopiarPix = () => {
        // Aqui é só uma simulação — você pode substituir pelo código real do Pix
        navigator.clipboard.writeText("00020101021226860014BR.GOV.BCB.PIX2552qrcodepixexemplo...").then(() => {
            setPixCopiado(true);
        });
    };

    return (
        <div className="AreaTotal">
            <div className="divEspacoTodo">


                <div className="lines">
                    <div className="line line1"></div>
                    <div className="line line2Pagamento"></div>
                </div>

                <h2 className="titulo">Forma de Pagamento</h2>

                <div className="areaPagamento">

                    {/* CARTÃO DE CRÉDITO */}
                    <div className="metodo cartaoCredito">
                        <div className="opcaoHeader">
                            <input
                                type="radio"
                                name="pagamento"
                                id="cartao"
                                checked={metodo === "cartao"}
                                onChange={handleSelecionar}
                            />
                            <label className="vermelho" htmlFor="cartao">
                                Cartão de Crédito
                            </label>
                        </div>

                        <div className={`camposCartao ${metodo !== "cartao" ? "desativado" : ""}`}>
                            <div className="EspacoCartao">
                                <label>Número do Cartão</label>
                                <input
                                    type="text"
                                    name="numero"
                                    placeholder="0123 4567 8901 2345"
                                    disabled={metodo !== "cartao"}
                                    value={dadosCartao.numero}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="EspacoCartao">
                                <label>Nome no Cartão</label>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Nome completo"
                                    disabled={metodo !== "cartao"}
                                    value={dadosCartao.nome}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="campo-duplo">
                                <div>
                                    <label>Validade</label>
                                    <div className="validade">
                                        <input
                                            type="text"
                                            name="mes"
                                            placeholder="MÊS"
                                            disabled={metodo !== "cartao"}
                                            value={dadosCartao.mes}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="text"
                                            name="ano"
                                            placeholder="ANO"
                                            disabled={metodo !== "cartao"}
                                            value={dadosCartao.ano}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Número de Parcelas</label>
                                    <input
                                        type="text"
                                        name="parcelas"
                                        placeholder="Ex: 3x"
                                        disabled={metodo !== "cartao"}
                                        value={dadosCartao.parcelas}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PIX */}
                    <div className="metodo pix">
                        <div className="opcaoHeader">
                            <input
                                type="radio"
                                name="pagamento"
                                id="pix"
                                checked={metodo === "pix"}
                                onChange={handleSelecionar}
                            />
                            <label className="vermelho" htmlFor="pix">
                                Pix
                            </label>
                        </div>

                        <div className={`areaPix ${metodo !== "pix" ? "desativado" : ""}`}>
                            <button
                                className="btnCopiarCodigo"
                                disabled={metodo !== "pix"}
                                onClick={handleCopiarPix}
                                style={{ opacity: pixCopiado ? 1 : 0.9 }}
                            >
                                {pixCopiado ? "Código Copiado!" : "Copiar Código"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="BotoesEndereco">
                    <button
                        className="btnCancelar"
                        onClick={() => setConteudoAtual("EnderecoCadastrados")}
                    >
                        Cancelar
                    </button>
                    <button
                        className="btnProximo"
                        disabled={!podeContinuar}
                        style={{ opacity: podeContinuar ? 1 : 0.5 }}
                        onClick={() => setConteudoAtual("FinalizarPedido")}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    );
};

const FinalizarPedido = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const [concorda, setConcorda] = useState(false);

    return (
        <div className="AreaTotal">
            <div className="divEspacoTodo">
                <div className="lines">
                    <div className="line line1"></div>
                    <div className="line line2Finalizar"></div>
                </div>

                <h2 className="titulo">Finalizar Pedido</h2>

                <div className="areaTermos">
                    <div className="textoTermos">
                        <h3 className='HBOLD'>1. Política de Devolução</h3>
                        <p>
                            Nosso compromisso é garantir a entrega correta dos pedidos. Porém, não nos responsabilizamos
                            pela perda de prazo de devolução. É responsabilidade do cliente acompanhar os prazos
                            informados no ato da compra. Pedidos fora do prazo não poderão ser aceitos para devolução.
                        </p>

                        <h3 className='HBOLD'>2. Responsabilidade após a Entrega</h3>
                        <p>
                            Após a entrega, não oferecemos seguro para os produtos. Assim que chegam à sua residência,
                            a integridade e o cuidado com o item tornam-se de responsabilidade do cliente. Danos
                            posteriores ao recebimento não são passíveis de cobertura ou troca.
                        </p>

                        <h3 className='HBOLD'>3. Condições de Retorno</h3>
                        <p>
                            Os pedidos só poderão ser retornados dentro do prazo de 6 dias e caso estejam em perfeitas
                            condições. Se o produto for danificado após o recebimento, não será possível realizar
                            devolução ou troca. Por isso, pedimos atenção e cuidado no manuseio dos itens.
                        </p>
                    </div>

                    <div className="concordarTermos">
                        <input
                            type="radio"
                            className="concordo"
                            checked={concorda}
                            onChange={() => setConcorda(!concorda)}
                        />
                        <label htmlFor="concordo">Concordo com os termos</label>
                    </div>
                </div>

                <div className="BotoesEndereco">
                    <button
                        className="btnCancelar"
                        onClick={() => setConteudoAtual("FormaPagamento")}
                    >
                        Voltar
                    </button>
                    <button
                        className="btnProximo"
                        disabled={!concorda}
                        style={{ opacity: concorda ? 1 : 0.5 }}
                        onClick={() => setConteudoAtual("PedidoFinalizado")}
                    >
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
};

const PedidoFinalizado = ({ setMostrarAbaConfig, setMostrarAreaConfig, setMostrarMenu, setConteudoAtual }) => {
    const [concorda, setConcorda] = useState(false);
    const navigate = useNavigate();
    const [processando, setProcessando] = useState(false);

    const handleFinalizado = async () => {
        try {
            setProcessando(true);

            // Limpa o carrinho
            await api.delete("/cart");

            // Navega para a página de pedidos
            navigate("/configuracao/MeusPedidos");
        } catch (err) {
            console.error("Erro ao finalizar pedido:", err);
            alert("Erro ao finalizar pedido. Tente novamente.");
        } finally {
            setProcessando(false);
        }
    };

    return (
        <div className="AreaTotal">
            <div className="divEspacoTodo">
                <div className="lines">
                    <div className="line line1"></div>
                    <div className="line line2Finalizado"></div>
                </div>

                <h2 className="titulo">Pedido Finalizado</h2>

                <div className="areaTermos">
                    <div className="textoTermos">
                        <h3 className='HBOLD'>Seu pedido poderá ser acompanhado após o envio pela aba de MEUS PEDIDOS em configurações.</h3>
                        <p>
                            Nosso compromisso é garantir a entrega correta dos pedidos. Porém, não nos responsabilizamos
                            pela perda de prazo de devolução. É responsabilidade do cliente acompanhar os prazos
                            informados no ato da compra. Pedidos fora do prazo não poderão ser aceitos para devolução.
                        </p>
                    </div>
                </div>

                <div className="BotoesFinalizadosPedido">
                    <button
                        className="btnProximo"
                        onClick={handleFinalizado}
                        disabled={processando}
                        style={{ opacity: processando ? 0.6 : 1 }}
                    >
                        {processando ? "Finalizando..." : "Pronto"}
                    </button>
                </div>
            </div>
        </div>
    );
};

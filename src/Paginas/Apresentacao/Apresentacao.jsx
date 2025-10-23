import React, { useState } from 'react';
import "./Apresentacao.css"
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

import Fundo1 from "../../Imagens/FundoAzul.png";
import Contato from "../../Imagens/propaganda.png";
import FundoHome from "../../Imagens/Inicio.png"
import FundoAreaAzul from "../../Imagens/DetalheFundoOpa40.webp"
import Celular1 from "../../Imagens/IphoneCapa.png"
import Celular2 from "../../Imagens/IphoneCapaa.png"
import FotoCell from "../../Imagens/DetalheFoto_Cell.png"
import FotoNote from "../../Imagens/DetalheFoto_Note.png"

const Apresentacao = () => {
    // Estado para controlar qual slide do carrossel está ativo
    const [currentSlide, setCurrentSlide] = useState(0);

    // Dados do carrossel
    const carouselData = [
        {
            image: FotoCell,
            text: "O aplicativo será o centro do projeto, funcionando como uma rede social de moda sustentável. Nele, os usuários poderão criar perfis, compartilhar seus looks, acompanhar tendências, interagir com outras pessoas e buscar inspirações de estilo, criando uma comunidade engajada e colaborativa."
        },
        {
            image: FotoNote,
            text: "O site funcionará como um brechó online sustentável, voltado para a compra e venda de roupas de segunda mão. Nele, os usuários terão acesso a um catálogo variado, com filtros de tamanho, estilo e preço, que tornam a experiência de busca prática e personalizada."
        }
    ];

    // Função para ir para o próximo slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    };

    // Função para ir para o slide anterior
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    };

    return (
        <>
            <div id="PaginaInicial" >
                <div id="esquerda">
                    <div id='circulo1'
                    />
                    <div id='circulo2'
                    />
                    <div id='circulo3'
                    />
                    <h1>FASHION ME</h1>
                    <h2>Seu melhor app e site de moda</h2>
                    <p>Fashion Me é a plataforma que une estilo, sustentabilidade e tecnologia.
                        Use nossa IA para criar outfits personalizados, combinando peças únicas de brechó
                        com tendências atuais. Compartilhe seus looks nas redes sociais, inspire-se em
                        outros usuários e descubra um novo jeito de se vestir de forma consciente e inovadora.
                        Junte-se à revolução fashion com a gente!
                    </p>
                    <button
                        id="INICIO"
                        onClick={() => {
                            document.getElementById("faixa")?.scrollIntoView({
                                behavior: "smooth", // rolagem suave
                                block: "start"      // alinha ao topo da página
                            });
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
                        }
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                        INICIAR
                    </button>
                </div>
                <div id="direita">
                    <img id='Iphone'
                         src={Celular1}            // variável importada ou caminho da imagem
                    />
                    <img id='Iphone2'
                         src={Celular2}            // variável importada ou caminho da imagem
                    />
                    <div id="poligono1" style={{ backgroundImage: `url(${FundoAreaAzul})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                    <div id="poligono" style={{ backgroundImage: `url(${FundoAreaAzul})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                </div>
            </div>
            <div id="faixa" style={{ backgroundImage: `url(${FundoAreaAzul})`, backgroundSize: 'fit', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
                <div className="divApresentacaoDados">
                    <h1>75%</h1>
                    <p>Das pessoas gostariam de ultilizar um brechó virtual</p>
                </div>
                <div className="divApresentacaoDados">
                    <h1>65%</h1>
                    <p>Das pessoas gostam da ideia de usar um app de moda</p>
                </div>
                <div className="divApresentacaoDados" >
                    <h1>60%</h1>
                    <p>Das pessoas usariam um outfit montado por IA</p>
                </div>
                <div className="divApresentacaoDados"  >
                    <h1>100%</h1>
                    <p>Das pessoas usam Fashion ME como seu aplicativo de moda</p>
                </div>
            </div>
            <div id="SobreFashion">
                <div id="titulo">
                    <h1>Sobre a Fashion Me</h1>
                </div>
                <div id="resto">
                    <div className="divResto">
                        <div className="topico">
                            <h1>01</h1>
                            <h2>Visão Geral do Projeto</h2>
                            <p>O projeto tem como objetivo unir sustentabilidade, moda e tecnologia em uma única plataforma. Ele conecta pessoas interessadas em consumir moda de forma consciente, oferecendo alternativas inovadoras para compra, troca e criação de looks personalizados.</p>
                        </div>
                        <div className="topico">
                            <h1>02</h1>
                            <h2>Site – Brechó Online</h2>
                            <p>A parte web do projeto funcionará como um brechó virtual:
                                Comprar e vender roupas de segunda mão;
                                Pesquisar peças filtrando por tamanho, estilo e preço;
                                Ter um espaço seguro para transações, garantindo praticidade e confiabilidade.</p>
                        </div>
                    </div>
                    <div className="divResto">
                        <div className="topico">
                            <h1>03</h1>
                            <h2>Aplicativo: Rede Social</h2>
                            <p>O aplicativo atuará como uma rede social voltada para moda, permitindo que os usuários:
                                Compartilhem seus looks e inspirações;
                                Sigam perfis de amigos ou influenciadores;
                                Interajam através de curtidas, comentários e dicas de estilo;
                                Criem uma comunidade ativa em torno da moda sustentável.</p>
                        </div>
                        <div className="topico">
                            <h1>04</h1>
                            <h2>App: Armário Virtual</h2>
                            <p>Dentro do app, cada usuário terá acesso a um armário virtual, onde poderá cadastrar suas peças (tanto compradas no brechó quanto as que já possui). Isso permitirá:
                                Organizar roupas de forma prática;
                                Visualizar todas as peças em um só lugar;
                                Facilitar a combinação de looks sem precisar experimentar fisicamente.</p>
                        </div>
                    </div>
                    <div className="divResto">
                        <div className="topico">
                            <h1>05</h1>
                            <h2>Assistente com IA</h2>
                            <p>O sistema contará com uma IA especializada em moda, que ajudará o usuário a:
                                Montar outfits personalizados de acordo com preferências de estilo;
                                Sugerir combinações baseadas no clima/tempo do dia;</p>
                        </div>
                        <div className="topico">
                            <h1>06</h1>
                            <h2>Impacto Social </h2>
                            <p>Além da praticidade tecnológica, o projeto também busca gerar impacto positivo:
                                Incentivar o consumo consciente e a reutilização de roupas;
                                Diminuir o desperdício e o impacto ambiental da indústria da moda;
                                Criar uma comunidade colaborativa que conecta moda, tecnologia e comunicação.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="projeto"></div>
            <div className="detalhe" style={{ backgroundImage: `url(${FundoAreaAzul})`, backgroundSize: 'fit', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
                <button onClick={prevSlide} className="carousel-button">
                    <ArrowLeft size={45} color={'#fff'} strokeWidth={3} />
                </button>
                <div className="divApresentacaoConj">
                    <div id="divApresentacaoimg" className={currentSlide === 1 ? 'overlap' : ''}>
                        <img src={carouselData[currentSlide].image} alt="Detalhe do projeto" />
                    </div>
                    <div id="divApresentacaoTexto" className={currentSlide === 1 ? 'shifted' : ''}>
                        <p>{carouselData[currentSlide].text}</p>
                    </div>
                </div>
                <button onClick={nextSlide} className="carousel-button">
                    <ArrowRight size={45} color={'#fff'} strokeWidth={3} />
                </button>
            </div>
            <div id="PaginaContato">
                <div className="AreaTrabalho">
                    <div id="top">
                        <h2>Contato</h2>
                        <h1>ENTRE EM CONTATO COM A GENTE!</h1>
                        <button className="BotaoContato">Email</button>
                    </div>

                    <div id="bottom">
                        <p>Outras formas de contato</p>
                        <button className="BotaoContato">Telefone</button>
                        <button className="BotaoContato">WhatsApp</button>
                    </div>
                </div>

                <div className="AreaTrabalho2">
                    <img src={Contato} alt="Contato" />
                </div>
            </div>
            <div id="footer">
                <div className="AreaTrabalho">
                    <h1>FAÇA SEU LOGIN OU CADASTRE-SE</h1>
                    <button className="BotaoFooter" onClick={() => {
                        window.location.href = "../login"; // Substitua pelo caminho desejado
                    }}
                    >Login</button>
                    <button className="BotaoFooter"
                            onClick={() => {
                                window.location.href = "/cadastro"; // Substitua pelo caminho desejado
                            }}
                    >Cadastro</button>
                </div>
                <div className="AreaTrabalho2">
                    <h1>MENU</h1>
                    <a href="#PaginaInicial">Home</a>
                    <a href="#faixa">Sobre</a>
                    <a href="#projetp">Projeto</a>
                    <a href="#PaginaContato">Contato</a>
                </div>
            </div>
        </>
    );
};

export default Apresentacao;

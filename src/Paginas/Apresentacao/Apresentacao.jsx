import React from 'react';
import "./Apresentacao.css"
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

import Fundo1 from "../../Imagens/FundoAzul.png";
import Contato from "../../Imagens/propaganda.png";
import FundoHome from "../../Imagens/Inicio.png"
import FundoAreaAzul from "../../Imagens/DetalheFundoOpa40.webp"
import Celular1 from "../../Imagens/IphoneCapa.png"
import Celular2 from "../../Imagens/IphoneCapaa.png"
import FotoCell from "../../Imagens/DetalheFoto_Cell2.png"

const Apresentacao = () => {
    return (
        <>
            <div id="PaginaInicial" >
                <div id="esquerda">
                    <div
                        style={{
                            width: "10vw",
                            height: "10vw",
                            background: "linear-gradient(75deg, rgba(0, 0, 255, 0), rgba(84, 84, 210, 0.2))",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "22%",
                            left: "26%",
                            opacity: 0.8,
                            animation: "float 8s ease-in-out infinite", // animação leve e contínua
                        }}
                    />
                    <div
                        style={{
                            width: "30vw",
                            height: "30vw",
                            background: "linear-gradient(75deg, rgba(0, 0, 255, 0), rgba(84, 84, 210, 0.2))",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "70%",
                            left: "10%",
                            opacity: 0.8,
                            animation: "float 12s ease-in-out infinite", // duração diferente para naturalidade
                        }}
                    />
                    <div
                        style={{
                            width: "20vw",
                            height: "20vw",
                            background: "linear-gradient(75deg, rgba(0, 0, 255, 0), rgba(84, 84, 210, 0.2))",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "35%",
                            left: "-6%",
                            opacity: 0.8,
                            animation: "float 10s ease-in-out infinite", // duração diferente
                        }}
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
                    <img
                        src={Celular1}            // variável importada ou caminho da imagem
                        style={{
                            position: "absolute",       // posicionamento absoluto
                            top: "28%",                // distância do topo
                            right: "-20%",              // distância da esquerda             // largura da imagem
                            height: "34vw",             // mantém proporção
                            width: "60vw",
                            zIndex: 10,                 // garante que fique acima de outros elementos
                        }}
                    />
                    <img
                        src={Celular2}            // variável importada ou caminho da imagem
                        style={{
                            position: "absolute",       // posicionamento absoluto
                            top: "18%",                // distância do topo
                            right: "-3%",              // distância da esquerda           // largura da imagem
                            height: "32vw",              // mantém proporção
                            width: "54vw",
                            zIndex: 10,                 // garante que fique acima de outros elementos
                        }}
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
                            <h1>02</h1>
                            <h2>Site – Brechó Online</h2>
                            <p>A parte web do projeto funcionará como um brechó virtual:
                                Comprar e vender roupas de segunda mão;
                                Pesquisar peças filtrando por tamanho, estilo e preço;
                                Ter um espaço seguro para transações, garantindo praticidade e confiabilidade.</p>
                        </div>
                        <div className="topico">
                            <h1>05</h1>
                            <h2>Assistente com IA</h2>
                            <p>O sistema contará com uma IA especializada em moda, que ajudará o usuário a:
                                Montar outfits personalizados de acordo com preferências de estilo;
                                Sugerir combinações baseadas no clima/tempo do dia;</p>
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
                <button
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="ConjAnuncioPerfil">
                    <div>
                        <img src={FotoCell} />
                    </div>
                    <div id="divApresentacaoTexto">
                        <p> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas</p>
                    </div>
                </div>
                <button>
                    <ArrowRight size={24} />
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
                    <button className="BotaoFooter">Login</button>
                    <button className="BotaoFooter">Cadastro</button>
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

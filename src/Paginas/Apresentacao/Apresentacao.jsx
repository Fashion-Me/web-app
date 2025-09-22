import React from 'react';
import "./Apresentacao.css"
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';

import Fundo1 from "../../Imagens/FundoAzul.png";
import FundoHome from "../../Imagens/Inicio.png"
import FundoAreaAzul from "../../Imagens/DetalheFundoOpa40.webp"
import FotoCell from "../../Imagens/DetalheFoto_Cell2.png"

const Apresentacao = () => {
    return(
        <>
            <div id="PaginaInicial" style={{ backgroundImage: `url(${FundoHome})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <div id="esquerda">
                    <h1>FASHION ME</h1>
                    <h2>Seu melhor app e site de moda</h2>
                    <p>Fashion Me é a plataforma que une estilo, sustentabilidade e tecnologia.
                        Use nossa IA para criar outfits personalizados, combinando peças únicas de brechó
                        com tendências atuais. Compartilhe seus looks nas redes sociais, inspire-se em
                        outros usuários e descubra um novo jeito de se vestir de forma consciente e inovadora.
                        Junte-se à revolução fashion com a gente!
                    </p>
                    <button ID="INICIO"
                            onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')} // Efeito hover
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                    > INICIAR </button>
                </div>
                <div id="direita"></div>
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
                        <div className="topico"></div>
                        <div className="topico"></div>
                    </div>
                    <div className="divResto">
                        <div className="topico"></div>
                        <div className="topico"></div>
                    </div>
                    <div className="divResto">
                        <div className="topico"></div>
                        <div className="topico"></div>
                    </div>
                </div>
            </div>
            <div className="detalhe" style={{ backgroundImage: `url(${FundoAreaAzul})`, backgroundSize: 'fit', backgroundRepeat: 'repeat', backgroundPosition: 'center' }}>
                <button
                >
                    <ArrowLeft size={24}/>
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
                    <ArrowRight size={24}/>
                </button>
            </div>
        </>
    );
};

export default Apresentacao;

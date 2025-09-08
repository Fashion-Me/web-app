import React from 'react';
import '../css/Apresentacao.css';

// Importe suas imagens ou use os links que preparei para visualização
//import phoneMockup1 from './assets/phone-mockup-1.png'; // Exemplo de caminho
//import phoneMockup2 from './assets/phone-mockup-2.png'; // Exemplo de caminho

const HeroSection = () => {
    return (
        <div className="fashion-me-body">
            <header className="fm-header">
                <div className="fm-container">
                    <div className="fm-logo">FASHION ME</div>
                    <nav className="fm-nav-desktop">
                        <a href="#home">HOME</a>
                        <a href="#sobre">SOBRE</a>
                        <a href="#projeto">PROJETO</a>
                        <a href="#contato">CONTATO</a>
                    </nav>
                    <button className="fm-nav-mobile-button" aria-label="Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </header>

            <main className="fm-hero-section">
                <div className="fm-container fm-hero-content">
                    <div className="fm-text-content">
                        <h1>FASHION ME</h1>
                        <h2>Seu melhor app e site de moda</h2>
                        <p>
                            Fashion Me é a plataforma que une estilo, sustentabilidade e
                            tecnologia. Use nossa IA para criar outfits personalizados,
                            combinando peças únicas de brechó com tendências atuais.
                            Compartilhe seus looks nas redes sociais, inspire-se em outros
                            usuários e descubra um novo jeito de se vestir de forma consciente e
                            inovadora. Junte-se à revolução fashion com a gente!
                        </p>
                        <button className="fm-cta-button">INICIAR</button>
                    </div>

                    <div className="fm-visual-content">
                        <div className="fm-blue-shape"></div>
                        <img
                            src="https://i.imgur.com/k6lD34T.png"
                            alt="App mostrando feed de looks"
                            className="fm-phone-mockup phone-1"
                        />
                        <img
                            src="https://i.imgur.com/vHqVwI4.png"
                            alt="App mostrando tela de criação de outfit"
                            className="fm-phone-mockup phone-2"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HeroSection;
import React from 'react';
import Menu from '../Componentes/Menu';
import ConjAnuncio from "../Componentes/ConjAnuncio";
import "../css/Home.css"
import "@radix-ui/themes/styles.css";
import iconeInicio from "../Imagens/Fundo-Btn.png";
import { MapPinned, ShoppingCart} from 'lucide-react';

//Puxar do Banco
import fotoPerfil from "../Imagens/FotoPerfil.png"
const LocalCli = 'Rua Jacinto Lucas n849, Roseira Pinto São Paulo - SP'

export default () =>(
    <div className='Home'>
        <Menu className='Menu' />
        <div className="Conteudo">
            <div className="divLocal">
                <MapPinned stroke={"#4066FF"}/>
                <p> {LocalCli} </p>
            </div>
            <div
                className="btnAnunciar"
                 style={{ backgroundImage: `url(${iconeInicio})` }}
            >
                <p>ANUNCIE AQUI SUAS ROUPAS NA FASHION</p>
            </div>
            <div className='divCarinho'>
                <div className="imgPerfil"> <img src={fotoPerfil} alt="Foto de Perfil" /></div>
                <div className="IconeCarinho"><ShoppingCart/></div>
            </div>
            <ConjAnuncio
                titulo="Calças"

            />
        </div>
    </div>
);

//alt+shift+f
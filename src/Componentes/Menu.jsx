import React, {useState} from 'react';
import Aba from "./Menu/Aba";
//Por enquanto a exportação é assim
// import iconeInicio from "./Menu/Imagens/Icone Home.png";
import Logo from "./Menu/Imagens/LogoTexto.png";
import "./Css/Menu.css"
import { House,Search,Mail,User,TriangleAlert,Settings,Bell} from 'lucide-react';
export default () => {

    const [abaSelecionada, setAbaSelecionada] = useState("Inicio");

    const handleSelecionarAba = (titulo) => {
        setAbaSelecionada(titulo);
    };
    return(
        <div className="Menu">
            <div className="Superior">
                <div className="logo partMenu">
                    <img src={Logo} alt="Logo Fashion-me" />
                </div>
                <div className="Cadastro partMenu">
                    <div className="CadEntrar"><p>Entrar</p></div>
                    <div className="CadCad"><p>Cadastrar</p></div>
                </div>
                <div className="conjAba partMenu">
                    <hr />
                    <Aba
                        titulo="Inicio"
                        selecionado={abaSelecionada === "Inicio"}
                        onClick={() => handleSelecionarAba("Inicio")}
                    >
                        <House />
                    </Aba>
                    <hr />
                    <Aba
                        titulo="Pesquisar"
                        selecionado={abaSelecionada === "Pesquisar"}
                        onClick={() => handleSelecionarAba("Pesquisar")}
                    >
                        <Search />
                    </Aba>
                    <hr />
                    <Aba
                        titulo="Mensagens"
                        selecionado={abaSelecionada === "Mensagens"}
                        onClick={() => handleSelecionarAba("Mensagens")}
                    >
                        <Mail />
                    </Aba>
                    <hr />
                    <Aba
                        titulo="Perfil"
                        selecionado={abaSelecionada === "Perfil"}
                        onClick={() => handleSelecionarAba("Perfil")}
                    >
                        <User />
                    </Aba>
                    <hr />
                    <Aba
                        titulo="Moderação"
                        selecionado={abaSelecionada === "Moderação"}
                        onClick={() => handleSelecionarAba("Moderação")}
                    >
                        <TriangleAlert />
                    </Aba>
                </div>
            </div>
            <div className="conjAba partMenu inferior">
                <Aba
                    titulo="Notificação"
                    selecionado={abaSelecionada === "Notificação"}
                    onClick={() => handleSelecionarAba("Notificação")}
                >
                <Bell />
                </Aba>
                <hr />
                <Aba
                    titulo="Configuração"
                    selecionado={abaSelecionada === "Configuração"}
                    onClick={() => handleSelecionarAba("Configuração")}
                >
                    <Settings />
                </Aba>
            </div>
        </div>
        );
};


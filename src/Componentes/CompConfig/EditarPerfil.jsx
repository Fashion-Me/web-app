import React, {useRef, useState, useEffect} from 'react';
import { SquarePen } from 'lucide-react';
import AvatarPadrão from '../../Imagens/FotoPerfilAvatar.png'
import FundoPadrão from '../../Imagens/FundoConjCamisetas2.png'
import api from "../../services/authApi";

export default () => {
    const [biografia, setBiografia] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(AvatarPadrão);
    const [fotoFundo, setFotoFundo] = useState(FundoPadrão);
    const [fotoPerfilFile, setFotoPerfilFile] = useState(null);
    const [fotoFundoFile, setFotoFundoFile] = useState(null);
    const [preferenciaRoupa, setPreferenciaRoupa] = useState('Unissex');
    const [carregando, setCarregando] = useState(true);

    const opcoesRoupa = ['Masculino', 'Feminino', 'Unissex'];
    const inputPerfilRef = useRef(null);
    const inputFundoRef = useRef(null);

    // Mapeamento reverso (da API para interface)
    const genderMapReverso = {
        'male': 'Masculino',
        'female': 'Feminino',
        'unisex': 'Unissex'
    };

    useEffect(() => {
        const buscarDadosPerfil = async () => {
            try {
                setCarregando(true);
                const responseMe = await api.get("/users/me");
                const username = responseMe.data.username;

                const response = await api.get(`/users/${username}`);
                const { profile_url, background_url, bio } = response.data;

                setBiografia(bio || '');
                setFotoPerfil(profile_url || AvatarPadrão);
                setFotoFundo(background_url || FundoPadrão);

                // Buscar clothing_gender da rota de perfil
                console.log(responseMe);
                const clothingGender = responseMe.data.clothing_gender;
                setPreferenciaRoupa(genderMapReverso[clothingGender]);

            } catch (err) {
                console.error("Erro ao buscar dados do perfil:", err);
            } finally {
                setCarregando(false);
            }
        };

        buscarDadosPerfil();
    }, []);


    const handleFotoPerfilChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPerfilFile(file);
            setFotoPerfil(URL.createObjectURL(file));
        }
    };

    const handleFotoFundoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoFundoFile(file);
            setFotoFundo(URL.createObjectURL(file));
        }
    };

    const handleSalvar = async () => {
        try {
            const genderMap = {
                'Masculino': 'MALE',
                'Feminino': 'FEMALE',
                'Unissex': 'UNISEX'
            };

            const fd = new FormData();

            if (biografia) {
                fd.append('bio', biografia);
            }

            if(genderMap[preferenciaRoupa]) {
                fd.append('clothing_gender', genderMap[preferenciaRoupa]);
            }

            if (fotoPerfilFile) {
                fd.append('profile_image', fotoPerfilFile);
            }

            if (fotoFundoFile) {
                fd.append('banner_image', fotoFundoFile);
            }

            await api.patch("/users/me/profile", fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Perfil atualizado com sucesso!');
        } catch (err) {
            console.error("Erro ao salvar perfil:", err);
            alert("Erro ao salvar perfil: " + (err.response?.data?.message || err.message));
        }
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <div className="ConfigAreaFotoCampo">
                <div className="ConfigAreaFotoPerfil">
                    <div
                        className="foto-perfil"
                        onClick={() => inputPerfilRef.current.click()}
                        style={{ backgroundImage: `url(${fotoPerfil})`,}}
                    >
                        <SquarePen size={48} strokeWidth={1.5} className="IconeEditar"/>
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputPerfilRef}
                            onChange={handleFotoPerfilChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="ConfigAreaCampo">
                    <div className="divPrefRoupa">
                        <h2>Preferencia de roupa</h2>
                        <div className="divPrefRoupaEscolhas">
                            {opcoesRoupa.map((opcao) => (
                                <div
                                    key={opcao}
                                    className={`escolha ${opcao === preferenciaRoupa ? 'selecionado' : ''}`}
                                    onClick={() => setPreferenciaRoupa(opcao)}
                                >
                                    <h3>{opcao}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="campo">
                        <h3>Bibliografia:</h3>
                        <textarea
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                            placeholder="Digite sua bibliografia"
                        />
                    </div>
                </div>
            </div>
            <div
                className="foto-fundo"
                onClick={() => inputFundoRef.current.click()}
                style={{ backgroundImage: `url(${fotoFundo})` }}
            >
                <h2 className="Config-H2">CLIQUE PARA MUDAR FOTO DE FUNDO</h2>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputFundoRef}
                    onChange={handleFotoFundoChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className='centralizarbotaosalvar'>
                <button className="botao-salvar" onClick={handleSalvar}> <h2>Salvar</h2> </button>
            </div>
        </>
    );
};
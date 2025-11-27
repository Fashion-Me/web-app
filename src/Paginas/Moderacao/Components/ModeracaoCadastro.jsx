import "../../../css/Cadastro.css"
import "./ModeracaoCadastro.css"
import api from "../../../services/authApi";
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { paises } from '../../../hooks/paises';

const ModeracaoCadastro = () => {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
    const [codigoPais, setCodigoPais] = useState('+55');
    const [telefone, setTelefone] = useState('');
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [clothingGender, setClothingGender] = useState('unisex');

    const paisSelecionado = paises.find(p => p.codigo === codigoPais);

    const formatarTelefone = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');

        if (apenasNumeros.length <= 2) {
            return apenasNumeros;
        } else if (apenasNumeros.length <= 7) {
            return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2)}`;
        } else if (apenasNumeros.length <= 11) {
            return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
        } else {
            return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
        }
    };

    const handleTelefoneChange = (e) => {
        const valorFormatado = formatarTelefone(e.target.value);
        setTelefone(valorFormatado);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.senha.value !== e.target.ConfirmarSenha.value) {
            alert("Senhas Incompatíveis");
            return;
        }

        const username = e.target.username.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.senha.value.trim();
        const name = e.target.nome.value.trim();
        const phone = codigoPais + telefone.replace(/\D/g, '');
        const birth_date = e.target.dataNasc.value.trim();

        const payload = {
            username,
            email,
            password,
            name,
            phone,
            birth_date,
            clothing_gender: clothingGender
        };

        try {
            const response = await api.post('/moderation/admins', payload);
            console.log('Resposta /moderation/admins:', response.data);
            alert("Moderador Adicionado com Sucesso!");
            // opcional: navegar para lista de moderadores
            // navigate('/moderacao');
        } catch (err) {
            const detalhe = err.response?.data?.detail
                || err.response?.data?.message
                || (err.response?.data ? JSON.stringify(err.response.data) : err.message);

            console.error("Erro ao criar moderador:", err);
            console.error("Detalhes do erro:", detalhe);

            if (err.response?.status === 401) {
                alert('Você precisa estar logado para realizar esta ação');
                navigate('/login');
            } else if (err.response?.status === 400) {
                alert(detalhe);
            } else {
                alert('Erro ao adicionar moderador. Tente novamente.\n' + detalhe);
            }
        }
    };

    return (
        <div className="CadastroModeracao">
            <h1>ADICIONAR MODERADOR</h1>
            <form className="formCad" onSubmit={handleSubmit}>
                <input className="CadLogInput" type="text" id="nome" name="nome" placeholder="Nome Completo" required/>
                <input className="CadLogInput" type="text" id="username" name="username" placeholder="Nome de Usuário" required/>
                <input className="CadLogInput" type="email" id="email" name="email" placeholder="Email" required/>

                <div id="div_Telefone" style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <div style={{ position: 'relative', width: '110px', flexShrink: 0 }}>
                        <button
                            type="button"
                            className="CadLogInput"
                            onClick={() => setDropdownAberto(!dropdownAberto)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img
                                    src={`https://flagcdn.com/w40/${paisSelecionado?.iso}.png`}
                                    alt={paisSelecionado?.nome}
                                    style={{ width: '24px', height: '16px' }}
                                />
                                <span>{codigoPais}</span>
                            </div>
                            <span style={{ fontSize: '14px' }}>▼</span>
                        </button>

                        {dropdownAberto && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    backgroundColor: '#4C4C4C',
                                    borderRadius: '10px',
                                    marginTop: '3px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    zIndex: 1000,
                                    border: '1px solid #A3A3A3'
                                }}
                            >
                                {paises.map((pais) => (
                                    <button
                                        key={pais.codigo}
                                        type="button"
                                        onClick={() => {
                                            setCodigoPais(pais.codigo);
                                            setDropdownAberto(false);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            width: '100%',
                                            padding: '10px',
                                            border: 'none',
                                            background: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5C5C5C'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <img
                                            src={`https://flagcdn.com/w40/${pais.iso}.png`}
                                            alt={pais.nome}
                                            style={{ width: '24px', height: '16px' }}
                                        />
                                        <span>{pais.codigo}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        className="CadLogInput"
                        type="tel"
                        id="fone"
                        name="fone"
                        placeholder="(11)12345-6789"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        maxLength={14}
                        required
                    />
                </div>
                <input className="CadLogInput" type="date" id="dataNasc" required/>

                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        className="CadLogInput comIcone"
                        type={mostrarSenha ? "text" : "password"}
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#B3B3B3'
                        }}
                    >
                        {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        className="CadLogInput comIcone"
                        type={mostrarConfirmarSenha ? "text" : "password"}
                        id="ConfirmarSenha"
                        name="ConfirmarSenha"
                        placeholder="Confirmar Senha"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#B3B3B3'
                        }}
                    >
                        {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <select
                    className="CadLogInput"
                    value={clothingGender}
                    onChange={(e) => setClothingGender(e.target.value)}
                    style={{ marginBottom: '12px' }}
                >
                    <option value="unisex">Unisex</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                </select>

                <button className="CadLogButton" type="submit">Adicionar</button>
            </form>
        </div>
    );
}

export default ModeracaoCadastro;
import React, {useState} from 'react';

export default () => {
    const [Senha1, setSenha1] = useState('');
    const [Senha2, setSenha2] = useState('');

    const handleSalvar = () => {
        if(Senha1 == Senha2){
            alert('Senha Renovada');
            console.log({Senha1});
        }else{
            alert('Senhas diferentes');
        }
    };


    return (
        <>
            <div className="campo">
                <h3>Nova Senha:</h3>
                <input
                    type="password"
                    value={Senha1}
                    onChange={(e) => setSenha1(e.target.value)}
                    placeholder="Digite sua Senha"
                />
                <input
                    type="password"
                    value={Senha2}
                    onChange={(e) => setSenha2(e.target.value)}
                    placeholder="Digite novamente sua senha"
                />
            </div>

            <button className="botao-salvar" onClick={handleSalvar}> <h2>Renovar Senha</h2> </button>
        </>
    );

};
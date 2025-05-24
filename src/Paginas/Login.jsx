import React from 'react';

const Login = () => {
    return (
        <div className="Login">
            <h1>Login</h1>
            <form>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" required />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Login;
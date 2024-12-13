// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../themes/AuthForm.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError(data.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Digite seu usuário"
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p className="footer">
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
    </div>
  );
}

export default Login;

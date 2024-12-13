// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../themes/AuthForm.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(username, password);
    if (data.message) {
      navigate('/login');
    } else {
      setError(data.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Crie um usuário"
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Crie uma senha"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p className="footer">
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default Register;

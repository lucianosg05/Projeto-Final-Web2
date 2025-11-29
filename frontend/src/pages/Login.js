import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Validações
      if (!email || !password) {
        setError('Email e senha são obrigatórios');
        return;
      }

      if (!validateEmail(email)) {
        setError('Email inválido');
        return;
      }

      setLoading(true);

      if (isLogin) {
        // Login
        await api.post('/auth/login', { email, password });
        setSuccess('Login realizado com sucesso!');
        setTimeout(() => navigate('/app'), 1500);
      } else {
        // Registro
        if (!name) {
          setError('Nome é obrigatório');
          return;
        }

        if (password !== confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }

        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres');
          return;
        }

        await api.post('/auth/register', { name, email, password });
        setSuccess('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => navigate('/app'), 1500);
      }
    } catch(err){
      setError(err.response?.data?.message || 'Erro na operação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          {isLogin ? '🔐 Acesso' : '📝 Novo Registro'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
          {isLogin ? 'Faça login para continuar' : 'Crie uma conta para acessar'}
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-row">
              <label htmlFor="name">Nome Completo</label>
              <input 
                id="name"
                type="text"
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Seu nome completo"
                disabled={loading}
              />
            </div>
          )}

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Sua senha"
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="form-row">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input 
                id="confirmPassword"
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="Confirme sua senha"
                disabled={loading}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '1rem' }}
          >
            {loading ? '⏳ Processando...' : (isLogin ? '🔓 Entrar' : '✅ Criar Conta')}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
            {isLogin ? 'Ainda não tem conta?' : 'Já tem conta?'}
          </p>
          <button 
            type="button"
            className="btn-secondary"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccess(null);
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem' }}
          >
            {isLogin ? '📝 Criar uma conta' : '🔐 Voltar ao login'}
          </button>
        </div>
      </div>
    </div>
  );
}
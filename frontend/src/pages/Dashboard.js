import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Spinner from '../components/Spinner';

export default function Dashboard(){
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    products: 0,
    users: 0
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userRes, studentsRes, coursesRes, productsRes, usersRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/students').catch(() => ({ data: [] })),
        api.get('/courses').catch(() => ({ data: [] })),
        api.get('/products').catch(() => ({ data: [] })),
        api.get('/users').catch(() => ({ data: [] }))
      ]);

      setUser(userRes.data);
      setStats({
        students: studentsRes.data?.length || 0,
        courses: coursesRes.data?.length || 0,
        products: productsRes.data?.length || 0,
        users: usersRes.data?.length || 0
      });
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner message="Carregando dashboard..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
      {error && <div className="alert alert-error" style={{ marginBottom: '2rem' }}>{error}</div>}

      <div className="card mb-4">
        <h2>📊 Dashboard</h2>
        {user && (
          <p style={{ color: 'var(--text-light)' }}>
            Olá, <strong>{user.name}</strong>! Aqui está um resumo do seu sistema.
          </p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="dashboard-stats">
        <Link to="/students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="stat-card">
            <h3>👨‍🎓</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.students}
            </div>
            <p>Alunos Cadastrados</p>
          </div>
        </Link>

        <Link to="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="stat-card">
            <h3>📚</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.courses}
            </div>
            <p>Cursos Disponíveis</p>
          </div>
        </Link>

        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="stat-card">
            <h3>🛍️</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.products}
            </div>
            <p>Produtos Listados</p>
          </div>
        </Link>

        <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="stat-card">
            <h3>👥</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {stats.users}
            </div>
            <p>Usuários do Sistema</p>
          </div>
        </Link>
      </div>

      {/* Menu rápido */}
      <div style={{ marginTop: '3rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>🚀 Acesso Rápido</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link to="/students/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%' }}>➕ Novo Aluno</button>
            </Link>
            <Link to="/courses/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%' }}>➕ Novo Curso</button>
            </Link>
            <Link to="/products/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%' }}>➕ Novo Produto</button>
            </Link>
            <Link to="/users" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ width: '100%' }}>👥 Gerenciar Usuários</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Informações do usuário */}
      <div style={{ marginTop: '2rem' }}>
        <div className="card">
          <h3>ℹ️ Suas Informações</h3>
          {user && (
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Perfil:</strong>{' '}
                <span className="badge" style={{ 
                  background: user.role === 'admin' ? 'var(--danger-color)' : 'var(--primary-color)',
                  color: 'white'
                }}>
                  {user.role === 'admin' ? '👑 Administrador' : '👤 Usuário Regular'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
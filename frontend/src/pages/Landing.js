import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(){
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: 980, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Bem-vindo ao Gerenciamento Pro</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          Organize seus cursos, alunos e produtos com uma interface moderna e fácil de usar. Crie sua conta e comece a colocar tudo em ordem.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button className="btn-primary" onClick={() => navigate('/login')} style={{ padding: '0.9rem 1.6rem', fontSize: '1rem' }}>
            Vamos Organizar
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem', color: 'var(--text-light)' }}>
          <div>
            <h3>👍 Fácil</h3>
            <p>Interface simples para gerenciar seu conteúdo.</p>
          </div>
          <div>
            <h3>⚡ Rápido</h3>
            <p>Fluxos otimizados para ganhar tempo.</p>
          </div>
          <div>
            <h3>🔒 Seguro</h3>
            <p>Autenticação com sessão segura no servidor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Header(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <header>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="brand"><strong>Gerenciamento Pro</strong></div>
            <div style={{ color: 'rgba(248,250,252,0.9)', fontSize: '0.95rem' }}>Organize cursos, alunos e produtos com facilidade</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user && (
              <div style={{ color: 'var(--text-light)', fontSize: '0.95rem', textAlign: 'right' }}>
                <p style={{ margin: 0 }}>Bem-vindo, <strong>{user.name}</strong></p>
                <p style={{ margin: '0.25rem 0 0 0', opacity: 0.95 }}>
                  <span className="badge" style={{ display: 'inline-block', background: 'rgba(212,175,55,0.12)', color: 'var(--text-dark)' }}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
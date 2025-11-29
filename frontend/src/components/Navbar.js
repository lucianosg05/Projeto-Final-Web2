import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { IconHome, IconStudents, IconCourses, IconProducts, IconUsers, IconLogout } from './Icons';

export default function Navbar(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post('/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Erro ao desconectar:', err);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { path: '/app', label: 'Home', Icon: IconHome },
    { path: '/students', label: 'Alunos', Icon: IconStudents },
    { path: '/courses', label: 'Cursos', Icon: IconCourses },
    { path: '/products', label: 'Produtos', Icon: IconProducts },
    { path: '/users', label: 'Usuários', Icon: IconUsers }
  ];

  return (
    <nav className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className="nav-item">
              <item.Icon size={16} style={{ marginRight: '0.5rem' }} />
              {item.label}
            </Link>
          ))}
        </div>
        <button 
          onClick={handleLogout} 
          className="btn-danger"
          disabled={loading}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <IconLogout size={16} />
          {loading ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    </nav>
  );
}
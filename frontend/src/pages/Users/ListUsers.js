import React, { useEffect, useState } from 'react';
import api from '../../api';
import Spinner from '../../components/Spinner';

export default function ListUsers(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await api.delete(`/users/${id}`);
      setSuccess('Usuário excluído com sucesso');
      setTimeout(() => setSuccess(null), 3000);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir usuário');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    if (!editingId && !formData.password) {
      setError('Senha é obrigatória para novo usuário');
      return false;
    }
    if (!editingId && formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const submitData = { ...formData };
      
      if (!editingId && !submitData.password) {
        setError('Senha é obrigatória');
        setSubmitting(false);
        return;
      }

      if (editingId) {
        if (!submitData.password) {
          delete submitData.password;
        }
        await api.put(`/users/${editingId}`, submitData);
      } else {
        await api.post('/users', submitData);
      }

      setSuccess(editingId ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso');
      setTimeout(() => setSuccess(null), 3000);
      setFormData({ name: '', email: '', password: '', role: 'user' });
      setEditingId(null);
      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar usuário');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'user' });
    setEditingId(null);
    setShowForm(false);
    setError(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <Spinner message="Carregando usuários..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>👥 Usuários do Sistema</h2>
          <button 
            className="btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            ➕ Novo Usuário
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulário */}
      {showForm && (
        <div className="card mb-4" style={{ backgroundColor: 'var(--light-bg)', border: '2px solid var(--primary-color)' }}>
          <h3 style={{ marginTop: 0 }}>
            {editingId ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row two-cols">
              <div>
                <label htmlFor="form-name">Nome *</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Digite o nome"
                  disabled={submitting}
                  required
                />
              </div>
              <div>
                <label htmlFor="form-email">Email *</label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Digite o email"
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            <div className="form-row two-cols">
              <div>
                <label htmlFor="form-password">
                  {editingId ? 'Senha (deixe em branco para manter)' : 'Senha *'}
                </label>
                <input
                  id="form-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder={editingId ? 'Deixe em branco para não alterar' : 'Digite uma senha'}
                  disabled={submitting}
                  required={!editingId}
                />
              </div>
              <div>
                <label htmlFor="form-role">Perfil</label>
                <select
                  id="form-role"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  disabled={submitting}
                >
                  <option value="user">👤 Usuário Regular</option>
                  <option value="admin">👑 Administrador</option>
                </select>
              </div>
            </div>

            <div className="btn-group" style={{ marginTop: '1.5rem' }}>
              <button type="submit" className="btn-primary" disabled={submitting} style={{ flex: 1 }}>
                {submitting ? '⏳ Salvando...' : '✅ Salvar'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm} disabled={submitting} style={{ flex: 1 }}>
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-4">
        <div className="form-row two-cols">
          <input
            type="text"
            placeholder="🔍 Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          >
            <option value="">📊 Todos os perfis</option>
            <option value="user">👤 Usuário Regular</option>
            <option value="admin">👑 Administrador</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      {filteredUsers.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            {searchTerm || selectedRole ? '❌ Nenhum usuário encontrado' : '📭 Nenhum usuário cadastrado'}
          </p>
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <span className="badge" style={{
                        background: u.role === 'admin' ? 'var(--danger-color)' : 'var(--primary-color)',
                        color: 'white'
                      }}>
                        {u.role === 'admin' ? '👑 Admin' : '👤 Usuário'}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-secondary"
                          onClick={() => startEdit(u)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => deleteUser(u.id)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p style={{ marginTop: '2rem', color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center' }}>
        📊 Total: <strong>{users.length}</strong> usuário{users.length !== 1 ? 's' : ''} cadastrado{users.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
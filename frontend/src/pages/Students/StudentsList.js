import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { IconStudents, IconPlus, IconEdit, IconDelete } from '../../components/Icons';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      setError("Erro ao carregar alunos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este aluno?")) return;
    try {
      await api.delete(`/students/${id}`);
      setSuccess("Aluno excluído com sucesso");
      setTimeout(() => setSuccess(null), 3000);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir aluno");
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner message="Carregando alunos..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IconStudents />Alunos
          </h2>
          <Link to="/students/new" style={{ textDecoration: 'none' }}>
            <button className="btn-primary"><IconPlus /> Novo Aluno</button>
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '0.375rem',
            fontSize: '1rem'
          }}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            {searchTerm ? '❌ Nenhum aluno encontrado' : '📭 Nenhum aluno cadastrado'}
          </p>
          {!searchTerm && (
            <Link to="/students/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>➕ Adicionar Primeiro Aluno</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Curso</th>
                  <th>Data de Inscrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.email}</td>
                    <td>
                      {s.Course ? (
                        <span className="badge badge-primary">{s.Course.title}</span>
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Sem curso</span>
                      )}
                    </td>
                    <td>{new Date(s.enrollmentDate).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/students/${s.id}/edit`} style={{ textDecoration: 'none' }}>
                          <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                            <IconEdit /> Editar
                          </button>
                        </Link>
                        <button
                          className="btn-danger"
                          onClick={() => deleteStudent(s.id)}
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display:'flex', alignItems:'center', gap:'0.5rem' }}
                        >
                          <IconDelete /> Excluir
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
    </div>
  );
}
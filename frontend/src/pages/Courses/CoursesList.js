import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      setError("Erro ao carregar cursos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Recarregar cursos quando um aluno é criado (evento disparado pelo StudentForm)
  useEffect(() => {
    const handler = () => loadCourses();
    window.addEventListener('student:created', handler);
    return () => window.removeEventListener('student:created', handler);
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este curso?")) return;
    try {
      await api.delete(`/courses/${id}`);
      setSuccess("Curso excluído com sucesso");
      setTimeout(() => setSuccess(null), 3000);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir curso");
    }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <Spinner message="Carregando cursos..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>📚 Cursos</h2>
          <Link to="/courses/new" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">➕ Novo Curso</button>
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar por título ou descrição..."
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

      {filteredCourses.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            {searchTerm ? '❌ Nenhum curso encontrado' : '📭 Nenhum curso cadastrado'}
          </p>
          {!searchTerm && (
            <Link to="/courses/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>➕ Adicionar Primeiro Curso</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descrição</th>
                  <th>Alunos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.title}</strong></td>
                    <td>
                      <div style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        {c.description || '—'}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">
                        {c.Students ? c.Students.length : 0} aluno{c.Students && c.Students.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/courses/${c.id}`} style={{ textDecoration: 'none' }}>
                          <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>✏️ Editar</button>
                        </Link>
                        <button
                          className="btn-danger"
                          onClick={() => deleteCourse(c.id)}
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
    </div>
  );
}

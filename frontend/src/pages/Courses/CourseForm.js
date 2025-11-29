import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";

export default function CourseForm() {
  const [title, setTitle] = useState("");
  const [students, setStudents] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const loadCourse = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/courses/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description || "");
      setStudents(res.data.Students || []);
    } catch (err) {
      setError("Erro ao carregar curso");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      loadCourse();
    } else {
      setLoading(false);
    }
  }, [id, isEditing]);

  const validateForm = () => {
    if (!title.trim()) {
      setError("Título é obrigatório");
      return false;
    }
    if (title.length < 3) {
      setError("Título deve ter pelo menos 3 caracteres");
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
      const data = { title, description };

      if (isEditing) {
        await api.put(`/courses/${id}`, data);
      } else {
        await api.post(`/courses`, data);
      }
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar curso");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Carregando dados..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isEditing ? '✏️ Editar Curso' : '➕ Novo Curso'}
        </h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do curso"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do curso (opcional)"
              disabled={submitting}
              rows="6"
            ></textarea>
          </div>

          {isEditing && (
            <div className="form-row">
              <label>Alunos associados</label>
              {students.length === 0 ? (
                <div style={{ color: 'var(--text-light)' }}>Nenhum aluno associado a este curso.</div>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                  {students.map(s => (
                    <li key={s.id} style={{ marginBottom: '0.25rem' }}>
                      {s.name} <span style={{ color: 'var(--text-light)', marginLeft: '0.5rem' }}>({s.email})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="btn-group" style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting ? '⏳ Salvando...' : (isEditing ? '✅ Atualizar' : '✅ Criar')}
            </button>
            <Link to="/courses" style={{ textDecoration: 'none', flex: 1 }}>
              <button type="button" className="btn-secondary" style={{ width: '100%' }}>
                ❌ Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

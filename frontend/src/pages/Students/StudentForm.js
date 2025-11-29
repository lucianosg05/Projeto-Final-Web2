import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      setError("Erro ao carregar cursos");
      console.error(err);
    }
  };

  const loadStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
      setCourseId(res.data.courseId || "");
    } catch (err) {
      setError("Erro ao carregar aluno");
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadCourses();
      if (isEditing) await loadStudent();
      setLoading(false);
    };
    init();
  }, [id, isEditing]);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!email.trim()) {
      setError("Email é obrigatório");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email inválido");
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
      const data = { name, email, courseId: courseId || null };

      if (isEditing) {
        await api.put(`/students/${id}`, data);
      } else {
        await api.post(`/students`, data);
        // Notificar outras partes da aplicação que um aluno foi criado
        try { window.dispatchEvent(new Event('student:created')); } catch (e) { /* ignore */ }
      }
      navigate("/students");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao salvar aluno");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Carregando dados..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isEditing ? 'Editar Aluno' : 'Novo Aluno'}
        </h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Nome Completo *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome completo"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="courseId">Curso (Opcional)</label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              disabled={submitting}
            >
              <option value="">- Selecione um curso -</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-group" style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ flex: 1 }}
            >
              {submitting ? '⏳ Salvando...' : (isEditing ? '✅ Atualizar' : '✅ Criar')}
            </button>
            <Link to="/students" style={{ textDecoration: 'none', flex: 1 }}>
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
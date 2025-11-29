import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api";
import Spinner from "../../components/Spinner";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const loadCategories = async () => {
    try {
      // Simulando carregamento de categorias a partir do backend
      // Você pode ajustar isso conforme sua API
      setCategories([
        { id: 1, name: 'Eletrônicos' },
        { id: 2, name: 'Livros' },
        { id: 3, name: 'Roupas' },
        { id: 4, name: 'Alimentos' }
      ]);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setName(res.data.name);
      setPrice(res.data.price);
      setDescription(res.data.description || "");
      setCategoryId(res.data.categoryId || "");
    } catch (err) {
      setError("Erro ao carregar produto");
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadCategories();
      if (isEditing) await loadProduct();
      setLoading(false);
    };
    init();
  }, [id, isEditing]);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Nome é obrigatório");
      return false;
    }
    if (!price || parseFloat(price) <= 0) {
      setError("Preço deve ser maior que 0");
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
      const data = {
        name,
        price: parseFloat(price),
        description,
        categoryId: categoryId ? parseInt(categoryId, 10) : null
      };

      if (isEditing) {
        await api.put(`/products/${id}`, data);
      } else {
        await api.post(`/products`, data);
      }
      navigate("/products");
    } catch (err) {
      const serverMsg = err.response?.data?.details || err.response?.data?.message;
      setError(serverMsg || err.message || "Erro ao salvar produto");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner message="Carregando dados..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Nome do Produto *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do produto"
              disabled={submitting}
              required
            />
          </div>

          <div className="form-row two-cols">
            <div>
              <label htmlFor="price">Preço (R$) *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                disabled={submitting}
                required
              />
            </div>
            <div>
              <label htmlFor="categoryId">Categoria</label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={submitting}
              >
                <option value="">- Selecione uma categoria -</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição do produto (opcional)"
              disabled={submitting}
              rows="6"
            ></textarea>
          </div>

          <div className="btn-group" style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {submitting ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
            </button>
            <Link to="/products" style={{ textDecoration: 'none', flex: 1 }}>
              <button type="button" className="btn-secondary" style={{ width: '100%' }}>
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

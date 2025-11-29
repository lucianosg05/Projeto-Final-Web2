import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { IconProducts, IconPlus, IconEdit, IconDelete } from '../../components/Icons';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/products");
      setProducts(res.data);
      
      // Extrair categorias únicas
      const uniqueCategories = [...new Set(res.data.map(p => p.Category?.name).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/products/${id}`);
      setSuccess("Produto excluído com sucesso");
      setTimeout(() => setSuccess(null), 3000);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir produto");
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || p.Category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Spinner message="Carregando produtos..." />;

  return (
    <div className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
      <div className="card mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IconProducts /> Produtos
          </h2>
          <Link to="/products/new" style={{ textDecoration: 'none' }}>
            <button className="btn-primary"><IconPlus /> Novo Produto</button>
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card mb-4">
        <div className="form-row two-cols">
          <input
            type="text"
            placeholder="🔍 Buscar por nome ou descrição..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          >
            <option value="">📁 Todas as categorias</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card text-center" style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            {searchTerm || selectedCategory ? '❌ Nenhum produto encontrado' : '📭 Nenhum produto cadastrado'}
          </p>
          {!searchTerm && !selectedCategory && (
            <Link to="/products/new" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>➕ Adicionar Primeiro Produto</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="grid-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{p.name}</h3>
                  {p.Category && (
                    <span className="badge badge-primary">{p.Category.name}</span>
                  )}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', textAlign: 'right' }}>
                  R$ {parseFloat(p.price).toFixed(2)}
                </div>
              </div>

              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.description || 'Sem descrição'}
              </p>

              <div className="actions">
                <Link to={`/products/${p.id}/edit`} style={{ textDecoration: 'none' }}>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <IconEdit /> Editar
                  </button>
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => deleteProduct(p.id)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display:'flex', alignItems:'center', gap:'0.5rem' }}
                >
                  <IconDelete /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

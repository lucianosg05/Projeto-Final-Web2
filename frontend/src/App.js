import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

// Módulo Alunos
import StudentsList from './pages/Students/StudentsList';
import StudentForm from './pages/Students/StudentForm';

// Módulo Cursos
import CoursesList from './pages/Courses/CoursesList';
import CourseForm from './pages/Courses/CourseForm';

// Módulo Produtos
import ProductsList from './pages/Products/ProductsList';
import ProductForm from './pages/Products/ProductForm';

// Módulo Usuários
import ListUsers from './pages/Users/ListUsers';

export default function App(){
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {!isLoginPage && <Navbar />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div key={location.pathname} className="page-transition" style={{ width: '100%' }}>
          <Routes>
          {/* Rota pública: landing e login */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Rota de aplicativo (área autenticada) */}
          <Route path="/app" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          {/* Módulo de Alunos */}
          <Route path="/students" element={<PrivateRoute><StudentsList /></PrivateRoute>} />
          <Route path="/students/new" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
          <Route path="/students/:id/edit" element={<PrivateRoute><StudentForm /></PrivateRoute>} />

          {/* Módulo de Cursos */}
          <Route path="/courses" element={<PrivateRoute><CoursesList /></PrivateRoute>} />
          <Route path="/courses/new" element={<PrivateRoute><CourseForm /></PrivateRoute>} />
          <Route path="/courses/:id" element={<PrivateRoute><CourseForm /></PrivateRoute>} />

          {/* Módulo de Produtos */}
          <Route path="/products" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
          <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/products/:id/edit" element={<PrivateRoute><ProductForm /></PrivateRoute>} />

          {/* Módulo de Usuários */}
          <Route path="/users" element={<PrivateRoute><ListUsers /></PrivateRoute>} />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';

export default function PrivateRoute({ children }){
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(()=>{
    api.get('/auth/me')
      .then(()=> setOk(true))
      .catch(()=> setOk(false))
      .finally(()=> setLoading(false));
  },[]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  return ok ? children : <Navigate to="/login" />;
}
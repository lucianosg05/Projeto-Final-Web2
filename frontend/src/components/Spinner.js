import React from 'react';

export default function Spinner({ message = 'Carregando...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

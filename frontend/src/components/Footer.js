import React from 'react';

export default function Footer(){
  return (
    <footer>
      <div className="container">
        <p>© {new Date().getFullYear()} Sistema de Gerenciamento. Todos os direitos reservados.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.7 }}>
          Desenvolvido com React | Powered by Node.js & MySQL
        </p>
      </div>
    </footer>
  );
}
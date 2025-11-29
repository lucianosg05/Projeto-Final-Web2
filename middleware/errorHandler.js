module.exports = (err, req, res, next) => {
console.error('Erro:', err);

// Se a resposta já foi iniciada, deixar Express lidar
if (res.headersSent) {
return next(err);
}

// Tratamento específico para erros de validação do Sequelize
if (err.name === 'SequelizeValidationError') {
return res.status(400).json({ 
message: 'Erro de validação', 
details: err.errors.map(e => e.message)
});
}

// Tratamento para erros de constraint (unique, etc)
if (err.name === 'SequelizeUniqueConstraintError') {
return res.status(400).json({ 
message: 'Este registro já existe', 
details: err.errors.map(e => e.message)
});
}

// Erro genérico
res.status(500).json({ 
message: 'Erro interno do servidor', 
details: process.env.NODE_ENV === 'development' ? err.message : 'Erro desconhecido'
});
};
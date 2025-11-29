module.exports = (err, req, res, next) => {
console.error('Erro:', err);

if (res.headersSent) {
return next(err);
}

if (err.name === 'SequelizeValidationError') {
return res.status(400).json({ 
message: 'Erro de validação', 
details: err.errors.map(e => e.message)
});
}

if (err.name === 'SequelizeUniqueConstraintError') {
return res.status(400).json({ 
message: 'Este registro já existe', 
details: err.errors.map(e => e.message)
});
}

res.status(500).json({ 
message: 'Erro interno do servidor', 
details: process.env.NODE_ENV === 'development' ? err.message : 'Erro desconhecido'
});

};

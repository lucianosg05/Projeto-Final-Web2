const { User } = require('../models');
const bcrypt = require('bcrypt');


module.exports = {
register: async (req, res, next) => {
try {
const { name, email, password } = req.body;
const exists = await User.findOne({ where: { email } });
if (exists) return res.status(400).json({ message: 'E-mail já cadastrado' });
const hash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hash });
req.session.userId = user.id;
res.status(201).json({ id: user.id, name: user.name, email: user.email });
} catch (err) { next(err); }
},


login: async (req, res, next) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });
req.session.userId = user.id;
res.json({ id: user.id, name: user.name, email: user.email });
} catch (err) { next(err); }
},


logout: (req, res) => {
req.session.destroy(() => res.json({ message: 'Desconectado' }));
},


me: async (req, res, next) => {
try {
if (!req.session.userId) return res.status(401).json({ message: 'Não autenticado' });
const user = await User.findByPk(req.session.userId, { attributes: ['id','name','email','role'] });
res.json(user);
} catch (err) { next(err); }
}
};
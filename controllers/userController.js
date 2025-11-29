const { User } = require('../models');
const bcrypt = require('bcrypt');


module.exports = {
list: async (req, res, next) => {
try {
const users = await User.findAll({ attributes: ['id','name','email','role'] });
res.json(users);
} catch (err) { next(err); }
},
get: async (req, res, next) => {
try {
const user = await User.findByPk(req.params.id, { attributes: ['id','name','email','role'] });
if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
res.json(user);
} catch (err) { next(err); }
},
update: async (req, res, next) => {
try {
const { name, email, password, role } = req.body;
const user = await User.findByPk(req.params.id);
if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
if (password) user.password = await bcrypt.hash(password, 10);
user.name = name ?? user.name;
user.email = email ?? user.email;
if (role) user.role = role;
await user.save();
res.json({ message: 'Atualizado' });
} catch (err) { next(err); }
},
remove: async (req, res, next) => {
try {
const user = await User.findByPk(req.params.id);
if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
await user.destroy();
res.json({ message: 'Removido' });
} catch (err) { next(err); }
}
};
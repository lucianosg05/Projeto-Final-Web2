const { Product, Category } = require('../models');


module.exports = {
list: async (req, res, next) => {
try {
const items = await Product.findAll({ include: [{ model: Category }] });
res.json(items);
} catch (err) { next(err); }
},
get: async (req, res, next) => {
try {
const p = await Product.findByPk(req.params.id, { include: [{ model: Category }] });
if (!p) return res.status(404).json({ message: 'Produto não encontrado' });
res.json(p);
} catch (err) { next(err); }
},
create: async (req, res, next) => {
try {
const { name, description, price, categoryId } = req.body;
const p = await Product.create({ name, description, price, categoryId: categoryId || null });
res.status(201).json(p);
} catch (err) { next(err); }
},
update: async (req, res, next) => {
try {
const { name, description, price, categoryId } = req.body;
const p = await Product.findByPk(req.params.id);
if (!p) return res.status(404).json({ message: 'Produto não encontrado' });
p.name = name ?? p.name;
p.description = description ?? p.description;
p.price = price ?? p.price;
p.categoryId = (categoryId === undefined) ? p.categoryId : categoryId;
await p.save();
res.json({ message: 'Atualizado' });
} catch (err) { next(err); }
},
remove: async (req, res, next) => {
try {
const p = await Product.findByPk(req.params.id);
if (!p) return res.status(404).json({ message: 'Produto não encontrado' });
await p.destroy();
res.json({ message: 'Removido' });
} catch (err) { next(err); }
}
};
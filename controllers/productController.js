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
		console.log('POST /api/products payload:', { name, description, price, categoryId });

		if (!name || !name.toString().trim()) {
			return res.status(400).json({ message: 'Nome do produto é obrigatório' });
		}

		const parsedPrice = Number(price);
		if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
			return res.status(400).json({ message: 'Preço inválido. Deve ser número maior que 0' });
		}

		const priceValue = parsedPrice.toFixed(2);

		let finalCategoryId = null;
		if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
			const catId = parseInt(categoryId, 10);
			if (!Number.isNaN(catId)) {
				const cat = await Category.findByPk(catId);
				if (cat) finalCategoryId = catId;
				else console.warn('Categoria não encontrada, criando produto com categoryId=null', catId);
			}
		}

		const p = await Product.create({ name, description, price: priceValue, categoryId: finalCategoryId });
		res.status(201).json(p);
	} catch (err) {
		console.error('Erro ao criar produto:', err && err.stack ? err.stack : err);

		return res.status(500).json({ message: 'Erro interno ao criar produto', details: err.message });
	}
},
update: async (req, res, next) => {
try {
const { name, description, price, categoryId } = req.body;
const p = await Product.findByPk(req.params.id);
if (!p) return res.status(404).json({ message: 'Produto não encontrado' });
p.name = name ?? p.name;
p.description = description ?? p.description;
// tratar price
if (price !== undefined && price !== null) {
	const parsed = Number(price);
	if (Number.isNaN(parsed) || parsed <= 0) return res.status(400).json({ message: 'Preço inválido' });
	p.price = parsed.toFixed(2);
}

if (categoryId !== undefined) {
	if (categoryId === null || categoryId === '') {
		p.categoryId = null;
	} else {
		const catId = parseInt(categoryId, 10);
		if (!Number.isNaN(catId)) {
			const cat = await Category.findByPk(catId);
			p.categoryId = cat ? catId : null;
		}
	}
}
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

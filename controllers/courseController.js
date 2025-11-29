const { Course, Student } = require('../models');


module.exports = {
list: async (req, res, next) => {
try {
const items = await Course.findAll({ include: [{ model: Student }] });
res.json(items);
} catch (err) { next(err); }
},
get: async (req, res, next) => {
try {
const item = await Course.findByPk(req.params.id, { include: [{ model: Student }] });
if (!item) return res.status(404).json({ message: 'Curso não encontrado' });
res.json(item);
} catch (err) { next(err); }
},
create: async (req, res, next) => {
try {
const { title, description } = req.body;
const c = await Course.create({ title, description });
res.status(201).json(c);
} catch (err) { next(err); }
},
update: async (req, res, next) => {
try {
const { title, description } = req.body;
const c = await Course.findByPk(req.params.id);
if (!c) return res.status(404).json({ message: 'Curso não encontrado' });
c.title = title ?? c.title;
c.description = description ?? c.description;
await c.save();
res.json({ message: 'Atualizado' });
} catch (err) { next(err); }
},
remove: async (req, res, next) => {
try {
const c = await Course.findByPk(req.params.id);
if (!c) return res.status(404).json({ message: 'Curso não encontrado' });
const students = await Student.count({ where: { courseId: c.id } });
if (students > 0) return res.status(400).json({ message: 'Existem alunos associados ao curso' });
await c.destroy();
res.json({ message: 'Removido' });
} catch (err) { next(err); }
}
};
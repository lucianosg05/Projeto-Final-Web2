const { Student, Course } = require('../models');


module.exports = {
list: async (req, res, next) => {
try {
const items = await Student.findAll({ include: [{ model: Course }] });
res.json(items);
} catch (err) { next(err); }
},
get: async (req, res, next) => {
try {
const s = await Student.findByPk(req.params.id, { include: [{ model: Course }] });
if (!s) return res.status(404).json({ message: 'Aluno não encontrado' });
res.json(s);
} catch (err) { next(err); }
},
create: async (req, res, next) => {
try {
const { name, email, courseId } = req.body;
const s = await Student.create({ name, email, courseId: courseId || null });
res.status(201).json(s);
} catch (err) { next(err); }
},
update: async (req, res, next) => {
try {
const { name, email, courseId } = req.body;
const s = await Student.findByPk(req.params.id);
if (!s) return res.status(404).json({ message: 'Aluno não encontrado' });
s.name = name ?? s.name;
s.email = email ?? s.email;
s.courseId = (courseId === undefined) ? s.courseId : courseId;
await s.save();
res.json({ message: 'Atualizado' });
} catch (err) { next(err); }
},
remove: async (req, res, next) => {
try {
const s = await Student.findByPk(req.params.id);
if (!s) return res.status(404).json({ message: 'Aluno não encontrado' });
await s.destroy();
res.json({ message: 'Removido' });
} catch (err) { next(err); }
}
};
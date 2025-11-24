const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const User = require('./user')(sequelize);
const Course = require('./course')(sequelize);
const Student = require('./student')(sequelize);
const Category = require('./category')(sequelize);
const Product = require('./product')(sequelize);


Course.hasMany(Student, { foreignKey: 'courseId', onDelete: 'SET NULL' });
Student.belongsTo(Course, { foreignKey: 'courseId' });


Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });


module.exports = {
sequelize,
User,
Course,
Student,
Category,
Product
};
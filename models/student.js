const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
return sequelize.define('Student', {
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true },
courseId: { type: DataTypes.INTEGER },
enrollmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
tableName: 'students'
});
};
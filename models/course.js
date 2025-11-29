const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
return sequelize.define('Course', {
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
title: { type: DataTypes.STRING, allowNull: false },
description: { type: DataTypes.TEXT }
}, {
tableName: 'courses'
});
};
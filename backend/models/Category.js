const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();


// Category.hasMany(Product, { foreignKey: 'categoryId' });
// Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Category;

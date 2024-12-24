const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Bid = require('./bid');
const Category = require('./Category');

const Product = sequelize.define('Product', {
 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startingPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  auctionStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  auctionEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});



// Product.hasMany(Bid, { foreignKey: 'productId' });
// Bid.belongsTo(Product, { foreignKey: 'productId' });

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;

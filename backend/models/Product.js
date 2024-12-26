const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Bid = require('./bid');


const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  }, 
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







module.exports = Product;

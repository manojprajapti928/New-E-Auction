const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('../models/Product');
const Bid = require('./Bid');

const Auction = sequelize.define('Auction', {
  auctionStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  auctionEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
    allowNull: false,
    defaultValue: 'upcoming',
  },
});

// sequelize.sync({force: false});


Product.hasMany(Bid, { foreignKey: 'auctionId' });
Bid.belongsTo(Product, { foreignKey: 'auctionId' });

Auction.belongsTo(Product, { foreignKey: 'productId' });
Product.hasOne(Auction, { foreignKey: 'productId' });

module.exports = Auction;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bid = sequelize.define('Bid', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  bidTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Bid;
